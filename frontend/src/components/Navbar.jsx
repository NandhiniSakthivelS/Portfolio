import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, CheckCircle, Timer } from 'lucide-react';
import './Navbar.css';

const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const cleanPath = path.replace(/^\//, '');
  let base = import.meta.env.BASE_URL || '/Portfolio/';
  if (!base.endsWith('/')) base += '/';
  return encodeURI(`${base}${cleanPath}`);
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());

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
              <img
                src={getImageUrl('profile.jpeg')}
                alt="Avatar"
                className="nav-avatar"
                onError={(e) => {
                  if (e.currentTarget.src.includes('/Portfolio/')) {
                    e.currentTarget.src = '/profile.jpeg';
                  } else {
                    e.currentTarget.src = './profile.jpeg';
                  }
                }}
              />
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
              <motion.a
                href="https://drive.google.com/file/d/1A4Qbn6oGDu2D-LX_9Lgn-yEQlGNdHKdn/view?usp=sharing"
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
