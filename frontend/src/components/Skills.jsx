import React from 'react';
import { motion } from 'framer-motion';
import {
  Cpu, Code, Terminal, FileCode, Palette,
  Coffee, Server, Globe, Database,
  GitBranch, Send, Cloud, Leaf, Webhook
} from 'lucide-react';
import './Skills.css';

const periodicSkills = [
  // Languages
  { symbol: "Jv", name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", group: "language" },
  { symbol: "C", name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", group: "language" },
  { symbol: "Js", name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", group: "frontend" },
  { symbol: "Rt", name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", group: "frontend" },
  { symbol: "Ht", name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", group: "frontend" },
  { symbol: "Cs", name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", group: "frontend" },
  { symbol: "Sb", name: "Spring", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", group: "backend" },
  { symbol: "No", name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", group: "backend" },
  { symbol: "Ra", name: "REST", logo: "https://cdn.simpleicons.org/postman/ff6c37", group: "backend" },
  { symbol: "My", name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", group: "database" },
  { symbol: "Mg", name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", group: "database" },
  { symbol: "Gt", name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", group: "database" },
  { symbol: "Vs", name: "VS Code", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", group: "tool" },
  { symbol: "Aw", name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", group: "tool" }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    y: 20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
};

const SkillElement = ({ skill }) => {
  const [isClicked, setIsClicked] = React.useState(false);

  return (
    <motion.div
      className={`periodic-element ${skill.group} ${isClicked ? 'clicked' : ''}`}
      variants={itemVariants}
      onClick={() => setIsClicked(!isClicked)}
    >
      <div className="element-inner">
        <div className="logo-view">
          <img src={skill.logo} alt={skill.name} className="tech-logo" />
        </div>
        <div className="periodic-view">
          <img src={skill.logo} alt={skill.name} className="tech-logo-small" />
          <span className="element-name">{skill.name}</span>
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <motion.div
          className="skills-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
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
            <Cpu className="section-icon" />
            Tech Skills
          </motion.h2>
          <p className="section-subtitle">The Periodic Table of my technical expertise.</p>
        </motion.div>

        <motion.div
          className="periodic-table"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {periodicSkills.map((skill, index) => (
            <SkillElement key={index} skill={skill} />
          ))}
        </motion.div>

        <div className="periodic-legend">
          <div className="legend-item"><span className="dot language"></span> Languages</div>
          <div className="legend-item"><span className="dot frontend"></span> Frontend</div>
          <div className="legend-item"><span className="dot backend"></span> Backend</div>
          <div className="legend-item"><span className="dot database"></span> Database</div>
          <div className="legend-item"><span className="dot tool"></span> Tools</div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
