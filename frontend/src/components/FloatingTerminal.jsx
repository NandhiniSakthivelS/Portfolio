import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, Minimize2, Maximize2 } from 'lucide-react';
import './FloatingTerminal.css';

const FloatingTerminal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [factIndex, setFactIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const facts = [
    "Current focus: Mastering Three.js & WebGL",
    "Coffee level: 85% (Need more beans)",
    "Favorite IDE: VS Code (with custom theme)",
    "Currently building: Premium Portfolio v2.0",
    "Fun fact: I dream in JavaScript sometimes",
    "Status: Available for exciting projects",
    "Location: Bangalore, India"
  ];

  useEffect(() => {
    if (isMinimized || !isOpen) return;

    let charIndex = 0;
    let typingInterval;
    
    const startTyping = () => {
      setIsTyping(true);
      setCurrentText('');
      charIndex = 0;
      
      typingInterval = setInterval(() => {
        if (charIndex < facts[factIndex].length) {
          setCurrentText(prev => prev + facts[factIndex][charIndex]);
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          
          // Wait before next fact
          setTimeout(() => {
            setFactIndex((prev) => (prev + 1) % facts.length);
          }, 3000);
        }
      }, 50);
    };

    startTyping();

    return () => clearInterval(typingInterval);
  }, [factIndex, isMinimized, isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div 
      className={`floating-terminal ${isMinimized ? 'minimized' : ''}`}
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
    >
      <div className="terminal-header">
        <div className="header-left">
          <Terminal size={14} className="terminal-icon" />
          <span>nandhini@portfolio: ~</span>
        </div>
        <div className="header-right">
          <button onClick={() => setIsMinimized(!isMinimized)} title={isMinimized ? "Maximize" : "Minimize"}>
            {isMinimized ? <Maximize2 size={12} /> : <Minimize2 size={12} />}
          </button>
          <button onClick={() => setIsOpen(false)} title="Close">
            <X size={12} />
          </button>
        </div>
      </div>
      
      {!isMinimized && (
        <div className="terminal-body">
          <div className="terminal-line">
            <span className="prompt">{'>'} </span>
            <span className="content">{currentText}</span>
            <span className={`cursor ${isTyping ? 'typing' : 'blinking'}`}>_</span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default FloatingTerminal;
