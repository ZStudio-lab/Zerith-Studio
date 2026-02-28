# CounterAPI Setup

Your provided token (`ut_TlebEqG5Q0ZHdwTssRvTRy9cV0jR6nnlrEJP9h8K`) from https://app.counterapi.dev lets the static page store a global count without any external login.

## Steps

1. **Verify token and namespace**
   - The token appears to belong to your "zerith-studios-team" on CounterAPI.
   - In `script.js`, the constants are already set:
     ```js
     const COUNTER_API_BASE = 'https://api.counterapi.dev';
     const COUNTER_API_TOKEN = 'ut_TlebEqG5Q0ZHdwTssRvTRy9cV0jR6nnlrEJP9h8K';
     const COUNTER_NAMESPACE = 'downloads';
     ```
   - If you wish to use a different namespace/key, adjust `COUNTER_NAMESPACE` accordingly; the token authenticates the request.

2. **Customize allowed hosts**
   - Make sure the `ALLOWED_HOSTS` array in `script.js` includes your Pages URL:
     ```js
     const ALLOWED_HOSTS = [
       'zstudio-lab.github.io',
       'zstudio-lab.github.io/Zerith-Studio'
     ];
     ```
   - This reduces abuse but is optional.

3. **Deploy to GitHub Pages**
   - Commit & push the modified `script.js` and `index.html`.
   - Enable Pages in repo settings if not already done.

4. **Test the counter**
   - Open your site at `https://zstudio-lab.github.io/Zerith-Studio/`.
   - The number beneath the download button should reflect the current count stored by CounterAPI.
   - Clicking the button will hit the API and increment the value; the page updates automatically.

5. **Managing your count**
   - If you need to reset or inspect via the CounterAPI dashboard, use the URL you mentioned:
     `https://app.counterapi.dev/team/zerith-studios-team/user-tokens`
   - You can also manually set the counter via the API:
     ```
     https://api.counterapi.dev/ut_TlebEqG5Q0ZHdwTssRvTRy9cV0jR6nnlrEJP9h8K/set/downloads?value=0
     ```

---

This solution keeps the counter within a service that's accessible in your region and requires no server code besides what runs in the visitor’s browser. The token is needed to prevent unauthorized writes.
