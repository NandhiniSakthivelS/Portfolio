import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, CheckCircle, Timer, Sun, Moon } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ toggleTheme, theme, accent, setAccent }) => {
  const [scrolled, setScrolled] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());

  const accents = [
    { color: '#6366f1', name: 'Indigo' },
    { color: '#a855f7', name: 'Purple' },
    { color: '#10b981', name: 'Emerald' },
    { color: '#f59e0b', name: 'Amber' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-IN', {
      timeZone: 'Asia/Kolkata',
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleDownload = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-left">
            <motion.div
              className="nav-logo"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img src="profile.jpeg" alt="Avatar" className="nav-avatar" />
              <span className="logo-text">Portfolio</span>
            </motion.div>

            <div className="live-status">
              <div className="status-badge">
                <span className="dot"></span>
                <span>Available for Projects</span>
              </div>
              <div className="live-time">
                <Timer size={14} className="timer-icon" />
                <span className="time-text">{formatTime(dateTime)}</span>
                <span className="divider">|</span>
                <span className="date-text">{formatDate(dateTime)}</span>
              </div>
            </div>
          </div>

          <div className="nav-right">
            <ul className="nav-links">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <a href={link.href} className="nav-item">
                    {link.name}
                    <span className="underline"></span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="nav-actions">
              <div className="accent-picker">
                {accents.map((item) => (
                  <motion.button
                    key={item.color}
                    className={`accent-dot ${accent === item.color ? 'active' : ''}`}
                    style={{ backgroundColor: item.color }}
                    onClick={() => setAccent(item.color)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    title={item.name}
                  />
                ))}
              </div>

              <motion.button
                className="theme-toggle"
                onClick={toggleTheme}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>

              <motion.a
                href="https://drive.google.com/file/d/1FXTorcY4b4KUuaZg7Gxp1KBeFZhERs4Z/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="download-btn"
                onClick={handleDownload}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={18} />
                <span>Resume</span>
              </motion.a>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {showToast && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
          >
            <div className="toast-content">
              <CheckCircle size={20} color="#10b981" />
              <span>Opening Resume... Thank you!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
