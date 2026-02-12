import React, { useState, useEffect } from 'react';
import { Eye, ChevronDown, Check, Info } from 'lucide-react';

type Persona = 'default' | 'recruiter' | 'manager' | 'interviewer' | 'founder';

interface PersonaConfig {
  label: string;
  description: string;
  focus: string[];      // IDs to highlight
  dim: string[];        // IDs to de-emphasize
  priorityId: string;   // ID to scroll to
  bannerText: string;
}

const CONFIG: Record<Persona, PersonaConfig> = {
  default: {
    label: 'Standard View',
    description: 'Full portfolio experience',
    focus: [],
    dim: [],
    priorityId: 'hero',
    bannerText: ''
  },
  recruiter: {
    label: 'Recruiter',
    description: 'Quick evaluation of skills & history',
    focus: ['snapshot', 'highlights', 'contact', 'hero'],
    dim: ['architecture', 'interview', 'demo', 'blog', 'stack'],
    priorityId: 'snapshot',
    bannerText: 'Optimized for Talent Acquisition: Focusing on experience snapshot, key highlights, and contact info.'
  },
  manager: {
    label: 'Hiring Manager',
    description: 'Case studies & methodology',
    focus: ['projects', 'approach', 'blog', 'highlights'],
    dim: ['stack', 'interview', 'demo'],
    priorityId: 'projects',
    bannerText: 'Optimized for Leadership: Highlighting project business impact, engineering methodology, and case studies.'
  },
  interviewer: {
    label: 'Tech Interviewer',
    description: 'Code, system design & competency',
    focus: ['architecture', 'interview', 'stack', 'demo'],
    dim: ['why-hire-me', 'highlights', 'hero'],
    priorityId: 'architecture',
    bannerText: 'Optimized for Technical Review: Focusing on system architecture, technical Q&A, and stack proficiency.'
  },
  founder: {
    label: 'Founder / VC',
    description: 'ROI, speed & product demos',
    focus: ['why-hire-me', 'demo', 'projects', 'contact'],
    dim: ['architecture', 'interview', 'stack', 'blog'],
    priorityId: 'why-hire-me',
    bannerText: 'Optimized for Business Value: Focusing on ROI, interactive demos, and "Why Hire Me" propositions.'
  }
};

const ViewMode: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMode, setActiveMode] = useState<Persona>('default');

  // Handle DOM manipulation for highlighting/dimming
  useEffect(() => {
    const config = CONFIG[activeMode];
    
    // Reset all sections first
    document.querySelectorAll('section').forEach(el => {
      el.classList.remove('view-mode-dimmed', 'view-mode-highlight');
      el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    if (activeMode === 'default') return;

    // Apply Dimming
    config.dim.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add('view-mode-dimmed');
    });

    // Apply Highlighting
    config.focus.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add('view-mode-highlight');
    });

    // Scroll to Priority
    const priorityEl = document.getElementById(config.priorityId);
    if (priorityEl) {
      // Small delay to ensure UI updates first
      setTimeout(() => {
        priorityEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }

  }, [activeMode]);

  return (
    <>
      <style>
        {`
          .view-mode-dimmed {
            opacity: 0.25;
            filter: grayscale(100%);
            transform: scale(0.98);
          }
          .view-mode-highlight {
            opacity: 1;
            filter: none;
            transform: scale(1);
            position: relative;
            z-index: 10;
          }
          /* Add a visual indicator for highlighted sections */
          .view-mode-highlight::before {
            content: '';
            position: absolute;
            left: -1rem;
            top: 0;
            bottom: 0;
            width: 2px;
            background: #10b981;
            opacity: 0.5;
          }
          @media (max-width: 768px) {
            .view-mode-highlight::before { left: 0; }
          }
        `}
      </style>

      {/* Contextual Banner */}
      {activeMode !== 'default' && (
        <div className="fixed top-20 md:top-24 left-0 right-0 z-40 flex justify-center pointer-events-none animate-slide-up">
          <div className="bg-surface/90 backdrop-blur-md border border-accent/30 text-white text-xs md:text-sm py-2 px-6 rounded-full shadow-2xl flex items-center gap-2 pointer-events-auto">
            <Info size={14} className="text-accent" />
            <span className="font-medium">{CONFIG[activeMode].bannerText}</span>
            <button 
              onClick={() => setActiveMode('default')} 
              className="ml-2 hover:text-accent transition-colors"
              aria-label="Clear View Mode"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {/* Toggle Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium transition-all duration-300 ${
            activeMode !== 'default' 
              ? 'bg-accent/10 border-accent text-accent' 
              : 'bg-surface border-gray-700 text-gray-400 hover:text-white hover:border-gray-500'
          }`}
        >
          <Eye size={16} />
          <span className="hidden sm:inline">View As: {CONFIG[activeMode].label}</span>
          <span className="sm:hidden">{activeMode === 'default' ? 'View' : CONFIG[activeMode].label}</span>
          <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <>
            {/* Backdrop to close */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-2 w-64 bg-surface border border-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden ring-1 ring-black/5">
              <div className="py-1">
                {(Object.keys(CONFIG) as Persona[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      setActiveMode(mode);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-white/5 transition-colors group ${
                      activeMode === mode ? 'bg-accent/5' : ''
                    }`}
                  >
                    <div className={`mt-0.5 rounded-full w-4 h-4 border flex items-center justify-center ${
                      activeMode === mode ? 'border-accent bg-accent text-black' : 'border-gray-600'
                    }`}>
                      {activeMode === mode && <Check size={10} strokeWidth={4} />}
                    </div>
                    <div>
                      <div className={`text-sm font-medium ${
                        activeMode === mode ? 'text-accent' : 'text-gray-200 group-hover:text-white'
                      }`}>
                        {CONFIG[mode].label}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {CONFIG[mode].description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ViewMode;