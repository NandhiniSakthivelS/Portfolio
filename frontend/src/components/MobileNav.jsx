import React from 'react';
import { motion } from 'framer-motion';
import { Home, User, Cpu, Briefcase, GraduationCap, Mail } from 'lucide-react';
import './MobileNav.css';

const MobileNav = () => {
  const navItems = [
    { icon: <Home size={18} />, label: 'Home', href: '#home' },
    { icon: <User size={18} />, label: 'About', href: '#about' },
    { icon: <Cpu size={18} />, label: 'Skills', href: '#skills' },
    { icon: <Briefcase size={18} />, label: 'Projects', href: '#projects' },
    { icon: <GraduationCap size={18} />, label: 'Edu', href: '#education' },
    { icon: <Mail size={18} />, label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="mobile-bottom-nav">
      <div className="mobile-nav-container glass">
        {navItems.map((item, index) => (
          <motion.a
            key={index}
            href={item.href}
            className="mobile-nav-item"
            download={item.isDownload}
            whileTap={{ scale: 0.8 }}
          >
            <div className="nav-icon-wrapper">
              {item.icon}
            </div>
            <span className="nav-label">{item.label}</span>
          </motion.a>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
