import React from 'react';
import Section from './Section';
import { Mail, Github, Linkedin, MapPin, Check } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

const Contact: React.FC = () => {
  const roles = [
    "Full-time roles",
    "ML Engineer",
    "Data Scientist",
    "AI Systems Development"
  ];

  return (
    <Section id="contact" className="mb-12">
      <div className="bg-surface rounded-3xl p-8 md:p-16 border border-gray-800 flex flex-col items-center text-center shadow-2xl shadow-black/20">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest mb-8">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Available for Hire
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Open to Data & AI Opportunities
        </h2>
        
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          I am actively seeking roles where I can design, build, and deploy production-grade ML systems.
        </p>

        {/* Roles List */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-2xl">
            {roles.map((role, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-background border border-gray-700 px-4 py-2 rounded-lg text-sm text-gray-300">
                    <Check size={16} className="text-accent" />
                    <span>{role}</span>
                </div>
            ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto">
            <a 
            href="mailto:hello@alexchen.dev"
            onClick={() => trackEvent('contact_click', { event_category: 'engagement', event_label: 'email' })}
            className="inline-flex items-center justify-center gap-2 bg-accent text-background font-bold px-8 py-4 rounded-xl hover:bg-accent-hover transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_20px_rgba(16,185,129,0.3)]"
            >
            <Mail size={20} />
            Email Me Directly
            </a>
            
            <a 
            href="https://linkedin.com/in/alexchen"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('contact_click', { event_category: 'engagement', event_label: 'linkedin' })}
            className="inline-flex items-center justify-center gap-2 bg-background text-white border border-gray-700 font-medium px-8 py-4 rounded-xl hover:border-accent hover:text-accent transition-all duration-300 hover:-translate-y-1"
            >
            <Linkedin size={20} />
            Connect on LinkedIn
            </a>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-500 border-t border-gray-800/50 pt-10 w-full max-w-4xl">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <MapPin size={16} className="text-gray-400" />
            <span>San Francisco Bay Area</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Github size={16} className="text-gray-400" />
            <a href="#" className="hover:text-white transition-colors">github.com/alexchen</a>
          </div>
          <div className="flex items-center justify-center md:justify-end gap-2">
             <span className="w-2 h-2 rounded-full bg-accent"></span>
             <span>Open to Relocation</span>
          </div>
        </div>

      </div>
    </Section>
  );
};

export default Contact;