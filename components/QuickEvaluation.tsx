import React from 'react';
import Section from './Section';

const QuickEvaluation: React.FC = () => {
  return (
    <Section id="snapshot" className="py-8">
      <div className="max-w-5xl mx-auto bg-surface border border-gray-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
        <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Left Column: High Level Overview */}
            <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-gray-800">
                <h3 className="text-accent font-bold mb-8 uppercase tracking-widest text-xs flex items-center gap-2">
                   <span className="w-8 h-[1px] bg-accent"></span> 
                   Evaluation Snapshot
                </h3>
                
                <div className="space-y-8">
                    <div>
                        <div className="text-gray-500 text-[10px] uppercase mb-1.5 font-mono tracking-wider">Years of Experience</div>
                        <div className="text-white font-bold text-3xl">5+ Years</div>
                        <p className="text-gray-400 text-sm mt-1.5 leading-relaxed">Delivering end-to-end Machine Learning systems in FinTech & Logistics.</p>
                    </div>
                    
                    <div>
                        <div className="text-gray-500 text-[10px] uppercase mb-1.5 font-mono tracking-wider">Primary Expertise</div>
                        <div className="text-white font-bold text-xl">ML Engineering & MLOps</div>
                        <p className="text-gray-400 text-sm mt-1.5 leading-relaxed">Bridging the gap between Jupyter notebooks and production Kubernetes clusters.</p>
                    </div>

                    <div>
                        <div className="text-gray-500 text-[10px] uppercase mb-1.5 font-mono tracking-wider">Current Status</div>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-semibold text-sm">
                             <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                             </span>
                             Open to Opportunities
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Technical Grid */}
            <div className="p-8 md:p-10 bg-surface/50 backdrop-blur-sm">
                 <h3 className="text-gray-400 font-bold mb-8 uppercase tracking-widest text-xs">
                   Technical Competency
                </h3>
                 
                 <div className="grid gap-6">
                    
                    <div className="flex flex-col border-b border-gray-700/50 pb-4">
                        <span className="text-white font-semibold text-base mb-1">Languages & Core</span>
                        <span className="text-gray-400 text-sm font-mono">Python (Expert), SQL, TypeScript</span>
                    </div>

                    <div className="flex flex-col border-b border-gray-700/50 pb-4">
                        <span className="text-white font-semibold text-base mb-1">Frameworks</span>
                        <span className="text-gray-400 text-sm font-mono">PyTorch, XGBoost, Scikit-learn, FastAPI</span>
                    </div>

                    <div className="flex flex-col border-b border-gray-700/50 pb-4">
                        <span className="text-white font-semibold text-base mb-1">Deployment & Infra</span>
                        <span className="text-gray-400 text-sm font-mono">Docker, Kubernetes, AWS SageMaker, Terraform</span>
                    </div>

                    <div className="pt-2">
                         <span className="text-gray-500 text-[10px] uppercase font-mono tracking-wider mb-2 block">Target Roles</span>
                         <div className="flex flex-wrap gap-2">
                             <span className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs text-gray-300">Sr. Data Scientist</span>
                             <span className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs text-gray-300">ML Engineer</span>
                             <span className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs text-gray-300">AI Engineer</span>
                         </div>
                    </div>

                 </div>
            </div>

        </div>
      </div>
    </Section>
  );
};

export default QuickEvaluation;