import React from 'react';
import Section from './Section';
import { Code2, Cpu, Database, Cloud } from 'lucide-react';
import { SkillCategory } from '../types';

const categories: SkillCategory[] = [
  {
    title: "Languages",
    icon: Code2,
    skills: ["Python", "SQL", "TypeScript", "C++", "Rust", "Bash"]
  },
  {
    title: "Machine Learning",
    icon: Cpu,
    skills: ["PyTorch", "TensorFlow", "Scikit-learn", "HuggingFace", "XGBoost", "OpenCV"]
  },
  {
    title: "Data Engineering",
    icon: Database,
    skills: ["Spark", "Kafka", "PostgreSQL", "dbt", "Airflow", "Snowflake"]
  },
  {
    title: "Deployment & MLOps",
    icon: Cloud,
    skills: ["Docker", "Kubernetes", "AWS SageMaker", "MLflow", "Terraform", "FastAPI"]
  }
];

const Stack: React.FC = () => {
  return (
    <Section id="stack">
      <div className="mb-12">
        <h3 className="text-accent font-medium mb-2 uppercase tracking-wider">Expertise</h3>
        <h2 className="text-3xl md:text-4xl font-bold text-white">Technical Stack</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category, idx) => (
          <div key={idx} className="bg-surface p-8 rounded-xl border border-gray-800 hover:border-accent/40 transition-colors">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-background rounded-lg text-accent">
                <category.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">{category.title}</h3>
            </div>
            
            <div className="flex flex-wrap gap-x-2 gap-y-3">
              {category.skills.map((skill, sIdx) => (
                <span key={sIdx} className="px-3 py-1.5 bg-background text-gray-300 rounded text-sm border border-gray-800">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Stack;