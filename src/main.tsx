import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@fontsource-variable/fraunces/opsz.css';
import '@fontsource-variable/fraunces/opsz-italic.css';
import '@fontsource-variable/manrope/wght.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/600.css';

import './styles/tokens.css';
import './styles/base.css';
import App from './App';

const root = document.documentElement;
root.classList.remove('no-js');
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) root.classList.add('reduced-motion');
// A tiny crop of the final "glow" frame appears inside primary buttons on hover.
// (Absolute URL: a relative url() inside a custom property would resolve against the CSS file.)
const glow = new URL(`${import.meta.env.BASE_URL}media/story/glow-end.webp`, document.baseURI).href;
root.style.setProperty('--btn-glow-img', `url("${glow}")`);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
