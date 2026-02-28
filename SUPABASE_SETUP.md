# CountAPI Setup for Download Counter

This project now uses [CountAPI](https://countapi.xyz/) to track the number of downloads globally. No backend, login, or third-party analytics service is required — everything works from a static GitHub Pages site.

## Steps to configure

1. **Choose namespace and key**
   - The default values in `script.js` are:
     ```js
     const COUNT_NAMESPACE = 'zerithstudio';
     const COUNT_KEY = 'downloads';
     ```
   - You can keep these or change them to something unique (e.g. your username or project name).
   - The combination of namespace/key identifies the counter; if it doesn't exist, CountAPI creates it automatically on the first hit.

2. **Set allowed hostnames**
   - In `script.js` update the `ALLOWED_HOSTS` array with the domains that are permitted to increment the counter. Example:
     ```js
     const ALLOWED_HOSTS = [
       'your-username.github.io',      // GitHub Pages default
       'www.your-custom-domain.com'     // optional custom domain
     ];
     ```
   - This prevents other websites from abusing your counter by making cross‑origin requests.
   - Note: this is a client‑side check; it deters casual misuse but cannot fully stop a motivated attacker.

3. **Deploy to GitHub Pages**
   - Commit and push all changes including `script.js` updates.
   - In your repository settings, enable GitHub Pages (e.g. `main` branch, `/` root).
   - After a few minutes, your site will be live at `https://your-username.github.io/your-repo/` (or your custom domain).

4. **Verify counter**
   - Visit the site and click the **Download Now** button; you should see the number increment.
   - Refresh the page to confirm the current value loads correctly.

5. **(Optional) Customizing appearance**
   - You can style the counter text in `styles.css` under `#download-counter`.

6. **No login needed**
   - CountAPI doesn't require an account for basic counters.
   - If you ever need to reset or manage the counter, you can visit:
     `https://api.countapi.xyz/set/{namespace}/{key}?value=0`
     replacing `{namespace}` and `{key}` with your values.
   - For more advanced options, refer to the CountAPI docs.

---

Your app is now fully self-contained and will track downloads consistently for all users on GitHub Pages with minimal overhead.
