import { About } from './components/About';
import { Contact } from './components/Contact';
import { Cursor } from './components/Cursor';
import { Experience } from './components/Experience';
import { Hero } from './components/Hero';
import { Journey } from './components/Journey';
import { Nav } from './components/Nav';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { useRevealOnScroll } from './hooks/useMotion';

export default function App() {
  useRevealOnScroll();
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Cursor />
    </>
  );
}
