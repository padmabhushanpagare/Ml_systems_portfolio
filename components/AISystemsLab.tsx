import React from 'react';
import Section from './Section';
import { FlaskConical, Zap, Activity, Cpu, BarChart4, ArrowRight } from 'lucide-react';

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
            className="group relative bg-surface/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:bg-surface/60 hover:border-purple-500/50 transition-all duration-500 flex flex-col h-full"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
            
            <div className="relative z-10">
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

              <div className="space-y-4 mb-8 flex-grow">
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

              <a 
                href={exp.link} 
                className="inline-flex items-center gap-2 text-sm font-bold text-white/80 hover:text-white group-hover:translate-x-1 transition-all"
              >
                Explore Concept <ArrowRight size={16} className="text-purple-500" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default AISystemsLab;