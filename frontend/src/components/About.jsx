import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { User } from 'lucide-react';
import './About.css';

const Counter = ({ value }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    if (value.includes('.')) {
      return latest.toFixed(2);
    }
    return Math.round(latest);
  });
  const [displayValue, setDisplayValue] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      count.set(0); // Reset to 0 before starting
      const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
      const controls = animate(count, numericValue, {
        duration: 5,
        ease: "easeOut"
      });

      const unsubscribe = rounded.on("change", (v) => {
        setDisplayValue(v + (value.includes('+') ? '+' : ''));
      });

      return () => {
        controls.stop();
        unsubscribe();
      };
    }
  }, [isInView, value, count, rounded]);

  return <motion.span ref={ref} className="stat-number">{displayValue}</motion.span>;
};

const About = () => {
  const stats = [
    { number: '8.81', label: 'CGPA' },
    { number: '6+', label: 'Projects' },
    { number: '5+', label: 'Certifications' }
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-content">
            <motion.h2
              className="section-title-with-icon-centered"
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
              <User className="section-icon" />
              About Me
            </motion.h2>

            <div className="about-bio">
              <p className="about-text">
                I’m an aspiring Full Stack Developer and Computer Science Engineering student passionate about building modern, scalable web applications, with a strong focus on Java programming. With hands-on experience in React.js, Spring Boot, MySQL, and REST APIs, I have developed multiple full-stack projects focused on improving user experience
              </p>
              <p className="about-text">
                I am highly interested in creating responsive applications, expanding into emerging fields like Generative AI and Agentic AI, and continuously improving my development skills.
              </p>
            </div>

            <div className="about-stats">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-item glass-circle"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <svg className="stat-circle-svg" viewBox="0 0 100 100">
                    <circle
                      cx="50" cy="50" r="48"
                      className="circle-bg"
                    />
                    <motion.circle
                      cx="50" cy="50" r="48"
                      className="circle-progress"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 5, delay: 0.5 + index * 0.1, ease: "easeInOut" }}
                    />
                  </svg>

                  <div className="stat-info">
                    <Counter value={stat.number} />
                    <span className="stat-label">{stat.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
