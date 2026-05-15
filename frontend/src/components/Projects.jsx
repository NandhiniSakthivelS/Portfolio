import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';
import './Projects.css';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      className="project-card-flat"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="project-image">
        <img src={project.image} alt={project.title} />
        <div className="project-overlay">
          <div className="overlay-links">
            <a href={project.github} target="_blank" rel="noreferrer" className="overlay-link">
              <Code size={20} />
            </a>
            <a href={project.demo} target="_blank" rel="noreferrer" className="overlay-link">
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
      </div>
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag, tIndex) => (
            <span key={tIndex} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const projects = [
  {
    title: "EduNexus",
    description: "A centralized academic administration platform built to manage student records, attendance, courses, academic performance, fees, and institutional communication through role-based access.",
    tags: ["React", "Spring Boot", "MongoDB"],
    image: "/EduNexus.webp",
    github: "https://github.com/NandhiniSakthivelS/EduNexus",
    demo: "https://demo.com"
  },
  {
    title: "ReClaimX",
    description: "An intelligent campus lost-and-found ecosystem that automates item matching using keyword analysis and delivers instant real-time notifications to help students recover misplaced belongings efficiently.",
    tags: ["React", "Spring Boot", "MySQL"],
    image: "/ReClaimX.jpg",
    github: "https://github.com/NandhiniSakthivelS/ReClaimX",
    demo: "https://demo.com"
  },
  {
    title: "Expense Tracker",
    description: "A modern finance management application that enables users to record transactions, monitor spending patterns, analyze financial activity, and maintain better budgeting habits through interactive insights.",
    tags: ["React", "Spring Boot", "MySQL"],
    image: "/expense tracker.jpg",
    github: "https://github.com/NandhiniSakthivelS/ExepenseTracker",
    demo: "https://demo.com"
  },
  {
    title: "Unified Scholarship Portal",
    description: "A smart scholarship management platform that connects students with suitable opportunities through profile-based eligibility matching, application tracking, and centralized scholarship administration.",
    tags: ["React", "Spring Boot", "MySQL"],
    image: "/USPimage.jpg",
    github: "https://github.com/NandhiniSakthivelS/Unified-Scholarship-Portal",
    demo: "https://demo.com"
  }
];

const Projects = () => {
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
            <Briefcase className="section-icon" />
            Projects
          </motion.h2>
          <p className="section-subtitle">A showcase of some of my recent work and personal projects.</p>
        </motion.div>

        <div className="projects-carousel-wrapper">
          <motion.button 
            className="carousel-arrow left" 
            onClick={() => scroll('left')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={24} />
          </motion.button>

          <div className="projects-grid-container" ref={scrollRef}>
            <motion.div 
              className="projects-grid"
              drag="x"
              dragConstraints={scrollRef}
              dragElastic={0.1}
            >
              {projects.map((project, index) => (
                <ProjectCard key={index} project={project} index={index} />
              ))}
            </motion.div>
          </div>

          <motion.button 
            className="carousel-arrow right" 
            onClick={() => scroll('right')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
