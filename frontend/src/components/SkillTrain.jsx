import React from 'react';
import { motion } from 'framer-motion';
import './SkillTrain.css';

const SkillTrain = () => {
  const skills = [
    "Java", "Spring Boot", "React.js", "MySQL", "JavaScript", 
    "HTML5", "CSS3", "REST APIs", "Git", "C++", "Python", "Problem Solving"
  ];

  // Duplicate skills to create a seamless loop
  const duplicatedSkills = [...skills, ...skills, ...skills];

  return (
    <div className="skill-train-container">
      <div className="train-track">
        <motion.div 
          className="train-engine"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {duplicatedSkills.map((skill, index) => (
            <div key={index} className="train-carriage">
              <div className="carriage-body">
                <span>{skill}</span>
                <div className="wheels">
                  <div className="wheel"></div>
                  <div className="wheel"></div>
                </div>
              </div>
              {index < duplicatedSkills.length - 1 && <div className="connector"></div>}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SkillTrain;
