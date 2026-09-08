import type { ArticleContent } from '#/content/gke-article.types'

export const gkeArticleFr: ArticleContent = {
  title: 'Ce que j’ai appris en déployant une application full-stack sur GKE',
  excerpt:
    'Party devait surtout me servir à tester GKE, GitOps, la gestion des secrets et le monitoring. Le setup a pas mal changé en cours de route.',
  meta: 'GKE · GitOps · 10 min de lecture',
  introduction: [
    'Au départ, Party était une application assez classique : un frontend, un backend et PostgreSQL.',
    'Une fois l’application fonctionnelle, j’ai commencé à m’intéresser au déploiement. Je voulais tester GKE, Terraform, Helm et Argo CD sur un vrai projet. J’ai ensuite ajouté les certificats, les secrets et le monitoring au fur et à mesure.',
    'Je n’avais pas cette architecture complète en tête au début. J’ai essayé plusieurs approches, certaines ont tenu, d’autres ont fini supprimées.',
  ],
  sections: [
    {
      title: 'Le setup à la fin du projet',
      blocks: [{ type: 'diagram', name: 'architecture' }],
    },
    {
      title: 'Terraform d’un côté, Helm de l’autre',
      blocks: [
        {
          type: 'paragraph',
          text: 'J’ai utilisé Terraform pour créer les ressources GCP : le cluster GKE et ce qu’il fallait pour connecter Google Secret Manager. L’application et ses ressources Kubernetes étaient dans un chart Helm.',
        },
        {
          type: 'code',
          code: 'Terraform → infrastructure GCP\nHelm      → ressources Kubernetes\nArgo CD   → synchronisation avec Git',
        },
        {
          type: 'paragraph',
          text: 'J’aurais pu mettre les ressources Kubernetes dans Terraform aussi. Je ne l’ai pas fait. Une fois le cluster créé, je trouvais Helm plus simple pour modifier et redéployer l’application.',
        },
        {
          type: 'paragraph',
          text: 'Aujourd’hui, je garderais probablement ce découpage. Pas parce que c’est la seule bonne manière de faire, mais parce qu’il était assez clair pour ce projet.',
        },
      ],
    },
    {
      title: 'Le passage de latest aux tags de commit',
      blocks: [
        {
          type: 'paragraph',
          text: 'Mon premier workflow buildait deux images Docker, une pour le client et une pour le serveur, puis les pushait sur GHCR avec le tag `latest`.',
        },
        {
          type: 'paragraph',
          text: 'Au début, ça suffisait. Le problème est arrivé quand j’ai voulu vérifier quelle version tournait réellement dans le cluster. Le nom de l’image ne permettait pas de le savoir puisque `latest` pouvait pointer vers un contenu différent à chaque build.',
        },
        {
          type: 'code',
          code: 'party-server:<git-sha>\nparty-client:<git-sha>',
        },
        {
          type: 'paragraph',
          text: 'Je suis donc passé à des tags basés sur le SHA du commit. J’ai aussi essayé d’utiliser les digests avec Argo CD Image Updater. Cette partie m’a pris plus de temps que prévu.',
        },
      ],
    },
    {
      title: 'La boucle créée par Argo CD Image Updater',
      blocks: [
        {
          type: 'paragraph',
          text: 'J’ai ensuite ajouté Argo CD Image Updater pour automatiser la mise à jour des images. Il détectait une nouvelle image, modifiait la configuration dans Git, puis Argo CD synchronisait le cluster.',
        },
        { type: 'diagram', name: 'gitops-loop' },
        {
          type: 'paragraph',
          text: 'Les commits automatiques fonctionnaient. Sauf que mon workflow CI se déclenchait lui aussi sur les changements Git. Image Updater pouvait donc créer un commit qui relançait un build, qui produisait une image, qui déclenchait à nouveau Image Updater.',
        },
        {
          type: 'code',
          language: 'yaml',
          code: "if: github.actor != 'argocd-image-updater'",
        },
        {
          type: 'paragraph',
          text: 'J’ai ajouté cette condition dans GitHub Actions pour ignorer les commits créés par Image Updater. Ça a stoppé la boucle. Je n’avais simplement pas pensé à cette interaction quand j’avais branché les deux outils.',
        },
      ],
    },
    {
      title: 'GitHub Actions déployait aussi l’application',
      blocks: [
        {
          type: 'paragraph',
          text: 'Dans le setup final, Argo CD synchronisait l’application, mais GitHub Actions récupérait aussi les credentials GKE et lançait directement un `helm upgrade --install`.',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'helm upgrade --install party-app infra/helm/party \\\n  --namespace party --create-namespace --reuse-values \\\n  --set client.image.tag="<git-sha>" \\\n  --set server.image.tag="<git-sha>"',
        },
        {
          type: 'paragraph',
          text: 'J’avais donc deux chemins capables de déployer l’application. Ce n’était pas nécessaire et ça rendait plus difficile de savoir si le cluster correspondait vraiment à la configuration présente dans Git.',
        },
        {
          type: 'paragraph',
          text: 'Aujourd’hui, je séparerais beaucoup plus clairement les deux : la CI teste, build et push les images. Elle ne touche pas au cluster. Argo CD s’occupe seul du déploiement à partir de la configuration versionnée dans Git.',
        },
        { type: 'diagram', name: 'target-flow' },
      ],
    },
    {
      title: 'Ingress, certificats et secrets',
      blocks: [
        {
          type: 'paragraph',
          text: 'Faire tourner les Deployments et les Services n’a pas été la partie qui m’a pris le plus de temps. J’ai davantage tâtonné autour de NGINX Ingress et cert-manager : annotations, secrets TLS, configuration du certificat… Il y a eu plusieurs corrections avant que tout soit propre.',
        },
        {
          type: 'paragraph',
          text: 'Pour les credentials, je ne voulais pas les laisser dans les values Helm. J’ai utilisé Google Secret Manager avec External Secrets Operator pour les copier dans des Secrets Kubernetes.',
        },
        { type: 'diagram', name: 'secrets' },
        {
          type: 'paragraph',
          text: 'Ça ajoutait encore quelques ressources à comprendre et à configurer, mais les secrets ne se retrouvaient ni dans le chart ni dans le repository.',
        },
      ],
    },
    {
      title: 'Le monitoring est arrivé à la fin',
      blocks: [
        {
          type: 'paragraph',
          text: 'J’ai ajouté Prometheus et Grafana assez tard. Le backend exposait un endpoint `/metrics`, puis Prometheus récupérait à la fois des métriques applicatives et des métriques du cluster.',
        },
        { type: 'diagram', name: 'observability' },
        {
          type: 'paragraph',
          text: 'Les métriques Kubernetes me permettaient de voir l’état des conteneurs. Les métriques du backend répondaient à autre chose : est-ce que les événements étaient créés, est-ce que les utilisateurs les rejoignaient, est-ce que l’application servait vraiment ?',
        },
        {
          type: 'paragraph',
          text: 'Si l’objectif est de monitorer une application, je conseille de commencer par instrumenter le backend. Prometheus et Grafana ne peuvent afficher que ce que l’application expose. Sans métriques applicatives pensées assez tôt, on finit surtout avec de beaux dashboards CPU et mémoire qui ne disent pas si le produit fonctionne réellement.',
        },
      ],
    },
    {
      title: 'Ce que je ferais maintenant',
      blocks: [
        {
          type: 'paragraph',
          text: 'Party n’avait pas besoin de GKE pour fonctionner. Un service managé plus simple aurait largement suffi. Mais le projet me servait aussi à apprendre Kubernetes et les outils autour, donc le surdimensionnement faisait partie de l’exercice.',
        },
        {
          type: 'paragraph',
          text: 'Je garderais Terraform, Helm, les secrets externes et le monitoring. Je simplifierais surtout le déploiement : plus de `helm upgrade` dans GitHub Actions, pas de logique compliquée autour des digests tant qu’elle n’apporte rien de concret, et un seul chemin pour modifier ce qui tourne dans le cluster.',
        },
        {
          type: 'paragraph',
          text: 'Je ne referais pas toutes les étapes de la même façon. Plusieurs parties fonctionnaient, mais restaient plus compliquées qu’elles n’avaient besoin de l’être.',
        },
      ],
    },
    {
      title: 'Ce que je retiens du projet',
      blocks: [
        {
          type: 'paragraph',
          text: 'Avant Party, je réduisais encore un peu Kubernetes aux Deployments, Services et Pods. Le projet m’a surtout forcé à travailler sur ce qu’il y a autour :',
        },
        {
          type: 'questions',
          items: [
            'retrouver précisément la version déployée ;',
            'éviter que plusieurs outils déploient en même temps ;',
            'faire arriver les secrets dans les Pods sans les mettre dans Git ;',
            'exposer l’application en HTTPS et savoir si elle fonctionne réellement.',
          ],
        },
        {
          type: 'paragraph',
          text: 'C’est aussi à ce moment-là que j’ai commencé à passer plus de temps sur la plateforme autour du code que sur l’application elle-même.',
        },
      ],
    },
  ],
}
