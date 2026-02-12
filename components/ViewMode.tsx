import React, { useState, useEffect } from 'react';
import { Eye, ChevronDown, Check, Info, X } from 'lucide-react';

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
    priorityId: 'hero',
    bannerText: 'This view prioritizes hiring signals and resume access.'
  },
  manager: {
    label: 'Hiring Manager',
    description: 'Case studies & methodology',
    focus: ['projects', 'approach', 'blog', 'highlights'],
    dim: ['stack', 'interview', 'demo', 'contact'],
    priorityId: 'projects',
    bannerText: 'This view highlights project impact and engineering methodology.'
  },
  interviewer: {
    label: 'Tech Interviewer',
    description: 'Code, system design & competency',
    focus: ['architecture', 'interview', 'stack', 'demo'],
    dim: ['why-hire-me', 'highlights', 'hero', 'snapshot', 'blog'],
    priorityId: 'interview',
    bannerText: 'This view highlights modeling depth and system design reasoning.'
  },
  founder: {
    label: 'Founder / VC',
    description: 'ROI, speed & product demos',
    focus: ['why-hire-me', 'demo', 'projects', 'contact', 'architecture', 'chat-assistant'],
    dim: ['interview', 'stack', 'blog'],
    priorityId: 'why-hire-me',
    bannerText: 'This view emphasizes product thinking and scalability.'
  }
};

const ViewMode: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  
  // Initialize from localStorage or default
  const [activeMode, setActiveMode] = useState<Persona>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('portfolio_view_mode') as Persona) || 'default';
    }
    return 'default';
  });

  // Handle Mode Changes
  useEffect(() => {
    // 1. Persist
    localStorage.setItem('portfolio_view_mode', activeMode);

    // 2. Dispatch Global Event for other components (e.g. InterviewQA expansion)
    window.dispatchEvent(new CustomEvent('viewModeChange', { detail: activeMode }));

    const config = CONFIG[activeMode];
    
    // 3. Reset all sections first
    document.querySelectorAll('section, #resume-btn, #chat-assistant').forEach(el => {
      el.classList.remove('view-mode-dimmed', 'view-mode-highlight', 'view-mode-target-highlight');
      (el as HTMLElement).style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    if (activeMode === 'default') {
        setIsBannerVisible(false);
        return;
    }

    // Show banner on new mode activation
    setIsBannerVisible(true);

    // 4. Apply Dimming
    config.dim.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add('view-mode-dimmed');
    });

    // 5. Apply Highlighting
    config.focus.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.add('view-mode-highlight');
    });

    // 6. Special Element Highlighting (Buttons/Widgets)
    if (activeMode === 'recruiter') {
        const btn = document.getElementById('resume-btn');
        if (btn) btn.classList.add('view-mode-target-highlight');
    }
    if (activeMode === 'founder') {
        const chat = document.getElementById('chat-assistant');
        if (chat) chat.classList.add('view-mode-target-highlight');
    }

    // 7. Scroll to Priority
    const priorityEl = document.getElementById(config.priorityId);
    if (priorityEl) {
      setTimeout(() => {
        priorityEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }

  }, [activeMode]);

  return (
    <>
      <style>
        {`
          .view-mode-dimmed {
            opacity: 0.15;
            filter: grayscale(100%) blur(1px);
            transform: scale(0.98);
            pointer-events: none;
          }
          .view-mode-highlight {
            opacity: 1;
            filter: none;
            transform: scale(1);
            position: relative;
            z-index: 10;
          }
          /* Left border indicator for sections */
          section.view-mode-highlight::before {
            content: '';
            position: absolute;
            left: -1.5rem;
            top: 2rem;
            bottom: 2rem;
            width: 3px;
            background: #10b981;
            opacity: 0.6;
            border-radius: 2px;
            transition: opacity 0.3s;
          }
          @media (max-width: 768px) {
            section.view-mode-highlight::before { left: -0.5rem; }
          }
          
          /* Pulsing highlight for buttons/widgets */
          .view-mode-target-highlight {
            position: relative;
            z-index: 20 !important;
            animation: target-pulse 2s infinite;
            box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.5);
          }
          @keyframes target-pulse {
             0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
             70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
             100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
          }
        `}
      </style>

      {/* Dynamic Contextual Banner */}
      {activeMode !== 'default' && isBannerVisible && (
        <div className="fixed top-20 md:top-24 left-0 right-0 z-40 flex justify-center pointer-events-none animate-slide-up">
          <div className="bg-surface/95 backdrop-blur-md border border-accent/40 text-white text-xs md:text-sm py-2 pl-5 pr-2 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center gap-4 pointer-events-auto transition-all">
            <div className="flex items-center gap-2">
                <Info size={16} className="text-accent shrink-0" />
                <span className="font-medium tracking-wide">{CONFIG[activeMode].bannerText}</span>
            </div>
            
            <div className="h-4 w-[1px] bg-gray-700"></div>

            <button 
              onClick={() => setIsBannerVisible(false)} 
              className="p-1 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
              aria-label="Dismiss Banner"
            >
              <X size={14} />
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
              ? 'bg-accent/10 border-accent text-accent shadow-[0_0_10px_rgba(16,185,129,0.2)]' 
              : 'bg-surface border-gray-700 text-gray-400 hover:text-white hover:border-gray-500'
          }`}
        >
          <Eye size={16} />
          <span className="hidden sm:inline">View: {CONFIG[activeMode].label}</span>
          <span className="sm:hidden">{activeMode === 'default' ? 'View' : CONFIG[activeMode].label}</span>
          <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <>
            {/* Backdrop to close */}
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-2 w-72 bg-surface border border-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden ring-1 ring-black/5 animate-slide-up">
              <div className="py-1">
                <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-800">Select Persona</div>
                {(Object.keys(CONFIG) as Persona[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      setActiveMode(mode);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-white/5 transition-colors group relative ${
                      activeMode === mode ? 'bg-accent/5' : ''
                    }`}
                  >
                    {activeMode === mode && <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent"></div>}
                    <div className={`mt-0.5 shrink-0 rounded-full w-4 h-4 border flex items-center justify-center transition-colors ${
                      activeMode === mode ? 'border-accent bg-accent text-black' : 'border-gray-600 group-hover:border-gray-400'
                    }`}>
                      {activeMode === mode && <Check size={10} strokeWidth={4} />}
                    </div>
                    <div>
                      <div className={`text-sm font-bold ${
                        activeMode === mode ? 'text-accent' : 'text-gray-200 group-hover:text-white'
                      }`}>
                        {CONFIG[mode].label}
                      </div>
                      <div className="text-xs text-gray-500 mt-1 leading-tight">
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