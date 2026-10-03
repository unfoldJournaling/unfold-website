# Website domain handoff

The `www.tryunfold.ai` certificate did not cover that hostname during the
2 October 2026 review. Samuel does not have access to the company's Vercel
project. This requires the website project owner; the executive dashboard is
not the website deployment target.

## Owner action

1. Open the existing Vercel project that currently serves `tryunfold.ai`.
2. Under **Settings → Domains**, confirm the apex domain belongs to this project
   and add or repair `www.tryunfold.ai` on the same project.
3. Follow the DNS values Vercel actually displays for this project. Remove a
   conflicting record only after confirming it belongs to this website; do not
   change API, email, or unrelated domain records.
4. Configure `www.tryunfold.ai` to redirect to `tryunfold.ai`. Allow the domain
   check and managed certificate issuance to finish successfully.
5. Verify HTTPS with normal certificate validation before considering this done.

The website's `vercel.json` already includes a permanent www-to-apex redirect
that preserves the path. That source change takes effect after the reviewed
website branch is deployed. It cannot fix an invalid certificate by itself:
TLS validation happens before an HTTP redirect.

## Verification

```sh
curl --head --fail https://www.tryunfold.ai/
curl --head --fail https://www.tryunfold.ai/get-app
curl --head --fail https://tryunfold.ai/get-app
```

The first two requests should complete without a certificate warning and
redirect to the matching apex paths. Following those redirects should reach
HTTP 200. Verify a query-bearing URL as well. Do not use `--insecure` or `-k`.

Deployment also needs the current local code changes to be committed, reviewed
and deployed through the existing website project. Do not replace the current
production project with a new personal deployment to work around missing access.

Reference: [Vercel domain setup](https://vercel.com/docs/domains/working-with-domains/add-a-domain).
