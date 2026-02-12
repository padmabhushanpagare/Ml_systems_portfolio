import React from 'react';
import Section from './Section';
import { Database, Brain, Rocket, LineChart } from 'lucide-react';

const Approach: React.FC = () => {
  const steps = [
    {
      icon: Database,
      title: "Data Strategy",
      description: "Robust pipelines, feature stores, and data quality assurance ensuring reproducibility."
    },
    {
      icon: Brain,
      title: "Modeling",
      description: "Selecting appropriate baselines, iterative experimentation, and rigorous offline evaluation."
    },
    {
      icon: Rocket,
      title: "Productionization",
      description: "Scalable API deployment, containerization (Docker/K8s), and CI/CD for ML."
    },
    {
      icon: LineChart,
      title: "Monitoring",
      description: "Tracking drift, latency, and business metrics to ensure sustained value delivery."
    }
  ];

  return (
    <Section id="approach" className="bg-surface/30 -mx-6 md:-mx-12 px-6 md:px-12 rounded-3xl my-12">
      <div className="mb-12">
        <h3 className="text-accent font-medium mb-2 uppercase tracking-wider">Methodology</h3>
        <h2 className="text-3xl md:text-4xl font-bold text-white">Systems Approach to ML</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <div key={index} className="bg-background/50 p-6 rounded-xl border border-gray-800 hover:border-accent/50 transition-colors duration-300">
            <div className="w-12 h-12 bg-surface rounded-lg flex items-center justify-center mb-6 text-accent">
              <step.icon size={24} />
            </div>
            <h4 className="text-xl font-semibold text-white mb-3">{step.title}</h4>
            <p className="text-gray-400 leading-relaxed text-sm">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Approach;