import React from 'react';
import Hero from './components/Hero';
import Approach from './components/Approach';
import Projects from './components/Projects';
import Demo from './components/Demo';
import SystemArchitecture from './components/SystemArchitecture';
import Stack from './components/Stack';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-background min-h-screen text-slate-300 font-sans selection:bg-accent selection:text-white overflow-x-hidden">
      
      {/* Navigation (Simple Sticky) */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
          <div className="text-white font-bold text-xl tracking-tight">
            AC<span className="text-accent">.</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            <a href="#approach" className="hover:text-white transition-colors">Approach</a>
            <a href="#projects" className="hover:text-white transition-colors">Work</a>
            <a href="#demo" className="hover:text-white transition-colors">Demo</a>
            <a href="#blog" className="hover:text-white transition-colors">Writing</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
          <a href="#contact" className="md:hidden text-sm font-medium text-accent">Menu</a>
        </div>
      </nav>

      <main>
        <Hero />
        <Approach />
        <Projects />
        <Demo />
        <SystemArchitecture />
        <Stack />
        <Blog />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;