import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import './Education.css';

const EducationCard = ({ item, index }) => {
  return (
    <motion.div
      className="education-card-flat"
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
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
          <p className="details">{item.details}</p>
        </div>
      </div>
    </motion.div>
  );
};

const educationData = [
  {
    degree: "B.E Computer Science and Engineering",
    institution: "V.S.B. Engineering College, Karur",
    duration: "2023 - 2027",
    details: "CGPA: 8.96",
    icon: <GraduationCap size={24} />
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Kongu Vellalar Matriculation Hr. Sec. School",
    duration: "2022 - 2023",
    details: "Percentage: 92%",
    icon: <GraduationCap size={24} />
  },
  {
    degree: "Secondary School Leaving Certificate (SSLC)",
    institution: "Punitha Amala Annai Girls Hr. Sec. School",
    duration: "2020 - 2021",
    details: "Percentage: 100%",
    icon: <GraduationCap size={24} />
  }
];

const Education = () => {
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
            Education
          </motion.h2>
        </motion.div>

        <div className="education-timeline">
          {educationData.map((item, index) => (
            <EducationCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
