# Cloudflare Pages Setup

This guide covers the **one-time Cloudflare configuration** required by the
Deploy web UI workflow (`.github/workflows/deploy-web-ui.yml`). It exists so
the next maintainer doesn't have to rediscover which account, project name,
and token permissions are needed.

If you just want to fix a failing deploy, jump to **§3 Troubleshooting**.

## 1. What the workflow expects

| Item | Required value | Where it comes from |
|---|---|---|
| Cloudflare **Account ID** | Any account you control | GitHub repo → Settings → Secrets → `CLOUDFLARE_ACCOUNT_ID` |
| Cloudflare **API token** | Scoped to that account, with **Pages: Edit** | GitHub repo → Settings → Secrets → `CLOUDFLARE_API_TOKEN` |
| Pages **project name** | `cv-builder-cf-web` (literal, in workflow) | Hard-coded in the workflow — see "Renaming the project" below |

The workflow will fail fast if any of these are misaligned: a step called
**Verify Cloudflare Pages project exists** runs *before* `wrangler` and calls
`GET /accounts/{id}/pages/projects/{name}` so a missing project or wrong token
shows up as a clean 401/403/404 in the logs within ~1 second instead of a
confusing wrangler error 30 seconds later.

## 2. One-time setup

### 2.1 Pick the Cloudflare account

If you're starting fresh, [sign up here](https://dash.cloudflare.com/sign-up).
If you have multiple accounts, pick one — the Account ID is shown at the
bottom-right of the dashboard for any page in that account.

### 2.2 Create the Pages project

1. In the chosen account, open **Workers & Pages** → **Pages** tab.
2. Click **Create application** → **Pages** → **Upload assets**.
3. **Project name:** `cv-builder-cf-web` (must match exactly).
4. **Production branch name:** `main`.
5. Click **Create project**. You don't need to upload anything yet — the
   workflow pushes the built `out/` directory on every PR and on pushes to
   `main`.

### 2.3 Create a scoped API token

1. Cloudflare → top-right **My Profile** → **API Tokens** → **Create Token**.
2. Choose **Custom token** (not the "Edit Cloudflare Pages" template — that
   one has wider scope than needed).
3. Permissions:
   - `Account → Cloudflare Pages: Edit`
   - `Account → Account Settings: Read`
4. Account Resources: include **only** the account from §2.1.
5. Save the token value — Cloudflare shows it once.

### 2.4 Wire secrets into the GitHub repo

In the repo: **Settings** → **Secrets and variables** → **Actions** →
**New repository secret**.

| Name | Value |
|---|---|
| `CLOUDFLARE_ACCOUNT_ID` | Account ID from §2.1 |
| `CLOUDFLARE_API_TOKEN` | Token value from §2.3 |

### 2.5 Trigger a deploy

Push any commit to a branch that has an open PR against `main`, or push
directly to `main`. The workflow will run, the pre-flight will pass, and the
**Post preview URL on PR** step will leave a sticky comment on the PR with
the preview URL.

## 3. Troubleshooting

The **Verify Cloudflare Pages project exists** step is your friend. Read its
log first.

| HTTP status from pre-flight | Meaning | Fix |
|---|---|---|
| **200** | All good | — |
| **401** | API token is invalid or expired | Rotate the token (§2.3) and update the secret (§2.4) |
| **403** | Token lacks Pages:Edit on this account | Check the token's Account Resources; make sure it covers the account from §2.1 |
| **404** | Project `cv-builder-cf-web` does not exist in this account | Either create it (§2.2) or rename it in the workflow (see below) |
| **curl: (6) Could not resolve host** | Runner network glitch — re-run the job | — |

If pre-flight passes but the **Deploy to Cloudflare Pages** step fails, the
issue is in `wrangler` output — usually a missing `out/` directory (the build
step was skipped or failed silently) or a wrangler version mismatch.

## 4. Renaming the project

If `cv-builder-cf-web` is taken in your account, or you want a different name,
update **two places** in `.github/workflows/deploy-web-ui.yml`:

1. The pre-flight step's `CF_PROJECT_NAME` env var.
2. The deploy step's `--project-name=cv-builder-cf-web` argument.

Then create the new project in Cloudflare under the same name. Mismatch
between workflow and dashboard will fail pre-flight with 404.

## 5. Why a dedicated account?

Using a separate Cloudflare account for CI keeps production infrastructure
isolated from personal accounts. If the team grows, this account is also the
place to add a custom domain once the project graduates from `*.pages.dev`.