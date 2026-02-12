import React from 'react';
import Section from './Section';
import { GitCommit, Share2, Beaker, Layers } from 'lucide-react';

const ProfessionalHighlights: React.FC = () => {
  const highlights = [
    {
      icon: GitCommit,
      label: "Contribution",
      title: "Code & Consistency",
      desc: "500+ contributions in the past year. Committed to clean, modular, and test-driven codebases in both private and open-source environments."
    },
    {
      icon: Share2,
      label: "Complexity",
      title: "Distributed Systems",
      desc: "Experience architecting fault-tolerant ML pipelines capable of processing terabytes of data with strict latency SLAs."
    },
    {
      icon: Beaker,
      label: "Research",
      title: "Rigorous Experimentation",
      desc: "Going beyond model.fit(): Proficient in custom loss functions, ablation studies, and systematic hyperparameter optimization."
    },
    {
      icon: Layers,
      label: "Scope",
      title: "End-to-End Ownership",
      desc: "Full-stack ML competency. From raw SQL data extraction to model training, containerization (Docker), and Kubernetes deployment."
    }
  ];

  return (
    <Section id="highlights" className="py-12 border-t border-gray-900/50">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {highlights.map((item, idx) => (
          <div key={idx} className="group bg-surface/30 p-6 rounded-xl border border-gray-800 hover:bg-surface hover:border-gray-700 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-background rounded-lg text-gray-400 group-hover:text-accent transition-colors">
                    <item.icon size={20} />
                </div>
                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest group-hover:text-gray-500 transition-colors">{item.label}</span>
            </div>
            <h4 className="text-white font-bold text-base mb-2">{item.title}</h4>
            <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
                {item.desc}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default ProfessionalHighlights;