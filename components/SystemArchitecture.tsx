import React from 'react';
import Section from './Section';
import { User, Database, Cpu, Zap, Activity, ArrowRight, ArrowDown } from 'lucide-react';

const SystemArchitecture: React.FC = () => {
  const steps = [
    { 
        icon: User, 
        title: "Ingestion", 
        desc: "User Request" 
    },
    { 
        icon: Database, 
        title: "Processing", 
        desc: "Feature Store" 
    },
    { 
        icon: Cpu, 
        title: "Inference", 
        desc: "Model Service" 
    },
    { 
        icon: Zap, 
        title: "Latency", 
        desc: "< 50ms Response" 
    },
    { 
        icon: Activity, 
        title: "Monitoring", 
        desc: "Drift Checks" 
    }
  ];

  return (
    <Section id="architecture" className="pt-0 pb-20">
      <div className="relative p-8 rounded-3xl border border-gray-800 bg-surface/20 backdrop-blur-sm">
        <div className="text-center mb-10">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">System Architecture</h3>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              {/* Node Card */}
              <div className="relative group w-full md:w-auto flex-1">
                <div className="bg-surface border border-gray-800 p-5 rounded-xl flex flex-col items-center text-center hover:border-accent transition-colors duration-300 z-10 relative shadow-lg shadow-black/40">
                  <div className="mb-3 p-3 bg-background rounded-full text-accent shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <step.icon size={20} />
                  </div>
                  <h4 className="text-white font-bold text-sm mb-1">{step.title}</h4>
                  <p className="text-xs text-gray-500 font-mono">{step.desc}</p>
                </div>
              </div>

              {/* Connector Arrow */}
              {i < steps.length - 1 && (
                <div className="flex items-center justify-center text-gray-700 shrink-0 py-2 md:py-0">
                  <ArrowRight className="hidden md:block animate-flow-x" size={20} />
                  <ArrowDown className="md:hidden animate-flow-y" size={20} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Explanation Footer */}
        <div className="mt-10 text-center border-t border-gray-800 pt-6">
            <p className="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed">
                <span className="text-accent font-semibold">How it works:</span> Raw inputs are enriched with real-time features from a low-latency store (Redis). 
                The model computes predictions which are served via an optimized API, while inputs and outputs are asynchronously logged to a data lake for drift monitoring and retraining.
            </p>
        </div>
      </div>
    </Section>
  );
};

export default SystemArchitecture;