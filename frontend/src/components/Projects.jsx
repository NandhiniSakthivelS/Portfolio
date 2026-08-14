import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Code, Briefcase, ChevronLeft, ChevronRight } from 'lucide-react';
import './Projects.css';

const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const cleanPath = path.replace(/^\//, '');
  let base = import.meta.env.BASE_URL || '/Portfolio/';
  if (!base.endsWith('/')) base += '/';
  return encodeURI(`${base}${cleanPath}`);
};

const ProjectCard = ({ project, index }) => {
  const hasGithub = Boolean(project.github);
  const hasDemo = Boolean(project.demo && project.demo !== 'https://demo.com' && project.demo.trim() !== '');

  return (
    <motion.div
      className="project-card-flat"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="project-image">
        <img 
          src={getImageUrl(project.image)} 
          alt={project.title} 
          onError={(e) => {
            const clean = project.image.replace(/^\//, '');
            if (e.currentTarget.src.includes('/Portfolio/')) {
              e.currentTarget.src = encodeURI(`/${clean}`);
            } else {
              e.currentTarget.src = encodeURI(`./${clean}`);
            }
          }}
        />
        {(hasGithub || hasDemo) && (
          <div className="project-overlay">
            <div className="overlay-links">
              {hasGithub && (
                <a href={project.github} target="_blank" rel="noreferrer" className="overlay-link" title="GitHub Repository" aria-label="GitHub Repository">
                  <Code size={20} />
                </a>
              )}
              {hasDemo && (
                <a href={project.demo} target="_blank" rel="noreferrer" className="overlay-link" title="Live Demo" aria-label="Live Demo">
                  <ExternalLink size={20} />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="project-content">
        <div className="project-header-info">
          {project.category && <span className="project-category">{project.category}</span>}
          <h3>{project.title}</h3>
          {project.subtitle && <p className="project-subtitle-text">{project.subtitle}</p>}
        </div>

        <p className="project-description-text">{project.description}</p>

        <div className="project-tags">
          {project.tags.map((tag, tIndex) => (
            <span key={tIndex} className="tag">{tag}</span>
          ))}
        </div>

        {(hasGithub || hasDemo) && (
          <div className="project-actions">
            {hasGithub && (
              <a href={project.github} target="_blank" rel="noreferrer" className="project-btn github-btn">
                <Code size={16} /> GitHub
              </a>
            )}
            {hasDemo && (
              <a href={project.demo} target="_blank" rel="noreferrer" className="project-btn demo-btn">
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const projects = [
  {
    title: "GradePilot AI",
    category: "AI-Powered Academic Management Platform",
    description: "GradePilot AI is an AI-powered academic management platform that automates student performance analysis and parent communication. Faculty members can upload student marks, and the system validates data, analyzes academic performance, identifies strong and weak subjects, generates personalized insights, creates academic reports, and sends professional performance reports to parents through email.",
    tags: ["React.js", "Spring Boot", "MySQL", "Google Gemini API", "Java", "AI Agents", "REST API"],
    image: "GradePilotAI.png",
    github: "https://github.com/NandhiniSakthivelS/GradePilotAI"
  },
  {
    title: "GetYourFutureJob",
    subtitle: "AI Resume Analyzer & ATS Optimizer",
    category: "AI-Powered Career Platform",
    description: "GetYourFutureJob is an AI-powered career platform that helps job seekers analyze and improve their resumes. The platform evaluates resumes against job descriptions, identifies missing keywords and skill gaps, provides ATS optimization suggestions, and helps users create professional, ATS-friendly resumes.",
    tags: ["React.js", "Vite", "Tailwind CSS", "Node.js", "Express.js", "Google Gemini API", "AI"],
    image: "GetYourFutureJob.png",
    github: "https://github.com/NandhiniSakthivelS/AI-powered-ResumeAnalyser"
  },
  {
    title: "EduNexus",
    category: "Academic Administration Platform",
    description: "A centralized academic administration platform built to manage student records, attendance, courses, academic performance, fees, and institutional communication through role-based access.",
    tags: ["React", "Spring Boot", "MongoDB"],
    image: "EduNexus.webp",
    github: "https://github.com/NandhiniSakthivelS/EduNexus"
  },
  {
    title: "ReClaimX",
    category: "Campus Ecosystem",
    description: "An intelligent campus lost-and-found ecosystem that automates item matching using keyword analysis and delivers instant real-time notifications to help students recover misplaced belongings efficiently.",
    tags: ["React", "Spring Boot", "MySQL"],
    image: "ReClaimX.jpg",
    github: "https://github.com/NandhiniSakthivelS/ReClaimX"
  },
  {
    title: "Expense Tracker",
    category: "Finance Management",
    description: "A modern finance management application that enables users to record transactions, monitor spending patterns, analyze financial activity, and maintain better budgeting habits through interactive insights.",
    tags: ["React", "Spring Boot", "MySQL"],
    image: "expense tracker.jpg",
    github: "https://github.com/NandhiniSakthivelS/ExepenseTracker"
  },
  {
    title: "Unified Scholarship Portal",
    category: "Scholarship Administration",
    description: "A smart scholarship management platform that connects students with suitable opportunities through profile-based eligibility matching, application tracking, and centralized scholarship administration.",
    tags: ["React", "Spring Boot", "MySQL"],
    image: "USPimage.jpg",
    github: "https://github.com/NandhiniSakthivelS/Unified-Scholarship-Portal"
  }
];

const Projects = () => {
  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
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
          <p className="section-subtitle">A showcase of my recent work and personal projects.</p>
        </motion.div>

        <div className="projects-carousel-wrapper">
          <motion.button 
            className="carousel-arrow left" 
            onClick={() => scroll('left')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous Projects"
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
            aria-label="Next Projects"
          >
            <ChevronRight size={24} />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
