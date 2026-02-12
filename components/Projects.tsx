import React from 'react';
import Section from './Section';
import { TrendingUp, AlertCircle, Layers, ArrowRight } from 'lucide-react';
import { Project } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const projects: Project[] = [
  {
    id: 1,
    title: "Delivery Time Prediction Engine",
    problem: "Inaccurate ETAs leading to customer churn and high support ticket volume.",
    approach: "Built a real-time XGBoost regression pipeline with geospatial clustering and Redis feature store.",
    impact: "Reduced MAE by 45% (4.44 mins) and support tickets by 40%. Achieved <50ms P99 latency.",
    tags: ["Python", "XGBoost", "Redis", "FastAPI"],
    githubUrl: "#",
    caseStudyUrl: "case-studies/delivery-system.html",
    imageUrl: "https://picsum.photos/800/600?random=1"
  },
  {
    id: 2,
    title: "Market Crash Early Warning System",
    problem: "Capital loss during 'Black Swan' events due to asset correlation breakdown.",
    approach: "Developed an ensemble of LSTM Autoencoders and Isolation Forests to detect systemic anomalies.",
    impact: "Successfully signaled 2008/2020 crashes in backtests; reduced max drawdown by 35%.",
    tags: ["TensorFlow", "LSTM", "Scikit-Learn", "Airflow"],
    githubUrl: "#",
    caseStudyUrl: "case-studies/stock-crash.html",
    imageUrl: "https://picsum.photos/800/600?random=2"
  },
  {
    id: 3,
    title: "Enterprise Sales Intelligence",
    problem: "Fragmented data across CRM (Salesforce) and ERP (NetSuite) causing manual reporting overhead.",
    approach: "Architected a centralized data warehouse using Snowflake, dbt transformations, and Tableau.",
    impact: "Improved forecast accuracy by 15% and saved 20+ hours/week of manual spreadsheet work.",
    tags: ["Snowflake", "dbt", "Tableau", "SQL"],
    githubUrl: "#",
    caseStudyUrl: "case-studies/sales-dashboard.html",
    imageUrl: "https://picsum.photos/800/600?random=3"
  }
];

// Helper component for individual project cards to handle their own observation
const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const ref = useScrollAnimation(0.1);
  
  // Calculate staggered delay class
  const delayClass = index === 0 ? '' : index === 1 ? 'delay-200' : 'delay-400';

  return (
    <article 
      ref={ref}
      className={`reveal ${delayClass} group relative bg-surface rounded-2xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-all duration-300 shadow-lg shadow-black/20`}
    >
      <div className="flex flex-col lg:flex-row h-full">
        {/* Visual Side */}
        <div className="lg:w-5/12 relative overflow-hidden h-64 lg:h-auto border-b lg:border-b-0 lg:border-r border-gray-800 bg-surface">
          <div className="absolute inset-0 bg-accent/5 group-hover:bg-transparent transition-colors z-10 mix-blend-overlay" />
          <img 
            src={project.imageUrl} 
            alt={`Screenshot of ${project.title} interface`}
            loading="lazy"
            decoding="async"
            width="800"
            height="600"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out grayscale-[20%] group-hover:grayscale-0"
          />
        </div>

        {/* Content Side */}
        <div className="lg:w-7/12 p-8 lg:p-10 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-2xl font-bold text-white group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            
            <a 
              href={project.caseStudyUrl}
              className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-white transition-colors border border-accent/20 bg-accent/5 px-4 py-2 rounded-full hover:bg-accent/10 whitespace-nowrap"
            >
              View Case Study <ArrowRight size={16} />
            </a>
          </div>

          <div className="space-y-6 flex-grow">
            {/* Problem */}
            <div className="flex gap-4 items-start">
              <div className="mt-1 p-1.5 rounded bg-red-500/10 text-red-400 shrink-0" aria-hidden="true">
                <AlertCircle size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">The Challenge</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{project.problem}</p>
              </div>
            </div>

            {/* Approach */}
            <div className="flex gap-4 items-start">
              <div className="mt-1 p-1.5 rounded bg-blue-500/10 text-blue-400 shrink-0" aria-hidden="true">
                <Layers size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Technical Approach</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{project.approach}</p>
              </div>
            </div>

            {/* Impact */}
            <div className="relative mt-2 p-5 bg-gradient-to-r from-accent/10 to-transparent rounded-lg border-l-2 border-accent">
              <div className="flex gap-4 items-start">
                <div className="mt-1 text-accent shrink-0" aria-hidden="true">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-accent uppercase tracking-widest mb-1.5">Business Impact</h4>
                  <p className="text-white font-medium text-sm leading-relaxed">{project.impact}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-gray-800/50">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span 
                  key={idx} 
                  className="text-xs font-mono font-medium px-3 py-1.5 rounded bg-background text-gray-400 border border-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

const Projects: React.FC = () => {
  const headerRef = useScrollAnimation();

  return (
    <Section id="projects" animate={false}>
      <div ref={headerRef} className="reveal mb-16 md:text-center max-w-3xl mx-auto">
        <h3 className="text-accent font-medium mb-3 uppercase tracking-wider text-sm">Selected Work</h3>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Engineering Business Value</h2>
        <p className="text-gray-400">
          I don't just train models; I build reliable systems that solve core business problems. 
          Here are a few examples of research translated into production value.
        </p>
      </div>

      <div className="flex flex-col gap-16">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </Section>
  );
};

export default Projects;