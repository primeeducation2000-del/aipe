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

The static site can build without environment variables.

The partnership enquiry form and contact enquiry form use Cloudflare Pages Functions at `/api/partnership` and `/api/contact`. In production, add this environment variable after creating the Google Apps Script web app:

```text
GOOGLE_APPS_SCRIPT_PARTNERSHIP_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Without this variable, the forms show a local/development fallback for opening a pre-filled email draft.

## Enquiry Google Sheet

1. In Google Drive, create a Google Sheet for AIPE enquiries.
2. In the Sheet, open **Extensions > Apps Script**.
3. Paste the code from `google-apps-script/partnership-form.gs`.
4. Deploy it as a **Web app**.
5. Set **Execute as** to the script owner.
6. Set access to allow the website to post to it, then copy the `/exec` web app URL.
7. Add that URL to Cloudflare Pages as `GOOGLE_APPS_SCRIPT_PARTNERSHIP_URL`.

When connected, new partnership enquiries are added to a **Partnership Enquiries** tab, general contact enquiries are added to a **Contact Enquiries** tab, and an email notification is sent to `ai@aipe.uk`.

This setup does not use a paid email API. It uses Google Apps Script and Google Sheets. Google may apply normal account quotas for Apps Script and email sending, but there is no Resend/API billing in this implementation.

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
