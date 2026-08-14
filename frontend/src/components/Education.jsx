import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Calendar,
  MapPin,
  Award,
  CheckCircle2,
  Sparkles,
  BookOpen,
  ShieldCheck,
  Database,
  Code2,
  Cpu
} from 'lucide-react';
import './Education.css';

const EducationCard = ({ item, index }) => {
  return (
    <motion.div
      className="education-card-flat"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      layout
    >
      <div className="education-info-wrapper">
        <div className="education-icon-wrapper">
          {item.icon}
        </div>
        <div className="education-info">
          <div className="education-top">
            <h3>{item.degree}</h3>
            <span className="duration">
              <Calendar size={14} />
              {item.duration}
            </span>
          </div>
          <p className="institution">
            <MapPin size={14} />
            {item.institution}
          </p>
          <div className="education-bottom-meta">
            <span className="details-badge">{item.details}</span>
            {item.specialization && (
              <span className="spec-badge">{item.specialization}</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CertificateCard = ({ cert, index }) => {
  return (
    <motion.div
      className="certificate-card-modern"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      layout
    >
      <div className="cert-card-header">
        <div className="cert-icon-box">
          {cert.icon}
        </div>
        <div className="cert-verified-pill">
          <CheckCircle2 size={13} className="verified-check" />
          <span>Verified</span>
        </div>
      </div>

      <div className="cert-content">
        <div className="cert-issuer-row">
          <span className="cert-issuer">{cert.issuer}</span>
          {cert.year && <span className="cert-year">{cert.year}</span>}
        </div>

        <h3 className="cert-title">{cert.title}</h3>
        {cert.description && <p className="cert-desc">{cert.description}</p>}

        {cert.skills && cert.skills.length > 0 && (
          <div className="cert-tags">
            {cert.skills.map((skill, sIdx) => (
              <span key={sIdx} className="cert-tag">{skill}</span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const educationData = [
  {
    degree: "B.E Computer Science and Engineering",
    institution: "V.S.B. Engineering College, Karur",
    duration: "2023 - 2027",
    details: "CGPA: 8.81",
    specialization: "Full Stack Development & CS Core",
    icon: <GraduationCap size={24} />
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Kongu Vellalar Matriculation Hr. Sec. School",
    duration: "2022 - 2023",
    details: "Percentage: 92%",
    specialization: "Computer Science & Mathematics",
    icon: <BookOpen size={24} />
  },
  {
    degree: "Secondary School Leaving Certificate (SSLC)",
    institution: "Punitha Amala Annai Girls Hr. Sec. School",
    duration: "2020 - 2021",
    details: "Percentage: 100%",
    specialization: "Academic Excellence (Centum)",
    icon: <Award size={24} />
  }
];

const certificatesData = [
  {
    title: "Programming in Java",
    issuer: "NPTEL (IIT Kharagpur)",
    icon: <Code2 size={22} />
  },
  {
    title: "Java Full Stack Development",
    issuer: "Infosys Springboard",
    icon: <Cpu size={22} />
  },
  {
    title: "Database Programming with SQL",
    issuer: "Oracle Academy",
    icon: <Database size={22} />
  },
  {
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    icon: <ShieldCheck size={22} />
  }
];

const Education = () => {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Credentials', icon: <Sparkles size={16} /> },
    { id: 'education', label: 'Education', icon: <GraduationCap size={16} /> },
    { id: 'certificates', label: 'Certifications', icon: <Award size={16} /> }
  ];

  return (
    <section id="education" className="education-section">
      <div className="container">
        <motion.div
          className="education-header"
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
            <GraduationCap className="section-icon" />
            Education & Certifications
          </motion.h2>
          <p className="section-subtitle">
            Academic qualifications and industry-recognized professional credentials.
          </p>

          <div className="education-tab-switcher">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    className="tab-active-indicator"
                    layoutId="educationTabIndicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="education-content-wrapper"
          >
            {(activeTab === 'all' || activeTab === 'education') && (
              <div className="edu-block">
                {activeTab === 'all' && (
                  <div className="subsection-title-row">
                    <GraduationCap size={20} className="sub-icon" />
                    <h3>Academic Education</h3>
                  </div>
                )}
                <div className="education-timeline">
                  {educationData.map((item, index) => (
                    <EducationCard key={index} item={item} index={index} />
                  ))}
                </div>
              </div>
            )}

            {(activeTab === 'all' || activeTab === 'certificates') && (
              <div className="certs-block">
                {activeTab === 'all' && (
                  <div className="subsection-title-row">
                    <Award size={20} className="sub-icon" />
                    <h3>Professional Certifications</h3>
                  </div>
                )}
                <div className="certificates-grid">
                  {certificatesData.map((cert, index) => (
                    <CertificateCard key={index} cert={cert} index={index} />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Education;

