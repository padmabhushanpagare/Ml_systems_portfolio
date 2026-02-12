import React from 'react';
import Section from './Section';
import { Network, Zap, Eye, TrendingUp } from 'lucide-react';

const WhyHireMe: React.FC = () => {
  const cards = [
    {
      icon: Network,
      title: "Systems Thinking",
      description: "I build resilient data pipelines, not just notebooks. I ensure reproducibility, data lineage, and seamless integration with existing engineering infrastructure."
    },
    {
      icon: Zap,
      title: "Model Optimization",
      description: "I engineer for low-latency inference. Using quantization and efficient serving (ONNX), I deploy models that scale without inflating cloud costs."
    },
    {
      icon: Eye,
      title: "Interpretability & Monitoring",
      description: "I prioritize observability. I implement drift detection and explainability (SHAP) to catch degradation early and maintain stakeholder trust."
    },
    {
      icon: TrendingUp,
      title: "Business Impact Orientation",
      description: "I solve business problems, not just math problems. I align model metrics with KPIs like revenue and churn to deliver measurable ROI."
    }
  ];

  return (
    <Section id="why-hire-me" className="py-12">
        <div className="mb-12 md:text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why Hire Me for Data & ML Roles</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, idx) => (
                <div key={idx} className="group bg-surface p-6 rounded-xl border border-gray-800 hover:border-accent hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-[0_4px_20px_rgba(16,185,129,0.1)]">
                    <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center mb-4 text-accent border border-gray-800 group-hover:border-accent/50 transition-colors">
                        <card.icon size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-accent transition-colors">{card.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed font-medium">
                        {card.description}
                    </p>
                </div>
            ))}
        </div>
    </Section>
  );
};

export default WhyHireMe;