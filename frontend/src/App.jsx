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
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [accent, setAccent] = useState(localStorage.getItem('accent') || '#6366f1');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent-color', accent);
    // Generate a slightly darker hover color automatically or use a mapping
    const hoverColor = accent === '#6366f1' ? '#4f46e5' : 
                       accent === '#a855f7' ? '#9333ea' :
                       accent === '#10b981' ? '#059669' :
                       accent === '#f59e0b' ? '#d97706' : accent;
    document.documentElement.style.setProperty('--accent-hover', hoverColor);
    
    // Add RGB calculation for rgba() usage in CSS
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
    };
    document.documentElement.style.setProperty('--accent-color-rgb', hexToRgb(accent));
    
    localStorage.setItem('accent', accent);
  }, [accent]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

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
    <div className="app" data-theme={theme}>
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
            
            <Navbar theme={theme} toggleTheme={toggleTheme} accent={accent} setAccent={setAccent} />
            
            <main>
              <Hero accent={accent} />
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
