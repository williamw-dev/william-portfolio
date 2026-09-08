# william-portfolio

William Wautrin's portfolio, built with TanStack Start, React, TypeScript,
Tailwind CSS and Paraglide.

```bash
pnpm install
pnpm dev
```

## Cloudflare Pages

The production build uses Nitro's `cloudflare_pages` preset. It emits the Pages
Function, client assets, translations and files from `public/` into `dist/`.

```bash
pnpm build
pnpm verify:bundle
pnpm preview:cloudflare
```

Pushes and pull requests targeting `main` are validated by
`.github/workflows/cloudflare-pages.yml`. A push to `main` deploys production;
pull requests from this repository receive a preview deployment.

The workflow expects a Cloudflare Pages Direct Upload project named
`william-portfolio` and these GitHub Actions secrets:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`
