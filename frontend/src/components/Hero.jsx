import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const roles = [
    "Software Developer",
    "Full Stack Developer",
    "Web Developer",
    "Java Developer"
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = roles[roleIndex];

      if (!isDeleting) {
        // Typing
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        setTypingSpeed(150);

        if (displayText === currentRole) {
          // Pause at the end of typing
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        setTypingSpeed(75); // Faster deleting

        if (displayText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, roles]);

  return (
    <section id="home" className="hero-section">
      <div className="hero-container container">
        <div className="hero-left">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            NANDHINI SAKTHIVEL
          </motion.h1>

          <div className="role-container">
            <h2 className="hero-role">
              {displayText}
              <span className="terminal-cursor">_</span>
            </h2>
          </div>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Passionate about creating innovative solutions with cutting-edge technology. Specializing in building scalable, user-centric, and responsive web applications.
          </motion.p>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.a
              href="#projects"
              className="cta-button primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              className="cta-button secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </motion.div>
        </div>

        <div className="hero-right">
          {/* 1. The "Birth Line" */}
          <motion.div
            className="birth-line"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 3.5,
              times: [0, 0.2, 0.8, 1],
              ease: "easeInOut"
            }}
          />

          {/* 2. Multiple Jumping Balls of Different Sizes and Colors */}
          <div className="jumping-dots">
            {[
              { size: 4, color: 'white' },
              { size: 8, color: 'var(--accent-color)' },
              { size: 6, color: 'white' },
              { size: 10, color: 'var(--accent-color)' },
              { size: 5, color: 'white' },
              { size: 7, color: 'var(--accent-color)' }
            ].map((ball, i) => (
              <motion.span
                key={i}
                className="birth-dot"
                style={{
                  width: ball.size,
                  height: ball.size,
                  backgroundColor: ball.color,
                  boxShadow: ball.color === 'white' ? '0 0 8px rgba(255,255,255,0.5)' : `0 0 10px ${ball.color}`
                }}
                initial={{ y: 0, opacity: 0 }}
                whileInView={{
                  y: [0, -20 - (i * 2), 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.7 + (i * 0.15),
                  times: [0, 0.5, 1],
                  ease: "easeOut"
                }}
              />
            ))}
          </div>

          {/* 3. The Rising Circle */}
          <motion.div
            className="image-wrapper hero-image"
            initial={{ y: 80, opacity: 0, scale: 0.9, borderColor: 'var(--accent-color)', borderWidth: '4px' }}
            whileInView={{
              y: 0,
              opacity: 1,
              scale: 1,
              borderColor: 'var(--glass-border)', // Fade to subtle glass border
              borderWidth: '1px'
            }}
            transition={{
              duration: 1.5,
              delay: 2.2,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <img src="profile.jpeg" alt="Nandhini Sakthivel" className="profile-img" />
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="hero-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
      </div>
    </section>
  );
};

export default Hero;
