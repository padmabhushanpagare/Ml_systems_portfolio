import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-accent font-medium tracking-wider uppercase mb-4 block">
          Portfolio
        </span>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          Alex Chen
        </h1>
        <h2 className="text-3xl md:text-5xl font-semibold text-gray-400 mb-8">
          Data Scientist <span className="text-accent">|</span> ML Systems Builder
        </h2>
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed mb-12">
          I bridge the gap between research and production, architecting scalable ML systems that deliver measurable business outcomes and reduce operational costs.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={scrollToProjects}
            className="group flex items-center justify-center gap-2 bg-accent text-background font-semibold px-8 py-4 rounded-lg hover:bg-accent-hover transition-colors duration-300"
          >
            View Projects
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            className="flex items-center justify-center gap-2 border border-gray-600 text-white font-medium px-8 py-4 rounded-lg hover:border-accent hover:text-accent transition-colors duration-300"
          >
            Download Resume
            <Download className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;