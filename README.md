# SquareDeal Docs

Static one-page site for free, open-source Hawaii real property templates.

Live domain (after you connect it): [https://squaredealdocs.com](https://squaredealdocs.com)

## 1. Preview locally

**Option A — Finder**

1. Open **Finder**.
2. Go to this project folder: **SquareDeal Docs**.
3. Double-click **index.html**.
4. The site should open in your browser.

**Option B — local server (closer to the live site)**

1. Open the **Terminal** app on your Mac.
2. Paste this and press Return (this moves you into the project folder):

   ```bash
   cd "/Users/lukekorkowski/SquareDeal Docs"
   ```

3. Paste this and press Return:

   ```bash
   npx --yes serve
   ```

4. When it prints a URL such as `http://localhost:3000`, open that address in your browser.
5. You should see the SquareDeal Docs page with the purchase-contract photo at the top.

## 2. Preferred deploy: Cloudflare Pages

Cloudflare Pages is a free host for this kind of static website. It copies the files from GitHub and puts them on the internet.

You need a **GitHub** account (a place that stores the site files) and a **Cloudflare** account.

### Put the site on GitHub

1. Open [https://github.com/login](https://github.com/login) and sign in. If you do not have an account, click **Create an account** first.
2. After you are signed in, click the **+** in the top right, then click **New repository**.
3. In **Repository name**, type `squaredealdocs`.
4. Leave it **Public** or choose **Private** — either works.
5. Do **not** check **Add a README file**.
6. Click **Create repository**.
7. Open the **Terminal** app on your Mac.
8. Paste these lines, one block at a time, and press Return. Replace `YOUR_GITHUB_USERNAME` with your GitHub username:

   ```bash
   cd "/Users/lukekorkowski/SquareDeal Docs"
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/squaredealdocs.git
   git push -u origin main
   ```

9. Refresh the GitHub page. You should see files such as `index.html` and `styles.css`.

### Connect GitHub to Cloudflare Pages

1. Open [https://dash.cloudflare.com](https://dash.cloudflare.com) and sign in. If you do not have an account, click **Sign up** first (the free plan is enough).
2. In the left sidebar, click **Workers & Pages**.
3. Click **Create**.
4. Click the **Pages** tab.
5. Click **Import an existing Git repository** (or **Connect to Git**).
6. If Cloudflare asks to connect GitHub, click **Connect GitHub**, then **Install & Authorize**, and allow access to the `squaredealdocs` repository.
7. Select the **squaredealdocs** repository.
8. Fill in the setup form exactly like this:
   - **Project name:** `squaredealdocs`
   - **Production branch:** `main`
   - **Framework preset:** **None**
   - **Build command:** leave blank
   - **Build output directory:** `/`
9. Click **Save and Deploy**.
10. Wait until the build shows **Success**. You should get a temporary address like `https://squaredealdocs.pages.dev`. Open it and confirm the site looks right.

Common mistake: do not pick a framework such as Next.js or React. This site has no build step.

## 3. Custom domain: squaredealdocs.com

Do this **after** the Pages project has deployed successfully.

1. In the Cloudflare dashboard, click **Workers & Pages**.
2. Click the **squaredealdocs** project.
3. Click the **Custom domains** tab.
4. Click **Set up a domain**.
5. Type `squaredealdocs.com` and click **Continue**.
6. Follow the prompts until the domain is listed. Success looks like **Active** (it may say **Initializing** for a few minutes first).
7. Click **Set up a domain** again.
8. Type `www.squaredealdocs.com` and click **Continue**.
9. Wait until **www** also shows **Active**.

Cloudflare will then issue HTTPS (the padlock / `https://`) automatically. That can take a few minutes.

## 4. DNS

DNS is the setting that tells the internet “this domain name belongs to this website.”

### Best path: move nameservers to Cloudflare

Use this if you can change nameservers at the company where you bought `squaredealdocs.com` (GoDaddy, Namecheap, Google Domains / Squarespace, etc.).

1. In the Cloudflare dashboard, click **Websites** (sometimes labeled **Domain registration** / **Overview** for a zone).
2. If `squaredealdocs.com` is not already a site in Cloudflare, click **Add a domain**, type `squaredealdocs.com`, and choose the **Free** plan.
3. Cloudflare will show two **nameservers**, such as `ada.ns.cloudflare.com` and `bob.ns.cloudflare.com`. Copy both. Do not guess these — use the pair Cloudflare shows you.
4. Open a new tab and sign in to the company where you bought the domain (the **registrar**).
5. Open the domain **squaredealdocs.com**.
6. Find **Nameservers** or **Change nameservers**. Do not look in the “DNS records” list yet — this step replaces who manages DNS.
7. Choose **Custom nameservers** (or **Change nameservers**).
8. Delete the old nameservers and paste the two Cloudflare nameservers.
9. Click **Save**.
10. Return to Cloudflare. Wait until the zone status is **Active**. This can take a few minutes, sometimes up to 24 hours.
11. Then complete **section 3** above (add `squaredealdocs.com` and `www.squaredealdocs.com` as Pages custom domains).
12. Cloudflare will create the DNS records for you and turn on the orange-cloud **proxy**. HTTPS is automatic.

Common mistakes:

- Changing A records but leaving the old nameservers. For this best path, nameservers must be Cloudflare’s.
- Adding the custom domain in Pages **before** the domain is a Cloudflare zone. Add the domain as a Cloudflare website first, wait until it is active, then attach it to Pages.
- Expecting the new domain to work in 10 seconds. Nameserver changes often take 15–60 minutes.

### If the domain stays at another registrar

Use this only if you cannot move nameservers to Cloudflare.

1. Finish **section 3** in the Cloudflare Pages project so both custom domains are added. Cloudflare will show the exact record to create.
2. Sign in at your registrar and open **DNS** for `squaredealdocs.com`.
3. Add a **CNAME** record:
   - **Name / Host:** `www`
   - **Target / Value:** `squaredealdocs.pages.dev`
   - **Proxy:** if your registrar has a proxy toggle, leave it off unless they tell you otherwise.
4. For the **apex** (the bare name `squaredealdocs.com`, with no `www`):
   - If the registrar offers **ALIAS**, **ANAME**, or **flattened CNAME**, create one pointing `squaredealdocs.com` to `squaredealdocs.pages.dev` (or to the target Cloudflare displays).
   - If it does not, use the **A records** Cloudflare shows on the custom-domain screen. Do not invent IP addresses.
5. Save the records.
6. Wait 5–30 minutes, then visit `https://www.squaredealdocs.com`. Success is the SquareDeal Docs page with a padlock in the address bar.

Common mistake: creating a CNAME for `www` but never adding the domain inside the Pages **Custom domains** tab. Both are required. A CNAME alone can show a **522** error.

## 5. Fallback: GitHub Pages

Use this only if Cloudflare is not an option.

1. On GitHub, open the `squaredealdocs` repository.
2. Click **Settings**.
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
5. Set **Branch** to `main` and folder to `/ (root)`.
6. Click **Save**.
7. GitHub will publish at `https://YOUR_GITHUB_USERNAME.github.io/squaredealdocs/` (or a `github.io` URL it displays).
8. For `www.squaredealdocs.com`, still in **Pages**, add the custom domain `www.squaredealdocs.com`.
9. At your registrar, create a **CNAME**: host `www`, value `YOUR_GITHUB_USERNAME.github.io`.
10. For the apex `squaredealdocs.com`, GitHub currently asks you to create these **A** records pointing to GitHub’s IPs:

    - `185.199.108.153`
    - `185.199.109.153`
    - `185.199.110.153`
    - `185.199.111.153`

    Confirm the current list on GitHub’s Pages screen before you save. IPs can change.
11. Check **Enforce HTTPS** after the domain becomes available. Apex HTTPS on GitHub Pages is slower and more awkward than Cloudflare. Prefer Cloudflare if you can.

## 6. How to add a new template

1. Open `index.html`.
2. Find the right list: **Purchase Documents**, **Rental Documents**, or **Other Documents**.
3. Copy an existing `<li>...</li>` item.
4. Change the visible label.
5. Change the `href` URL:
   - Google Docs and Google Sheets must end in `/template/preview` (never `/edit`).
   - PDFs and other Drive files use `https://drive.google.com/file/d/FILE_ID/view`.
   - Do not invent `/template/preview` for PDFs.
6. Keep `target="_blank"` and `rel="noopener noreferrer"`.
7. If the file is a PDF, put `(PDF)` in the label, for example `Residential Lease (PDF)`.
8. If both a Google Doc and a PDF exist, list both.
9. Save, then commit and push to `main`. Cloudflare Pages will republish automatically once GitHub is connected.
