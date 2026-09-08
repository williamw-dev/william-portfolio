import type { ArticleContent } from '#/content/gke-article.types'

export const gkeArticleEn: ArticleContent = {
  title: 'What I learned deploying a full-stack application on GKE',
  excerpt:
    'I used Party to experiment with GKE, GitOps, secrets and monitoring. The setup changed quite a bit along the way.',
  meta: 'GKE · GitOps · 10 min read',
  introduction: [
    'Party started as a fairly standard application: a frontend, a backend and PostgreSQL.',
    'Once the application worked, I started using it to learn the deployment side. I wanted to try GKE, Terraform, Helm and Argo CD on a real project. Certificates, external secrets and monitoring were added later.',
    'I did not have the whole architecture planned from the start. I tried a few approaches, kept some and removed others.',
  ],
  sections: [
    {
      title: 'Where the setup ended up',
      blocks: [{ type: 'diagram', name: 'architecture' }],
    },
    {
      title: 'Terraform on one side, Helm on the other',
      blocks: [
        {
          type: 'paragraph',
          text: 'I used Terraform for the GCP resources: the GKE cluster and what was needed to connect Google Secret Manager. The application and its Kubernetes resources lived in a Helm chart.',
        },
        {
          type: 'code',
          code: 'Terraform → GCP infrastructure\nHelm      → Kubernetes resources\nArgo CD   → sync from Git',
        },
        {
          type: 'paragraph',
          text: 'I could have managed the Kubernetes resources with Terraform too, but I did not. Once the cluster existed, I found Helm easier to work with when changing and redeploying the application.',
        },
        {
          type: 'paragraph',
          text: 'I would probably keep that split today. It is not the only valid setup, but it remained understandable for this project.',
        },
      ],
    },
    {
      title: 'Moving away from latest',
      blocks: [
        {
          type: 'paragraph',
          text: 'My first workflow built two Docker images, one for the client and one for the server, then pushed both to GHCR using the `latest` tag.',
        },
        {
          type: 'paragraph',
          text: 'That was enough at first. It became a problem when I wanted to check which version was actually running in the cluster. The image name did not answer that because `latest` could point to different content after every build.',
        },
        {
          type: 'code',
          code: 'party-server:<git-sha>\nparty-client:<git-sha>',
        },
        {
          type: 'paragraph',
          text: 'I switched to tags based on the commit SHA. I also tried using image digests with Argo CD Image Updater. That part took more attempts than I expected.',
        },
      ],
    },
    {
      title: 'The loop caused by Argo CD Image Updater',
      blocks: [
        {
          type: 'paragraph',
          text: 'I then added Argo CD Image Updater to automate image updates. It detected a new image, changed the configuration in Git and let Argo CD sync the cluster.',
        },
        { type: 'diagram', name: 'gitops-loop' },
        {
          type: 'paragraph',
          text: 'The automated commits worked. My CI workflow also ran on Git changes, though. Image Updater could create a commit that started a build, produced another image and triggered Image Updater again.',
        },
        {
          type: 'code',
          language: 'yaml',
          code: "if: github.actor != 'argocd-image-updater'",
        },
        {
          type: 'paragraph',
          text: 'I added this condition so GitHub Actions would ignore commits created by Image Updater. It stopped the loop. I simply had not considered that interaction when I connected the two tools.',
        },
      ],
    },
    {
      title: 'GitHub Actions was deploying the application too',
      blocks: [
        {
          type: 'paragraph',
          text: 'In the final setup, Argo CD synchronized the application, but GitHub Actions also fetched the GKE credentials and ran `helm upgrade --install` directly.',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'helm upgrade --install party-app infra/helm/party \\\n  --namespace party --create-namespace --reuse-values \\\n  --set client.image.tag="<git-sha>" \\\n  --set server.image.tag="<git-sha>"',
        },
        {
          type: 'paragraph',
          text: 'I had two separate paths capable of deploying the application. That was unnecessary and made it harder to know whether the cluster really matched the configuration in Git.',
        },
        {
          type: 'paragraph',
          text: 'Today I would separate them more clearly. CI would test, build and push the images, then stop. It would not access the cluster. Argo CD would handle the deployment from the versioned configuration in Git.',
        },
        { type: 'diagram', name: 'target-flow' },
      ],
    },
    {
      title: 'Ingress, certificates and secrets',
      blocks: [
        {
          type: 'paragraph',
          text: 'Getting the Deployments and Services to run was not what took most of my time. I spent more time going back and forth on NGINX Ingress and cert-manager: annotations, TLS secrets and certificate configuration all needed a few corrections.',
        },
        {
          type: 'paragraph',
          text: 'For credentials, I did not want to keep them in Helm values. I used Google Secret Manager with External Secrets Operator to copy them into Kubernetes Secrets.',
        },
        { type: 'diagram', name: 'secrets' },
        {
          type: 'paragraph',
          text: 'This added a few more resources to understand and configure, but the secrets stayed out of both the chart and the repository.',
        },
      ],
    },
    {
      title: 'Monitoring came last',
      blocks: [
        {
          type: 'paragraph',
          text: 'I added Prometheus and Grafana fairly late. The backend exposed a `/metrics` endpoint, and Prometheus collected application metrics alongside cluster metrics.',
        },
        { type: 'diagram', name: 'observability' },
        {
          type: 'paragraph',
          text: 'The Kubernetes metrics showed me the state of the containers. The backend metrics answered a different set of questions: were events being created, were people joining them, and was the application actually being used?',
        },
        {
          type: 'paragraph',
          text: 'If the goal is to monitor an application, I would start by instrumenting the backend. Prometheus and Grafana can only display what the application exposes. Without useful application metrics, it is easy to end up with good-looking CPU and memory dashboards that still say very little about whether the product works.',
        },
      ],
    },
    {
      title: 'What I would do now',
      blocks: [
        {
          type: 'paragraph',
          text: 'Party did not need GKE to run. A simpler managed service would have been enough. The project was also how I was learning Kubernetes and the surrounding tools, so over-engineering it was part of the exercise.',
        },
        {
          type: 'paragraph',
          text: 'I would keep Terraform, Helm, external secrets and monitoring. I would mostly simplify the deployment: no `helm upgrade` in GitHub Actions, no complicated digest handling until it solves a real problem, and only one path capable of changing what runs in the cluster.',
        },
        {
          type: 'paragraph',
          text: 'I would not repeat every step in the same way. Several parts worked, but were more complicated than they needed to be.',
        },
      ],
    },
    {
      title: 'What stayed with me',
      blocks: [
        {
          type: 'paragraph',
          text: 'Before Party, I still thought about Kubernetes mostly in terms of Deployments, Services and Pods. The project made me spend most of my time on everything around them:',
        },
        {
          type: 'questions',
          items: [
            'tracking the exact version that was deployed;',
            'stopping several tools from deploying at the same time;',
            'getting secrets into Pods without putting them in Git;',
            'exposing the application over HTTPS and checking that it actually worked.',
          ],
        },
        {
          type: 'paragraph',
          text: 'That was also when I started spending more time on the platform around the code than on the application itself.',
        },
      ],
    },
  ],
}
