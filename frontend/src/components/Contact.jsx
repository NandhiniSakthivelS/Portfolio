import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';

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

import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const formRef = useRef();
  const [status, setStatus] = useState('');
  const [copyStatus, setCopyStatus] = useState(false);

  const handleEmailClick = (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      navigator.clipboard.writeText('nandhinisakthivel555@gmail.com');
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 3000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    const templateParams = {
      from_name: formRef.current.user_name.value,
      from_email: formRef.current.user_email.value,
      reply_to: formRef.current.user_email.value,
      message: formRef.current.message.value,
      user_email: formRef.current.user_email.value, // Keep this for backward compatibility with template
      user_name: formRef.current.user_name.value    // Keep this for backward compatibility with template
    };

    emailjs.send(
      'service_z3clq1m',
      'template_yvepjbf',
      templateParams,
      'gU84ebH9ThshxOT67'
    )
      .then((result) => {
        console.log(result.text);
        setStatus('success');
        formRef.current.reset();
        setTimeout(() => setStatus(''), 5000);
      }, (error) => {
        console.log(error.text);
        setStatus('error');
      });
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
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="contact-form"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="form-group">
              <input type="text" name="user_name" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" name="user_email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
            </div>
            <button
              type="submit"
              className={`submit-button ${status === 'sending' ? 'disabled' : ''}`}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? (
                <span>Sending...</span>
              ) : status === 'success' ? (
                <>
                  <span>Message Sent</span>
                  <CheckCircle size={18} />
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send size={18} />
                </>
              )}
            </button>
            {status === 'error' && (
              <p className="error-message">Something went wrong. Please try again.</p>
            )}
          </motion.form>

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
                <Mail size={25} />
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
                <LinkedinIcon size={25} />
              </a>
              <a href="https://github.com/NandhiniSakthivels" target="_blank" rel="noreferrer" className="social-icon-box github" title="GitHub">
                <GithubIcon size={25} />
              </a>
            </div>
            <p className="location-text">Tiruppur, Tamil Nadu, India</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
