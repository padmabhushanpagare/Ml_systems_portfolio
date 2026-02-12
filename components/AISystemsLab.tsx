import React, { useState, useEffect } from 'react';
import Section from './Section';
import { FlaskConical, Zap, Activity, Cpu, BarChart4, ArrowRight } from 'lucide-react';

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
    </Section>
  );
};

export default AISystemsLab;