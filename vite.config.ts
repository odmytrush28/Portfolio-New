import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Injects the public site URL into index.html (Open Graph / canonical tags).
 * On GitHub Actions the URL is computed automatically from the repository
 * (see .github/workflows/deploy.yml). Locally it falls back to relative URLs.
 */
function siteUrl(url: string): Plugin {
  const clean = url ? url.replace(/\/?$/, '/') : '';
  return {
    name: 'inject-site-url',
    transformIndexHtml(html) {
      const tags = clean
        ? `<link rel="canonical" href="${clean}" />\n    <meta property="og:url" content="${clean}" />`
        : '';
      return html.replace(/__SITE_URL__/g, clean).replace('<!--SITE_URL_TAGS-->', tags);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    // Relative base keeps every asset path working on GitHub Pages
    // (https://<user>.github.io/<repo>/) and on a custom domain.
    base: './',
    plugins: [react(), siteUrl(env.SITE_URL ?? '')],
    build: {
      target: 'es2019',
      assetsInlineLimit: 2048,
      cssCodeSplit: false,
    },
  };
});
