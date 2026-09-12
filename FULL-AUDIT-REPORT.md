# Audit SEO complet — williamwautrin.com

Date de l’audit : 12 septembre 2026  
Périmètre : site public, code source local, rendu mobile et desktop, contenu, données structurées, indexabilité, performance et visibilité externe.

## Synthèse

**Score de santé SEO estimé : 72/100.**

Le socle est sain : rendu SSR, pages rapides, URLs bilingues cohérentes, canonical et hreflang corrects, vraies réponses 404, sitemap propre et redirections Cloudflare maîtrisées. Les principaux freins ne viennent pas de la stack. Ils viennent surtout de l’architecture éditoriale : l’unique article n’a pas sa propre URL, les pages Projects et Experience reprennent presque mot pour mot la homepage, et l’autorité externe du nouveau domaine reste très faible ou impossible à mesurer.

Ce score est directionnel. Aucun accès à Google Search Console, CrUX, GA4 ou à une base de backlinks complète n’était disponible.

| Axe | Score | État |
|---|---:|---|
| SEO technique | 78/100 | Bon socle, quelques finitions importantes |
| Sitemap | 92/100 | Propre et exhaustif pour les routes actuelles |
| Hreflang | 100/100 | Correct sur les 8 URLs |
| On-page — accueil | 82/100 | Solide, titre à recentrer sur Cloud/Platform |
| On-page — projets | 66/100 | Trop proche de l’accueil, hiérarchie faible |
| On-page — expérience | 61/100 | Trop proche de l’accueil, titre générique |
| On-page — blog | 57/100 | Article sans URL dédiée |
| Schema.org | 62/100 | Person valide, graphe incomplet |
| Contenu / E-E-A-T | 71/100 | Expérience crédible, autorité encore limitée |
| GEO / visibilité IA | 52/100 | Entité identifiable, contenus peu adressables |
| Architecture thématique | 38/100 | Un bon sujet, pas encore de vrai hub |
| Performance mobile | 92/100 | LCP lab à 2,7 s, interaction fluide |
| Performance desktop | 100/100 | Excellent en laboratoire |
| Images | 88/100 | OG réussi, portrait surdimensionné pour l’usage |
| Visuel mobile | 82/100 | Pas d’overflow, quelques cibles trop petites |
| Backlinks | Données insuffisantes | Aucun score quantitatif défendable |

## Les cinq priorités

1. Donner à l’article GKE une vraie URL par langue, ses métadonnées, son schema `BlogPosting` et une entrée dans le sitemap.
2. Vérifier le domaine dans Google Search Console et Bing Webmaster Tools, soumettre le sitemap et contrôler l’indexation URL par URL.
3. Différencier réellement l’accueil, Projects et Experience, puis corriger la hiérarchie des titres.
4. Relier le nouveau domaine depuis GitHub, LinkedIn, X, Credly et les README des projets pertinents.
5. Alléger le premier écran mobile et agrandir les petites cibles tactiles sans perdre l’identité visuelle.

## 1. Crawl, indexabilité et URLs

### Ce qui est correct

Les huit URLs présentes dans le sitemap répondent en `200`, contiennent du HTML rendu côté serveur et possèdent chacune un seul `h1` :

- `/` et `/fr/`
- `/projects` et `/fr/projects`
- `/experience` et `/fr/experience`
- `/blog` et `/fr/blog`

Chaque page a un `lang` cohérent, un canonical absolu vers elle-même, ainsi que les variantes `en`, `fr` et `x-default`. Les directives robots sont indexables. Les routes inconnues répondent avec un vrai statut `404`.

Le passage HTTP vers HTTPS utilise une redirection `301` en un saut. Le sous-domaine `pages.dev` redirige vers le domaine principal en `308` tout en conservant le chemin et la query string.

### À corriger ou décider

- Les variantes avec slash final redirigent en `307`. Une `308` permanente est plus cohérente pour normaliser les URLs.
- `www.williamwautrin.com` ne résout pas. Ce n’est pas bloquant, mais un enregistrement proxifié accompagné d’une redirection permanente vers l’apex protège mieux les liens saisis avec `www`.
- Les CV PDF publics répondent en `200` et sont indexables. Si leur indexation n’est pas souhaitée, servir `X-Robots-Tag: noindex` pour ces fichiers.
- `llms.txt` et les feeds RSS/Atom sont absents. Ce sont des optimisations secondaires, à traiter après les vraies routes d’articles.

## 2. Découvrabilité dans les moteurs

Les recherches publiques `site:williamwautrin.com` et sur le domaine exact n’ont pas fait ressortir le portfolio pendant l’audit. Le nom « William Wautrin » fait en revanche apparaître d’autres profils et mentions.

Ce constat ne prouve pas une désindexation : les résultats publics peuvent être incomplets et aucune donnée Search Console n’était disponible. Il justifie néanmoins une vérification immédiate dans Search Console : propriété domaine, sitemap, rapport Pages, inspection des huit URLs, puis demande d’indexation pour les pages importantes.

## 3. Sitemap et robots.txt

Le sitemap est valide, utilise uniquement des URLs HTTPS canoniques et couvre exactement les huit pages actuelles. Le `robots.txt` autorise le crawl et référence correctement le sitemap.

Améliorations :

- Ajouter chaque article autonome et sa variante traduite.
- Ajouter un `lastmod` fiable quand une source de date de modification existe. Ne pas générer une date artificielle à chaque build.
- Conserver les `changefreq` comme information secondaire ; les moteurs peuvent les ignorer.

## 4. Internationalisation

La configuration bilingue est l’un des points les plus propres du site. Les annotations sont réciproques, le canonical correspond à la langue de la page et `x-default` pointe vers la version anglaise.

Pour les futurs articles, reproduire exactement cette logique avec des slugs localisés. Les deux versions doivent se référencer mutuellement, même si les slugs diffèrent.

## 5. Titres, descriptions et headings

### Accueil

Le titre actuellement servi est :

- EN : `William Wautrin — Software & Platform Engineer`
- FR : `William Wautrin — Ingénieur logiciel & plateformes`

Il décrit le profil, mais reflète moins bien le positionnement Cloud/Platform voulu. Une formulation plus précise serait :

- EN : `William Wautrin — Cloud & Platform Engineer in Paris`
- FR : `William Wautrin — Ingénieur Cloud & Platform à Paris`

La route enfant écrase aujourd’hui le titre SEO plus spécialisé défini à la racine. Il faut supprimer cet override ou lui donner le titre final retenu.

### Projects et Experience

Le problème principal est la duplication. En analyse textuelle, les pages Projects et Experience reprennent environ 99 % de leurs tokens depuis l’accueil. Elles ont donc peu de raison d’exister comme résultats de recherche séparés.

Deux options cohérentes :

1. Garder des résumés courts sur l’accueil et enrichir les pages dédiées avec contexte, contraintes, décisions, architecture, résultat et liens.
2. Si aucun contenu supplémentaire n’est prévu, consolider ces sections sur l’accueil et retirer les routes dédiées du sitemap.

La page Projects passe du `h1` aux noms de projets rendus comme simples `span`. La page Experience passe du `h1` aux `h3`. Les éléments principaux doivent devenir des `h2` sémantiques.

Les titres `Experience — William Wautrin` et `Technical notes — William Wautrin` sont trop génériques. Les préciser selon l’intention réelle de chaque page.

La balise `meta keywords` peut être retirée : elle n’apporte rien aux moteurs modernes.

## 6. Article GKE et architecture du blog

L’article est actuellement présent intégralement dans le HTML de `/blog`, à l’intérieur d’un `details` fermé. Le contenu est donc crawlable, mais il n’a ni URL propre, ni canonical propre, ni titre de page, ni byline, ni date exacte en `time`, ni métadonnées sociales dédiées, ni schema `BlogPosting`.

Recommandation de routes :

- EN : `/blog/gke-gitops-full-stack-deployment`
- FR : `/fr/blog/deploiement-full-stack-gke-gitops`

La page `/blog` doit devenir un vrai index : carte compacte, titre, résumé, date et lien vers l’article. La route de l’article doit contenir :

- un `h1` unique ;
- une date de publication 2025 exacte seulement si elle peut être confirmée ;
- une éventuelle date de modification réelle ;
- une byline compacte ;
- canonical et hreflang ;
- `BlogPosting` avec `headline`, `description`, `author`, `inLanguage`, `datePublished`, `dateModified`, `image` et `mainEntityOfPage` ;
- une image OG spécifique, idéalement construite autour du schéma d’architecture ;
- des liens contextuels vers le repository Party et quelques documentations primaires réellement utiles.

Le fond de l’article fonctionne bien : il décrit des choix, des erreurs et des corrections réelles sans surjouer l’expertise. Il n’a pas besoin d’être gonflé artificiellement. Sa faiblesse SEO est surtout structurelle.

## 7. Données structurées

Le schema `Person` est valide et expose les profils GitHub, X, LinkedIn et Credly, ainsi que les domaines d’expertise. Il est toutefois identique sur toutes les pages.

Améliorations :

- Corriger `Person.image`, qui pointe actuellement vers la bannière OG, pour utiliser le portrait.
- Aligner `Person.url` sur le canonical exact de la homepage.
- Construire un petit graphe JSON-LD : `WebSite` + `Person`, puis `ProfilePage` sur l’accueil, `CollectionPage` sur Projects/Experience/Blog et `BlogPosting` sur les articles.
- Réutiliser les mêmes `@id` pour connecter les entités au lieu de dupliquer des objets indépendants.
- Ne pas ajouter de FAQ ou de HowTo si la page ne présente pas réellement ce format.

## 8. Contenu, crédibilité et maillage interne

Le profil inspire confiance grâce aux expériences nommées, aux certifications et à Credly, aux projets publics, aux diagrammes, au contact direct et à l’article écrit à la première personne.

Les points faibles sont l’absence de pages de cas détaillées, l’absence de byline/date sur l’article et la faible autorité externe visible. Les cartes Projects envoient directement vers GitHub sans proposer de parcours interne.

Le meilleur prochain contenu n’est pas une collection d’articles génériques. C’est une page de cas Party/GKE, reliée à l’article, au repository et à l’expérience correspondante. Ensuite, uniquement à partir de sujets réellement pratiqués :

- ownership du déploiement entre CI et Argo CD ;
- instrumentation backend avant les dashboards ;
- External Secrets et Secret Manager sur GKE ;
- tags, digests et boucle Image Updater.

## 9. Autorité externe et backlinks

Aucun score de backlinks n’est présenté : aucune base dédiée n’était connectée. Le domaine n’apparaît pas dans les deux index Common Crawl contrôlés et aucune page référente n’est ressortie des recherches publiques exactes. Cela suggère une découvrabilité externe encore faible, sans démontrer qu’il n’existe aucun backlink.

Le point le plus concret est GitHub : le champ Website du profil public est vide et le champ Company mentionne encore `william.dev`. Les premières actions sont donc entièrement maîtrisables :

- renseigner `https://williamwautrin.com` sur le profil et dans le profile README ;
- ajouter des liens profonds vers le projet ou l’article correspondant dans Party, Lootopia, Instamint et Global Digital ;
- harmoniser l’URL sur LinkedIn, X et Credly ;
- demander un lien depuis une page alumni Sup de Vinci uniquement si le contexte éditorial s’y prête ;
- partager l’article GKE dans des communautés pertinentes quand il répond à une discussion, sans dépôt de liens massif.

Aucun signal ne justifie une opération de désaveu.

## 10. Performance et Core Web Vitals

Mesures Lighthouse en laboratoire :

| Profil | Score | FCP | LCP | TBT | CLS | TTFB |
|---|---:|---:|---:|---:|---:|---:|
| Mobile `/fr/` | 92 | 2,6 s | 2,7 s | 0 ms | 0,0017 | 115 ms |
| Desktop `/fr/` | 100 | 0,6 s | 0,6 s | 0 ms | 0,0017 | 50 ms |

Il n’y a ni données CrUX ni INP terrain. Ces mesures ne doivent donc pas être présentées comme le vécu réel des visiteurs.

Le LCP mobile est légèrement au-dessus du seuil « bon » de 2,5 s en laboratoire. L’élément LCP est le second paragraphe d’introduction du profil, pas une image. Le DOM contient environ 927 éléments ; Lighthouse mesure environ 1,9 s de travail du main thread, dominé par rendu et style/layout, avec pourtant 0 ms de TBT.

Tests recommandés :

- appliquer `content-visibility: auto` avec un `contain-intrinsic-size` réaliste aux sections lourdes sous la ligne de flottaison, en vérifiant que le HTML SSR reste intact ;
- réduire la complexité DOM du graphe GitHub et des schémas uniquement si les mesures confirment le gain ;
- ne pas lancer une chasse agressive au JavaScript : environ 43–44 Ko sont signalés inutilisés, mais le TBT est déjà nul.

## 11. Images et rendu mobile

L’image OG est bien dimensionnée (`1200 × 630`), légère pour son usage et visuellement cohérente. Le portrait JPEG fait `460 × 460` pour un affichage courant d’environ `46 × 46`. Une variante WebP/AVIF avec `srcset` 48/96/144 px éviterait un petit transfert inutile ; ajouter `decoding="async"`.

À 390 px, les huit URLs ont été contrôlées sans overflow horizontal. Les deux thèmes restent cohérents. Quelques détails limitent néanmoins la finition mobile :

- les cibles de navigation font environ 18 px de haut ;
- certains liens GitHub ont une zone active minuscule ;
- plusieurs labels du schéma de trace descendent à 6–9 px ;
- le schéma occupe environ 405 px de hauteur et repousse les premiers CTA sous le premier écran.

Donner aux liens interactifs une zone tactile de 32 à 40 px minimum, masquer les labels secondaires sur petit écran et conserver une taille lisible pour les labels essentiels.

## 12. En-têtes et sécurité

Les réponses HTML observées ne contiennent pas HSTS, CSP, `X-Content-Type-Options`, protection contre le framing ni `Referrer-Policy`.

Ce n’est pas le premier levier de croissance SEO, mais c’est une finition production importante. Ajouter ces en-têtes au niveau de l’application ou de Cloudflare. Déployer d’abord la CSP en `Report-Only`, car le thème initial et le JSON-LD utilisent du contenu inline.

## Limites de l’audit

- Pas d’accès à Google Search Console, Bing Webmaster Tools, GA4 ou logs Cloudflare.
- Pas de données CrUX terrain ; PageSpeed Insights n’a pas fourni de résultat exploitable, Lighthouse local a été utilisé.
- Pas de fournisseur de backlinks ; aucune métrique d’autorité, d’ancres, de liens nouveaux/perdus ou de toxicité ne peut être calculée honnêtement.
- Les recherches publiques et Common Crawl sont des signaux directionnels, pas une preuve d’absence d’indexation ou de liens.

