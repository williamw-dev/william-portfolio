# Plan d’action SEO — williamwautrin.com

Les efforts sont des estimations de développement, hors rédaction longue et délais d’indexation des moteurs.

## Critique — cette semaine

### 1. Transformer l’article GKE en deux pages autonomes

**Impact : très élevé · Effort : 1 à 2 jours**

- Créer les routes EN et FR avec slugs localisés.
- Garder `/blog` et `/fr/blog` comme index de cartes, sans article complet dans un `details`.
- Ajouter title, description, canonical, hreflang, OG/Twitter, `h1`, byline et dates vérifiées.
- Ajouter un schema `BlogPosting` et les URLs au sitemap.
- Relier article, repository Party et page projet dans les deux sens.

Fichiers probables : `src/routes/blog.tsx`, nouvelles routes sous `src/routes/`, `src/components/blog-article.tsx`, `src/routes/sitemap[.]xml.ts`, traductions.

**Validation :** chaque article répond en 200 dans sa langue, contient un seul `h1`, un canonical autonome, les trois alternate links, un `BlogPosting` valide et figure dans le sitemap.

### 2. Connecter les outils moteurs

**Impact : très élevé · Effort : 30 à 60 min**

- Vérifier la propriété domaine dans Google Search Console.
- Soumettre `https://williamwautrin.com/sitemap.xml`.
- Inspecter les pages principales et les futurs articles, puis demander l’indexation si nécessaire.
- Répéter dans Bing Webmaster Tools.
- Noter une baseline : pages indexées, impressions, requêtes, pays, appareils et liens externes.

**Validation :** propriété vérifiée, sitemap accepté, état d’indexation connu pour chaque URL canonique.

## Haute priorité — 1 à 2 semaines

### 3. Différencier accueil, Projects et Experience

**Impact : élevé · Effort : 1 à 3 jours selon le contenu**

- Réduire l’accueil à une sélection courte.
- Donner aux pages dédiées du contenu unique : contexte, contraintes, responsabilités, décisions techniques, architecture et résultat mesurable quand il existe.
- Transformer les titres de projets/expériences en `h2`.
- Si aucun contenu unique n’est souhaité, supprimer les routes dédiées du sitemap et consolider sur l’accueil.

Fichiers probables : `src/components/portfolio-sections.tsx`, `src/routes/index.tsx`, routes Projects et Experience, traductions.

**Validation :** les pages dédiées ne sont plus des sous-ensembles textuels quasi identiques à l’accueil et la hiérarchie suit `h1 > h2`.

### 4. Corriger le positionnement on-page

**Impact : élevé · Effort : 1 à 2 h**

- Remplacer le titre d’accueil par une formulation Cloud & Platform cohérente dans les deux langues.
- Supprimer l’override de `src/routes/index.tsx` s’il contredit les clés SEO dédiées.
- Renforcer les titres de Blog et Experience sans les surcharger.
- Retirer `meta keywords`.

Fichiers probables : `src/routes/__root.tsx`, `src/routes/index.tsx`, fichiers de traduction.

**Validation :** titres uniques dans le HTML SSR, cohérents avec le contenu visible et compris entre environ 30 et 60 caractères.

### 5. Corriger et étendre le graphe Schema.org

**Impact : moyen/élevé · Effort : 3 à 5 h**

- Faire pointer `Person.image` vers le portrait et aligner `Person.url` sur le canonical.
- Définir des `@id` stables pour `Person` et `WebSite`.
- Ajouter `ProfilePage`, `CollectionPage` ou `BlogPosting` selon le type de route.
- Ne pas ajouter de FAQ/HowTo artificiels.

Fichier principal probable : `src/routes/__root.tsx`, avec helpers SEO par route.

**Validation :** Rich Results Test et Schema Markup Validator sans erreur, entités reliées via leurs `@id`.

### 6. Construire les premiers signaux d’autorité

**Impact : élevé à moyen terme · Effort : 2 à 4 h puis continu**

- Ajouter `https://williamwautrin.com` au champ Website GitHub ; mettre à jour `william.dev` si cette valeur est obsolète.
- Ajouter des liens contextuels dans le profile README et les repositories Party, Lootopia, Instamint et Global Digital.
- Aligner LinkedIn, X et Credly sur le même domaine canonique.
- Utiliser l’article GKE comme destination profonde, pas uniquement l’accueil.

**Validation :** liens publics visibles, crawlables, pertinents et dirigés vers la page la plus spécifique.

### 7. Ajouter les en-têtes de production

**Impact SEO direct : faible · Impact sécurité : élevé · Effort : 2 à 4 h**

- Ajouter HSTS, `X-Content-Type-Options: nosniff`, `Referrer-Policy` et une protection de framing.
- Déployer une CSP en `Report-Only`, observer les violations, puis l’appliquer.
- Configurer côté application/Cloudflare pour couvrir aussi les réponses dynamiques.

**Validation :** en-têtes présents sur toutes les pages HTML sans casser thème, scripts, JSON-LD ou assets.

## Priorité moyenne — prochain cycle

### 8. Optimiser le premier écran mobile

**Impact : moyen · Effort : 0,5 à 1 jour**

- Réduire légèrement la hauteur du schéma de trace à moins de 400 px sur petit écran.
- Cacher les annotations non essentielles et maintenir les autres à une taille lisible.
- Donner aux éléments interactifs des zones tactiles de 32–40 px minimum.
- Tester `content-visibility: auto` sur GitHub activity et les sections lourdes sous la ligne de flottaison.

Fichiers probables : `src/components/network-field.tsx`, `src/components/site-shell.tsx`, composants GitHub/projets.

**Validation :** aucun overflow à 320/390/430 px, navigation utilisable au doigt, Lighthouse mobile LCP ≤ 2,5 s sur plusieurs runs sans régression CLS.

### 9. Optimiser le portrait

**Impact : faible/moyen · Effort : 1 h**

- Produire WebP/AVIF en 48, 96 et 144 px.
- Utiliser `srcset`, `sizes`, dimensions explicites et `decoding="async"`.
- Garder le JPEG actuel en fallback si utile.

Fichiers probables : `public/`, composant About/Profile.

**Validation :** aucune perte visuelle sur écrans Retina et transfert nettement inférieur à l’image 460 px actuelle.

### 10. Créer une page de cas Party/GKE

**Impact : moyen/élevé · Effort : 1 à 2 jours**

- Créer une page projet interne distincte de l’article : contexte, périmètre, architecture, rôle, contraintes et résultat.
- Relier page projet, article, repository et expérience.
- Employer uniquement des métriques ou motivations vérifiables.

**Validation :** route indexable, contenu substantiellement unique, navigation interne complète et métadonnées sociales dédiées.

## Faible priorité / optionnel

### 11. Normalisation et formats secondaires

**Effort : 1 à 3 h**

- Passer les redirections de slash final de `307` à `308`.
- Décider si `www` doit être capturé et redirigé vers l’apex.
- Décider si les CV PDF doivent être indexables.
- Ajouter un feed RSS quand plusieurs articles existent.
- Ajouter `llms.txt` seulement après avoir rendu les contenus importants adressables par URL.

### 12. Développer le cluster éditorial sans contenu générique

**Effort : continu**

Après le cas Party/GKE, publier seulement des retours d’expérience réels. Candidats naturels : CI vs Argo CD, instrumentation backend, External Secrets sur GKE, tags/digests et Image Updater. Un article utile et spécifique vaut mieux qu’un calendrier de publication rempli artificiellement.

## Suivi recommandé

| Fréquence | Contrôle |
|---|---|
| Après chaque déploiement | 200/404, canonical, hreflang, sitemap, données structurées |
| Mensuel | Search Console : indexation, requêtes, CTR, pages et pays |
| Trimestriel | Lighthouse mobile, crawl complet, liens externes et contenu dupliqué |
| À chaque nouvel article | URL autonome, dates réelles, OG, BlogPosting, maillage et sitemap |

