import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Intro.css';

const Intro = ({ onFinish }) => {
  const [phase, setPhase] = useState('vortex'); // vortex, implode, line, reveal, shatter
  const particles = Array.from({ length: 100 });

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 2500)); // Vortex
      setPhase('reconstitute');
      await new Promise(r => setTimeout(r, 2000)); // Particles forming
      onFinish();
    };
    sequence();
  }, [onFinish]);

  return (
    <motion.div 
      className="intro-viewport"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 1 }}
    >
      <div className="vortex-container">
        <AnimatePresence>
          {/* Phase 1 & 2: Vortex & Reconstitution */}
          {(phase === 'vortex' || phase === 'reconstitute') && (
            <motion.div 
              key="vortex-cloud"
              className="particles-cloud-v4"
            >
              {particles.map((_, i) => {
                const angle = (i / particles.length) * (Math.PI * 15);
                const initialRadius = 400 - (i * 2);
                
                // Formation logic
                const gridX = (i % 20) * 20 - 200;
                const gridY = Math.floor(i / 20) * 20 - 100;

                return (
                  <motion.div
                    key={`p-${i}`}
                    className="vortex-p-v3"
                    initial={{ 
                      x: Math.cos(angle) * initialRadius, 
                      y: Math.sin(angle) * initialRadius, 
                      opacity: 0 
                    }}
                    animate={phase === 'vortex' ? {
                      x: 0, 
                      y: 0, 
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.2, 0]
                    } : {
                      x: gridX + (Math.random() * 40 - 20),
                      y: gridY + (Math.random() * 40 - 20),
                      opacity: 0.3,
                      scale: 0.8
                    }}
                    transition={phase === 'vortex' ? {
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut", 
                      delay: i * 0.01 
                    } : {
                      duration: 1.5,
                      ease: "circOut"
                    }}
                    style={{ 
                      backgroundColor: i % 2 === 0 ? 'var(--accent-color)' : '#fff'
                    }}
                  />
                );
              })}
            </motion.div>
          )}

          {/* System Title Reveal */}
          {phase === 'reconstitute' && (
            <div className="reveal-stage-v3">
              <motion.div 
                className="matrix-title-group"
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <h1 className="matrix-text">
                  INITIALIZING<span className="cursor">_</span>
                </h1>
                <p className="matrix-sub">ACCESSING PORTFOLIO CORE</p>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Intro;
