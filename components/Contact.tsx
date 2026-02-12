import React from 'react';
import Section from './Section';
import { Mail, Github, Linkedin, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <Section id="contact" className="mb-12">
      <div className="bg-surface rounded-3xl p-8 md:p-16 border border-gray-800 text-center">
        <h3 className="text-accent font-medium mb-4 uppercase tracking-wider">Get in Touch</h3>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Ready to build scalable AI?</h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
          I am currently open to new opportunities. Whether you have a question about my work or want to discuss a potential collaboration, my inbox is open.
        </p>

        <a 
          href="mailto:hello@alexchen.dev"
          className="inline-flex items-center gap-2 bg-white text-black font-bold px-8 py-4 rounded-full hover:bg-accent hover:text-white transition-all duration-300 mb-16"
        >
          <Mail size={20} />
          Say Hello
        </a>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-400 border-t border-gray-800 pt-12">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-white mb-2">
              <MapPin size={18} />
            </div>
            <span>San Francisco, CA</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-white mb-2">
              <Github size={18} />
            </div>
            <a href="#" className="hover:text-accent transition-colors">github.com/alexchen</a>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-white mb-2">
              <Linkedin size={18} />
            </div>
            <a href="#" className="hover:text-accent transition-colors">linkedin.com/in/alexchen</a>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Contact;