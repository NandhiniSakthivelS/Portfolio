import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';

const GithubIcon = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

import './Contact.css';

const Contact = () => {
  const [copyStatus, setCopyStatus] = useState(false);

  const handleEmailClick = (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      navigator.clipboard.writeText('nandhinisakthivel555@gmail.com');
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 3000);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="section-title-centered"
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            whileInView={{ 
              opacity: 1, 
              scale: [0.85, 1.05, 1],
              y: 0
            }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ 
              duration: 0.8,
              ease: "easeOut"
            }}
          >
            Get In Touch
          </motion.h2>
          <p className="section-subtitle">Have a project in mind? Let's build something amazing together.</p>
        </motion.div>

        <div className="contact-main">
          <motion.div
            className="social-footer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="social-links-horizontal">
              <a 
                href="mailto:nandhinisakthivel555@gmail.com" 
                className="social-icon-box email" 
                title="Email Me"
                onClick={handleEmailClick}
              >
                <Mail size={26} />
                <AnimatePresence>
                  {copyStatus && (
                    <motion.span 
                      className="copy-toast"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: -40 }}
                      exit={{ opacity: 0 }}
                    >
                      Copied!
                    </motion.span>
                  )}
                </AnimatePresence>
              </a>
              <a href="https://www.linkedin.com/in/nandhinisakthivel01" target="_blank" rel="noreferrer" className="social-icon-box linkedin" title="LinkedIn">
                <LinkedinIcon size={26} />
              </a>
              <a href="https://github.com/NandhiniSakthivels" target="_blank" rel="noreferrer" className="social-icon-box github" title="GitHub">
                <GithubIcon size={26} />
              </a>
            </div>
            <p className="location-text">
              <MapPin size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
              Tiruppur, Tamil Nadu, India
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
