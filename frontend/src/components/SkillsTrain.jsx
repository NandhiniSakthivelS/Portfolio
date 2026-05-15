import React from 'react';
import './SkillsTrain.css';

const SkillsTrain = () => {
  const skills = [
    "Java", "React.js", "Node.js", "Spring Boot", "MySQL", "MongoDB", "JavaScript",
    "HTML", "CSS", "Tailwind CSS", "Git", "Postman", "REST APIs",
    "AWS"
  ];

  // Duplicate the list to create a seamless loop
  const doubleSkills = [...skills, ...skills];

  return (
    <div className="skills-train-container">
      <div className="train-track">
        <div className="train-movement">
          {doubleSkills.map((skill, index) => (
            <div key={index} className="train-carriage">
              <div className="carriage-content">
                <span className="skill-text">{skill}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsTrain;
