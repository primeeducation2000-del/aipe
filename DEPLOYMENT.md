# AIPE Deployment Notes

## Build command

```bash
npm run build
```

## Build output directory

```text
dist
```

## Environment variables

No environment variables are required for the current static site.

## Cloudflare Pages

1. Push this project to a GitHub repository.
2. In Cloudflare, open **Workers & Pages**.
3. Choose **Create application**.
4. Choose **Pages**.
5. Connect the GitHub repository.
6. Set the build command to `npm run build`.
7. Set the build output directory to `dist`.
8. Deploy.

## Custom domain

1. In the Cloudflare Pages project, open **Custom domains**.
2. Add `aipe.uk`.
3. If the domain is already using Cloudflare nameservers, Cloudflare will create the DNS records automatically.
4. If DNS is managed elsewhere, add the CNAME record Cloudflare provides.
5. Wait for SSL/TLS to become active before sharing the live domain.
