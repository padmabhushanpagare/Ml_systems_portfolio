import React from 'react';
import { ArrowRight, Download, CheckCircle } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

const Hero: React.FC = () => {
  // Removed useScrollAnimation to improve LCP. 
  // Hero content uses CSS keyframe animation (.hero-animate) instead of waiting for IntersectionObserver.

  const scrollToContact = () => {
    trackEvent('contact_click', { event_category: 'engagement', event_label: 'hero_cta' });
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = () => {
    trackEvent('download_resume', { event_category: 'engagement', event_label: 'hero_resume' });
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto pt-20">
      <div className="hero-animate">
        <span className="text-accent font-medium tracking-wider uppercase mb-4 block">
          Portfolio
        </span>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Alex Chen
        </h1>
        <h2 className="text-2xl md:text-4xl font-semibold text-gray-400 mb-6">
          Data Scientist <span className="text-accent">|</span> ML Systems Builder
        </h2>
        
        {/* Strong Positioning Statement */}
        <p className="text-xl md:text-2xl text-gray-200 max-w-3xl leading-relaxed mb-8 font-light">
          I design production-ready ML systems that improve operational performance and decision accuracy.
        </p>

        {/* Micro-proof Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-4xl">
          {[
            "Improved model accuracy to 63% R²",
            "Reduced MAE to 4.44 minutes",
            "Built anomaly detection for financial risk signals"
          ].map((highlight, i) => (
            <div key={i} className="flex items-center gap-3 bg-surface/50 border border-gray-800 p-4 rounded-lg backdrop-blur-sm hover:border-accent/30 transition-colors">
              <CheckCircle className="text-accent w-5 h-5 shrink-0" />
              <span className="text-sm text-gray-300 font-medium">{highlight}</span>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={scrollToContact}
            className="group flex items-center justify-center gap-2 bg-accent text-background font-bold px-8 py-4 rounded-lg hover:bg-accent-hover transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
            aria-label="Schedule Technical Discussion"
          >
            Schedule Technical Discussion
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={handleDownloadResume}
            className="flex items-center justify-center gap-2 border border-gray-600 text-white font-medium px-8 py-4 rounded-lg hover:border-accent hover:text-accent transition-colors duration-300"
            aria-label="Download Resume"
          >
            Download Resume
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;