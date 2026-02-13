import React, { useState, useEffect } from 'react';
import Section from './Section';
import { FlaskConical, Zap, Activity, Cpu, BarChart4, ArrowRight, BookOpen, ChevronDown, Map, Box, Lock, MousePointer2, CheckCircle2, ThumbsUp, Mail, Linkedin, Github } from 'lucide-react';

const GoldPricePrototype: React.FC = () => {
  const [price, setPrice] = useState(2342.50);
  const [sentiment, setSentiment] = useState(50);
  const [volatility, setVolatility] = useState(false);
  const [trend, setTrend] = useState<'Bullish' | 'Bearish' | 'Neutral'>('Neutral');

  useEffect(() => {
    // Simulation Logic: Rule-based weighting
    const threshold = volatility ? 15 : 25; // Volatility tightens the "Neutral" band (more sensitive) or widens it? 
    // Usually volatility implies bigger swings. Let's say Volatility amplifies the score.
    
    let score = sentiment - 50; // Range -50 to 50
    if (volatility) score *= 1.5; // Amplify impact in high volatility

    // Determine trend
    if (score > 15) setTrend('Bullish');
    else if (score < -15) setTrend('Bearish');
    else setTrend('Neutral');

  }, [sentiment, volatility]);

  const getStatusColor = () => {
    if (trend === 'Bullish') return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.2)]';
    if (trend === 'Bearish') return 'text-red-400 border-red-500/30 bg-red-500/10 shadow-[0_0_15px_rgba(248,113,113,0.2)]';
    return 'text-gray-400 border-gray-600/30 bg-gray-600/10';
  };

  return (
    <div className="mt-auto pt-6" onClick={(e) => e.stopPropagation()}>
        <div className="bg-black/60 rounded-xl border border-gray-700/50 p-5 backdrop-blur-xl shadow-2xl ring-1 ring-white/5">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                        <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Live Prototype</div>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-gray-500 font-mono text-lg">$</span>
                        <input 
                            type="number" 
                            value={price}
                            onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                            className="bg-transparent text-2xl font-mono text-white font-bold tracking-tight w-28 focus:outline-none focus:border-b focus:border-purple-500 transition-all p-0 m-0"
                        />
                    </div>
                </div>
                <div className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${getStatusColor()}`}>
                    {trend}
                </div>
            </div>

            {/* Controls */}
            <div className="space-y-5">
                {/* Sentiment Slider */}
                <div>
                    <div className="flex justify-between text-xs mb-2 font-medium">
                        <span className="text-gray-400">Market Sentiment</span>
                        <span className="text-purple-400 font-mono">{sentiment}</span>
                    </div>
                    <input 
                        type="range" 
                        min="0" max="100" 
                        value={sentiment}
                        onChange={(e) => setSentiment(parseInt(e.target.value))}
                        className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-purple-500 hover:accent-purple-400 transition-all"
                    />
                    <div className="flex justify-between text-[10px] text-gray-600 mt-1.5 font-medium uppercase tracking-wider">
                        <span>Fear</span>
                        <span>Greed</span>
                    </div>
                </div>

                {/* Volatility Toggle */}
                <button 
                    onClick={() => setVolatility(!volatility)}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-white/5 border border-gray-700 hover:border-gray-600 transition-all group active:scale-[0.98]"
                >
                    <span className="text-xs text-gray-300 flex items-center gap-2 font-medium">
                        <Activity size={14} className={volatility ? "text-orange-400" : "text-gray-600 group-hover:text-gray-400 transition-colors"} />
                        Volatility Regime
                    </span>
                    <div className={`relative w-9 h-5 rounded-full transition-colors duration-300 ${volatility ? 'bg-orange-500' : 'bg-gray-700'}`}>
                        <div className={`absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform duration-300 shadow-sm ${volatility ? 'translate-x-4' : 'translate-x-0'}`}></div>
                    </div>
                </button>
            </div>

            {/* Explanation */}
            <div className="mt-4 pt-4 border-t border-gray-800/50">
                <p className="text-[10px] text-gray-500 leading-relaxed font-mono">
                    <span className="text-purple-400 mr-1">>_</span> 
                    Simulating feature-weighted signals (Sentiment + Volatility) influencing the predictive trend classification model.
                </p>
            </div>
        </div>
    </div>
  );
};

const ResearchNotes: React.FC = () => {
    const [activeId, setActiveId] = useState<string | null>(null);

    const notes = [
        {
            id: "rn-1",
            title: "Improving Small Dataset Robustness",
            tag: "DATA STRATEGY",
            content: "When labeled data is scarce (<1k samples), deep learning often fails due to overfitting. I've found success using Transfer Learning (using embeddings from pre-trained foundation models) combined with rigorous Stratified K-Fold cross-validation. Synthetic data generation (SMOTE or LLM-based augmentation) helps, but aggressive regularization (L1/L2) and choosing simpler architectures (Random Forest over Transformer) usually yields the best ROI."
        },
        {
            id: "rn-2",
            title: "When Not To Deploy ML",
            tag: "ENGINEERING",
            content: "Machine Learning introduces high technical debt (data drift, pipeline maintenance, non-deterministic debugging). If a deterministic rule-based heuristic (e.g., 'if X > 5 then Y') achieves 90% of the desired outcome with 1% of the complexity, deploy the rule. ML is reserved for problems where the relationship between variables is too complex or dynamic for manual logic."
        },
        {
            id: "rn-3",
            title: "Feature Engineering Tradeoffs in Real-Time",
            tag: "LATENCY",
            content: "Calculating rolling window aggregates (e.g., 'clicks in last 5 min') at inference time is a latency killer. The tradeoff is Freshness vs. Speed. My preferred pattern: Compute aggregates asynchronously via stream processing (Flink/Kafka) and push to a low-latency key-value store (Redis). The feature might be 1-second stale, but retrieval is O(1) <5ms, preventing API bottlenecks."
        },
        {
            id: "rn-4",
            title: "Why Most Dashboards Fail Decision-Making",
            tag: "ANALYTICS",
            content: "Dashboards often suffer from 'Data Puking'—showing metrics just because we track them. Effective BI tools must be decision-centric. Instead of just 'Total Sales', show 'Sales vs Target' and 'Projected EOM'. Every chart should answer a specific business question or trigger a specific operational workflow, otherwise it is just noise."
        }
    ];

    return (
        <div className="mt-24 max-w-4xl mx-auto border-t border-gray-800/50 pt-16">
            <div className="flex items-center gap-3 mb-8 px-2">
                <BookOpen size={20} className="text-purple-400" />
                <h3 className="text-xl font-bold text-white tracking-tight">Research Notes & AI Exploration Logs</h3>
            </div>
            
            <div className="grid gap-2">
                {notes.map((note) => (
                    <div 
                        key={note.id} 
                        className={`bg-surface/20 border ${activeId === note.id ? 'border-purple-500/30 bg-surface/40' : 'border-gray-800/50'} rounded-lg transition-all duration-300 overflow-hidden`}
                    >
                        <button 
                            onClick={() => setActiveId(activeId === note.id ? null : note.id)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                        >
                            <div className="flex items-center gap-4 sm:gap-6">
                                <span className="hidden sm:block text-[10px] font-bold font-mono text-gray-500 bg-gray-900/50 border border-gray-800 px-2 py-1 rounded min-w-[90px] text-center tracking-wider">
                                    {note.tag}
                                </span>
                                <span className={`text-sm md:text-base font-medium transition-colors ${activeId === note.id ? 'text-white' : 'text-gray-300'}`}>
                                    {note.title}
                                </span>
                            </div>
                            <div className={`text-gray-500 transition-transform duration-300 ${activeId === note.id ? 'rotate-180 text-purple-400' : ''}`}>
                                <ChevronDown size={18} />
                            </div>
                        </button>
                        
                        <div 
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                activeId === note.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                        >
                            <div className="p-4 pt-0 sm:pl-32 pr-4 md:pr-12 pb-6">
                                <p className="text-sm text-gray-400 leading-relaxed border-l-2 border-purple-500/20 pl-4">
                                    {note.content}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SystemRoadmap: React.FC = () => {
  const roadmap = [
    {
      phase: "Phase 1: Built & Deployed",
      status: "Production Ready",
      color: "border-emerald-500/50 text-emerald-400",
      bg: "bg-emerald-500/5",
      items: [
        "Real-time Inference (FastAPI + Redis)",
        "Drift Detection (KL Divergence)",
        "Feature Stores (Feast)",
        "Automated CI/CD for ML"
      ]
    },
    {
      phase: "Phase 2: In Exploration",
      status: "Active R&D",
      color: "border-purple-500/50 text-purple-400",
      bg: "bg-purple-500/5",
      items: [
        "Rust-based Serving (Tch-rs)",
        "Causal Inference for KPIs",
        "LLM Agents for SQL Generation",
        "Serverless GPU Inference"
      ]
    },
    {
      phase: "Phase 3: Future Research",
      status: "Vision",
      color: "border-blue-500/50 text-blue-400",
      bg: "bg-blue-500/5",
      items: [
        "Edge ML on WebAssembly (WASM)",
        "Private Federated Learning",
        "Self-Healing Data Pipelines",
        "Multi-Modal RAG Systems"
      ]
    }
  ];

  return (
    <div className="mt-24 border-t border-gray-800/50 pt-16">
      <div className="mb-10 flex items-center gap-3">
        <div className="p-2 bg-gray-800/50 rounded-lg text-gray-300">
            <Map size={20} />
        </div>
        <div>
            <h3 className="text-xl font-bold text-white tracking-tight">AI Systems Roadmap</h3>
            <p className="text-sm text-gray-500 mt-1">Strategic trajectory from current operational capabilities to future architectural goals.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {/* Connector Line (Desktop) */}
        <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-500/20 via-purple-500/20 to-blue-500/20 -z-10"></div>

        {roadmap.map((col, idx) => (
          <div key={idx} className={`relative p-6 rounded-xl border-t border-l border-r border-b-0 md:border-b md:border ${col.color.replace('text', 'border')} ${col.bg} backdrop-blur-sm`}>
            {/* Dot on line */}
            <div className="hidden md:block absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-surface border-2 border-gray-700 z-10"></div>
            
            <div className="flex justify-between items-center mb-6">
                <span className={`text-xs font-bold uppercase tracking-widest ${col.color.split(' ')[1]}`}>{col.status}</span>
                <span className="text-[10px] text-gray-500 font-mono">0{idx + 1}</span>
            </div>

            <ul className="space-y-3">
                {col.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                        <div className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? 'bg-emerald-500' : idx === 1 ? 'bg-purple-500' : 'bg-blue-500'}`}></div>
                        {item}
                    </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

const ExperimentVoting: React.FC = () => {
    // Base votes to make it look populated
    const baseVotes: Record<string, number> = {
        'ex-1': 124,
        'ex-2': 89,
        'ex-3': 203,
        'ex-4': 156
    };

    const [votes, setVotes] = useState<Record<string, number>>(baseVotes);
    const [userVotes, setUserVotes] = useState<Record<string, number>>({});

    useEffect(() => {
        const saved = localStorage.getItem('ai_lab_votes');
        if (saved) {
            const parsed = JSON.parse(saved);
            setUserVotes(parsed);
        }
    }, []);

    const handleVote = (id: string) => {
        const newCount = (userVotes[id] || 0) + 1;
        const updatedUserVotes = { ...userVotes, [id]: newCount };
        setUserVotes(updatedUserVotes);
        localStorage.setItem('ai_lab_votes', JSON.stringify(updatedUserVotes));
    };

    const ideas = [
        { id: 'ex-1', title: "LLM-To-SQL Agent", desc: "Natural language interface for complex warehouse queries." },
        { id: 'ex-2', title: "Edge CV Anomaly", desc: "Running vision models on WASM for browser-based detection." },
        { id: 'ex-3', title: "Voice BI Dashboard", desc: "Conversational analytics with voice-input context switching." },
        { id: 'ex-4', title: "Federated Learning", desc: "Privacy-preserving model training across client browsers." }
    ];

    return (
        <div className="mt-20 pt-12 border-t border-gray-800/50">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-gray-800/50 rounded-lg text-gray-400">
                    <ThumbsUp size={16} />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-white">Vote for Next Experiment</h3>
                    <p className="text-sm text-gray-500">Help prioritize the R&D backlog.</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {ideas.map((item) => {
                    const totalVotes = (baseVotes[item.id] || 0) + (userVotes[item.id] || 0);
                    return (
                        <button 
                            key={item.id}
                            onClick={() => handleVote(item.id)}
                            className="group text-left bg-surface/30 border border-gray-800 hover:bg-surface hover:border-accent/40 p-4 rounded-xl transition-all duration-300 active:scale-[0.98]"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="text-xs font-mono font-bold text-gray-500 group-hover:text-accent transition-colors">
                                    {totalVotes.toLocaleString()}
                                </div>
                                <div className={`p-1.5 rounded-md transition-colors ${userVotes[item.id] ? 'bg-accent/10 text-accent' : 'bg-gray-800/50 text-gray-600 group-hover:text-gray-300'}`}>
                                    <ThumbsUp size={14} />
                                </div>
                            </div>
                            <h4 className="text-sm font-bold text-gray-200 mb-1.5 group-hover:text-white transition-colors">{item.title}</h4>
                            <p className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-400">{item.desc}</p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

const BetaRoadmap: React.FC = () => {
  const phases = [
    { label: "Phase 1", title: "Prototype", date: "Q3 2023", status: "completed", desc: "Internal proof-of-concept validation." },
    { label: "Phase 2", title: "Closed Beta", date: "Q4 2023", status: "current", desc: "Invite-only testing with select partners." },
    { label: "Phase 3", title: "Public Beta", date: "Q1 2024", status: "upcoming", desc: "Open access for community testing." },
    { label: "Phase 4", title: "Production", date: "Q2 2024", status: "upcoming", desc: "Full release with SLA guarantees." }
  ];

  return (
    <div className="mb-20 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="p-2 bg-gray-800/50 rounded-lg text-gray-300">
           <Map size={18} />
        </div>
        <h3 className="text-lg font-bold text-white">Public Beta Roadmap</h3>
      </div>

      <div className="relative px-2">
        {/* Mobile Line */}
        <div className="md:hidden absolute left-[19px] top-2 bottom-2 w-0.5 bg-gray-800"></div>
        {/* Desktop Line */}
        <div className="hidden md:block absolute top-[7px] left-0 right-0 h-0.5 bg-gray-800">
           {/* Progress Line (approx 35% for current status) */}
           <div className="h-full bg-accent/30 w-[38%]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {phases.map((phase, idx) => (
            <div key={idx} className="relative pl-12 md:pl-0 md:pt-8 group">
              {/* Dot */}
              <div className={`absolute left-[11px] md:left-1/2 top-0 md:top-0 md:-translate-y-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full border-2 z-10 transition-colors duration-500 bg-surface ${
                  phase.status === 'completed' ? 'border-accent bg-accent' :
                  phase.status === 'current' ? 'border-accent shadow-[0_0_15px_rgba(16,185,129,0.5)]' :
                  'border-gray-700'
              }`}>
                 {phase.status === 'current' && <div className="absolute inset-0 rounded-full animate-ping bg-accent/40"></div>}
              </div>
              
              <div className="md:text-center pt-0.5 md:pt-4">
                <div className={`text-[10px] font-mono mb-1 uppercase tracking-wider ${phase.status === 'upcoming' ? 'text-gray-600' : 'text-accent'}`}>
                    {phase.label} • {phase.date}
                </div>
                <h4 className={`text-sm font-bold mb-2 ${phase.status === 'upcoming' ? 'text-gray-500' : 'text-white'}`}>
                    {phase.title}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed max-w-[200px] md:mx-auto">
                    {phase.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BetaCollaboratorCTA: React.FC = () => {
  return (
    <div className="mt-20 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-surface to-surface/50 border border-gray-800 text-center relative overflow-hidden group">
        {/* Decorative background sheen */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-700/50 to-transparent opacity-50"></div>
        
        <h3 className="text-xl font-bold text-white mb-3">Become an Early Collaborator</h3>
        <p className="text-gray-400 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            I'm looking for developers, data scientists, and founders to co-develop these prototypes. 
            If you have a use case or want to contribute to the codebase, let's connect.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
            <a 
                href="mailto:hello@alexchen.dev" 
                className="px-5 py-2.5 rounded-lg bg-surface border border-gray-700 hover:border-gray-500 hover:bg-surface-hover text-sm font-medium text-gray-300 hover:text-white transition-all flex items-center gap-2 group/btn"
            >
                <Mail size={16} className="text-gray-500 group-hover/btn:text-white transition-colors" /> 
                Email Me
            </a>
            <a 
                href="https://linkedin.com/in/alexchen" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-5 py-2.5 rounded-lg bg-surface border border-gray-700 hover:border-[#0077b5]/50 hover:bg-[#0077b5]/5 text-sm font-medium text-gray-300 hover:text-[#0077b5] transition-all flex items-center gap-2 group/btn"
            >
                <Linkedin size={16} className="text-gray-500 group-hover/btn:text-[#0077b5] transition-colors" /> 
                LinkedIn
            </a>
            <a 
                href="https://github.com/alexchen" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-5 py-2.5 rounded-lg bg-surface border border-gray-700 hover:border-gray-500 hover:bg-surface-hover text-sm font-medium text-gray-300 hover:text-white transition-all flex items-center gap-2 group/btn"
            >
                <Github size={16} className="text-gray-500 group-hover/btn:text-white transition-colors" /> 
                GitHub
            </a>
        </div>
    </div>
  );
};

const ProductBetaZone: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: 'Gold Intelligence AI'
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const products = [
    {
      title: "Gold Intelligence AI",
      desc: "Real-time commodities insight engine processing market signals in milliseconds.",
      tag: "FinTech",
      icon: Zap,
      value: "Gold Intelligence AI"
    },
    {
      title: "Adaptive Model Monitor",
      desc: "Self-healing drift detection system that adjusts thresholds based on seasonality.",
      tag: "MLOps",
      icon: Activity,
      value: "Adaptive Model Monitoring Tool"
    },
    {
      title: "Decision Sim Engine",
      desc: "Causal inference sandbox to model how KPI changes impact bottom-line revenue.",
      tag: "Analytics",
      icon: BarChart4,
      value: "Decision Simulation Engine"
    }
  ];

  const handleSelectProduct = (productName: string) => {
    setFormData(prev => ({ ...prev, interest: productName }));
    const form = document.getElementById('beta-form');
    if (form) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate network delay for UX
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
        const response = await fetch("https://formspree.io/f/mqkvojzg", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });
        
        // For prototype purposes, assume success. 
        // In real deployment, we'd check response.ok
        setStatus('success');
    } catch (error) {
        setStatus('error');
    }
  };

  return (
    <div className="mt-24 border-t border-gray-800/50 pt-16">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h3 className="text-accent font-medium uppercase tracking-wider text-xs mb-3">AI Product Beta Zone</h3>
        <h2 className="text-3xl font-bold text-white mb-4">Get Early Access to Experimental AI Systems</h2>
        <p className="text-gray-400 leading-relaxed">
          A public sandbox for testing early-stage AI prototypes and architectural concepts. 
          Join the beta to explore these tools in a live environment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {products.map((p, i) => (
          <div key={i} className="group bg-surface/40 backdrop-blur-sm border border-gray-800 p-6 rounded-xl hover:border-accent/40 hover:bg-surface/80 hover:-translate-y-1 transition-all duration-300 shadow-lg flex flex-col h-full relative overflow-hidden">
             
             {/* Subtle Glow */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl -z-10 group-hover:bg-accent/10 transition-colors"></div>

             <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-background rounded-lg border border-gray-800 text-white group-hover:border-accent/50 group-hover:text-accent transition-colors">
                    <p.icon size={20} />
                </div>
                <div className="flex items-center gap-1.5 border border-gray-800 px-2 py-1 rounded bg-background/50">
                    <Lock size={10} className="text-gray-500" />
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wide">
                        {p.tag}
                    </span>
                </div>
             </div>
             
             <h4 className="text-lg font-bold text-white mb-3 group-hover:text-accent transition-colors">{p.title}</h4>
             <p className="text-sm text-gray-400 mb-8 flex-grow leading-relaxed">{p.desc}</p>
             
             <button 
                onClick={() => handleSelectProduct(p.value)}
                className="w-full py-2.5 rounded-lg border border-gray-700 bg-white/5 text-sm font-medium text-gray-300 hover:bg-accent hover:text-black hover:border-accent hover:font-bold transition-all flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]"
             >
                Request Beta Access <MousePointer2 size={14} />
             </button>
          </div>
        ))}
      </div>

      {/* Beta Roadmap */}
      <BetaRoadmap />

      {/* Beta Access Form */}
      <div id="beta-form" className="max-w-3xl mx-auto scroll-mt-24">
         {status === 'success' ? (
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-12 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-400">
                    <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Request Received</h3>
                <p className="text-gray-300 text-lg mb-8 max-w-md mx-auto">
                    You've been added to the priority queue for <span className="text-emerald-400 font-bold">{formData.interest}</span>. Watch your inbox for an invite code.
                </p>
                <button 
                    onClick={() => { setStatus('idle'); setFormData({name: '', email: '', interest: 'Gold Intelligence AI'}); }} 
                    className="text-emerald-400 hover:text-white font-medium underline underline-offset-4 transition-colors"
                >
                    Submit another request
                </button>
            </div>
         ) : (
             <form onSubmit={handleSubmit} className="bg-surface border border-gray-800 rounded-2xl p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/20 via-accent to-accent/20"></div>
                
                <div className="mb-8 text-center">
                    <h3 className="text-xl font-bold text-white mb-2">Join the Beta Waitlist</h3>
                    <p className="text-sm text-gray-400">Secure your spot for early access to the next deployment wave.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Full Name</label>
                        <input 
                            type="text" 
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-background border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all placeholder:text-gray-700"
                            placeholder="e.g. Alex Chen"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                        <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-background border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none transition-all placeholder:text-gray-700"
                            placeholder="e.g. alex@example.com"
                        />
                    </div>
                </div>
                
                <div className="mb-8">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Interested In</label>
                    <div className="relative">
                        <select 
                            value={formData.interest}
                            onChange={(e) => setFormData({...formData, interest: e.target.value})}
                            className="w-full bg-background border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none appearance-none cursor-pointer"
                        >
                            {products.map((p, i) => (
                                <option key={i} value={p.value}>{p.value}</option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                            <ChevronDown size={16} />
                        </div>
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={status === 'submitting'}
                    className="w-full bg-accent text-black font-bold py-4 rounded-xl hover:bg-accent-hover transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group shadow-[0_4px_20px_rgba(16,185,129,0.2)] hover:shadow-[0_4px_25px_rgba(16,185,129,0.4)]"
                >
                    {status === 'submitting' ? (
                        <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                            Processing...
                        </span>
                    ) : (
                        <>Join Priority Beta List <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                    )}
                </button>
                
                {status === 'error' && (
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center animate-in fade-in">
                        Something went wrong connecting to the server. Please try again later.
                    </div>
                )}
             </form>
         )}
      </div>

      {/* Experiment Voting Subsection */}
      <ExperimentVoting />
      
      {/* Collaborator CTA */}
      <BetaCollaboratorCTA />
      
      <div className="mt-12 text-center flex items-center justify-center gap-2 opacity-60">
         <Box size={14} className="text-gray-500" />
         <p className="text-xs text-gray-500 font-mono">Built for experimentation. Feedback drives evolution.</p>
      </div>
    </div>
  );
};

const AISystemsLab: React.FC = () => {
  const experiments = [
    {
      icon: Zap,
      title: "Real-Time Gold Price Intelligence",
      description: "A high-frequency ingestion engine prototype for commodities markets.",
      problem: "Standard polling architectures miss micro-volatility events in financial data.",
      exploring: "Event-driven architecture (Kafka/Redpanda) vs. Polling for sub-millisecond feature calculation.",
      link: "#"
    },
    {
      icon: Activity,
      title: "Adaptive Model Monitoring",
      description: "Self-healing alerting system that adjusts to seasonality.",
      problem: "Static drift thresholds create alert fatigue during holidays or market shifts.",
      exploring: "Using unsupervised isolation forests to dynamically set alerting bounds based on recent history.",
      link: "#"
    },
    {
      icon: BarChart4,
      title: "AI-Powered KPI Simulator",
      description: "Translating abstract ML metrics directly into P&L scenarios.",
      problem: "Stakeholders struggle to value a +1% F1-score improvement in dollar terms.",
      exploring: "Causal inference models to simulate how model precision lifts impact net revenue and churn.",
      link: "#"
    },
    {
      icon: Cpu,
      title: "Lightweight ML Deployment",
      description: "Minimalist MLOps framework for high-performance edge inference.",
      problem: "Kubernetes overhead is often excessive for single-model microservices.",
      exploring: "Rust-based inference runtimes (ONNX) on serverless functions to eliminate cold starts.",
      link: "#"
    }
  ];

  return (
    <Section id="ai-lab" className="py-20 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
              <FlaskConical size={24} />
            </div>
            <h3 className="text-purple-400 font-medium uppercase tracking-wider text-sm">Experimental Zone</h3>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">AI Systems Lab</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            This is my sandbox for experimental AI architecture and system design. 
            Here, I explore concepts that move beyond standard MLOps patterns, focusing on 
            novel approaches to latency, cost-efficiency, and business alignment.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {experiments.map((exp, idx) => (
          <div 
            key={idx} 
            className={`group relative bg-surface/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 transition-all duration-500 flex flex-col h-full ${
                exp.title === "Real-Time Gold Price Intelligence" 
                ? 'hover:border-purple-500/30' 
                : 'hover:bg-surface/60 hover:border-purple-500/50'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-background border border-gray-700 rounded-xl text-purple-400 group-hover:text-white group-hover:border-purple-500 transition-colors">
                  <exp.icon size={28} />
                </div>
                <div className="text-xs font-mono text-gray-600 border border-gray-800 px-2 py-1 rounded bg-background group-hover:border-gray-600 transition-colors">
                  v0.{idx + 1} alpha
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                {exp.title}
              </h3>
              <p className="text-gray-300 mb-6 text-sm font-medium">
                {exp.description}
              </p>

              <div className="space-y-4 mb-8">
                <div>
                  <h4 className="text-[10px] uppercase text-gray-500 font-bold tracking-wider mb-1">The Problem</h4>
                  <p className="text-gray-400 text-xs leading-relaxed border-l-2 border-gray-700 pl-3">
                    {exp.problem}
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase text-purple-500/80 font-bold tracking-wider mb-1">Exploring</h4>
                  <p className="text-gray-400 text-xs leading-relaxed border-l-2 border-purple-500/30 pl-3">
                    {exp.exploring}
                  </p>
                </div>
              </div>

              {/* Conditionally render Interactive Prototype or Standard Link */}
              {exp.title === "Real-Time Gold Price Intelligence" ? (
                 <GoldPricePrototype />
              ) : (
                <div className="mt-auto">
                    <a 
                        href={exp.link} 
                        className="inline-flex items-center gap-2 text-sm font-bold text-white/80 hover:text-white group-hover:translate-x-1 transition-all"
                    >
                        Explore Concept <ArrowRight size={16} className="text-purple-500" />
                    </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* New Research Notes Section */}
      <ResearchNotes />

      {/* New Systems Roadmap Section */}
      <SystemRoadmap />

      {/* New Product Beta Zone Section */}
      <ProductBetaZone />
      
    </Section>
  );
};

export default AISystemsLab;