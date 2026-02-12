import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import WhyHireMe from './components/WhyHireMe';
import QuickEvaluation from './components/QuickEvaluation';
import Approach from './components/Approach';
import Projects from './components/Projects';
import Demo from './components/Demo';
import AISystemsLab from './components/AISystemsLab';
import SystemArchitecture from './components/SystemArchitecture';
import InterviewQA from './components/InterviewQA';
import Stack from './components/Stack';
import Blog from './components/Blog';
import ProfessionalHighlights from './components/ProfessionalHighlights';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatAssistant from './components/ChatAssistant';
import ViewMode from './components/ViewMode';
import { Mail } from 'lucide-react';
import { trackEvent } from './utils/analytics';

const App: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let hasTracked75 = false;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      
      // Show floating elements after scrolling past Hero (approx 500px)
      setIsScrolled(scrollY > 500);

      // Track 75% Scroll Depth
      const scrollPercent = (scrollY + windowHeight) / docHeight;
      if (!hasTracked75 && scrollPercent >= 0.75) {
        trackEvent('scroll_depth', { 
            event_category: 'engagement', 
            event_label: '75_percent' 
        });
        hasTracked75 = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-background min-h-screen text-slate-300 font-sans selection:bg-accent selection:text-white overflow-x-hidden">
      
      {/* Navigation (Sticky & Recruiter Optimized) */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/90 border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <a href="#" className="text-white font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
              AC<span className="text-accent">.</span>
            </a>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400 items-center">
              <a href="#projects" className="hover:text-white hover:text-accent transition-colors">Projects</a>
              <a href="#projects" className="hover:text-white hover:text-accent transition-colors">Case Studies</a>
              <a href="#contact" className="hover:text-white hover:text-accent transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             {/* View Mode Toggle System */}
             <ViewMode />
             
             {/* Mobile Menu Trigger (Simple) */}
             <a href="#contact" className="md:hidden text-sm font-bold text-accent">
               Hire Me
             </a>
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <WhyHireMe />
        <QuickEvaluation />
        <Approach />
        <Projects />
        <Demo />
        <SystemArchitecture />
        <AISystemsLab />
        <InterviewQA />
        <Stack />
        <Blog />
        <ProfessionalHighlights />
        <Contact />
      </main>

      <Footer />
      <ChatAssistant />

      {/* Floating Contact Pill (Visible on Scroll) */}
      <a 
        href="#contact"
        onClick={() => trackEvent('contact_click', { event_category: 'engagement', event_label: 'floating_pill' })}
        className={`fixed bottom-8 left-6 md:left-12 z-40 flex items-center gap-3 bg-surface/80 backdrop-blur-md border border-gray-700/50 pr-5 pl-4 py-2.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all duration-500 hover:border-accent hover:bg-surface group ${
          isScrolled ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
        }`}
        aria-label="Quick Contact"
      >
        <div className="relative">
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-accent rounded-full animate-pulse"></span>
          <Mail size={18} className="text-gray-300 group-hover:text-accent transition-colors" />
        </div>
        <span className="text-sm font-medium text-gray-200 group-hover:text-white">Contact Me</span>
      </a>

    </div>
  );
};

export default App;