import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import MobileNav from './components/MobileNav';
import Intro from './components/Intro';
import SkillsTrain from './components/SkillsTrain';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Handle internal anchor links smoothly
    const handleAnchorClick = (e) => {
      const link = e.target.closest('a');
      if (link && link.hash && link.origin === window.location.origin) {
        const targetElement = document.querySelector(link.hash);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement, {
            offset: -80, // Offset for fixed navbar
            duration: 1.5,
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="app" data-theme="light">
      <AnimatePresence mode="wait">
        {loading ? (
          <Intro key="intro" onFinish={() => setLoading(false)} />
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div className="scroll-progress" style={{ scaleX }} />
            <div className="bg-gradient"></div>
            
            <Navbar />
            
            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Education />
              <Contact />
            </main>

            <MobileNav />
            <SkillsTrain />
            
            <footer className="footer">
              <p>&copy; {new Date().getFullYear()} Nandhini Sakthivel. All rights reserved.</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
