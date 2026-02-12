import React from 'react';
import Section from './Section';
import { Github, ExternalLink, TrendingUp, AlertCircle, Layers } from 'lucide-react';
import { Project } from '../types';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const projects: Project[] = [
  {
    id: 1,
    title: "Predictive Maintenance System",
    problem: "Unplanned downtime in manufacturing lines costing $50k/hour, with false positive alerts causing alert fatigue.",
    approach: "Architected LSTM-based anomaly detection on high-frequency sensor data. Implemented drift monitoring via EvidentlyAI and deployed on K8s.",
    impact: "Reduced downtime by 35% ($2M/year savings) and decreased false alarm rate by 60%, restoring operator trust.",
    tags: ["Python", "TensorFlow", "Kubernetes", "FastAPI", "EvidentlyAI"],
    githubUrl: "#",
    imageUrl: "https://picsum.photos/800/600?random=1"
  },
  {
    id: 2,
    title: "Real-time Recommendation Engine",
    problem: "Static rule-based sorting resulted in low engagement and 2.5% conversion rate on the discovery feed.",
    approach: "Designed a two-tower retrieval/ranking system with TFX. Built a low-latency inference service (<50ms p99) using Redis feature store.",
    impact: "Boosted CTR by 12% and GMV by 8% in A/B tests. Scaled to handle 5k QPS with 99.9% availability.",
    tags: ["PyTorch", "Redis", "TFX", "BigQuery", "Go"],
    githubUrl: "#",
    imageUrl: "https://picsum.photos/800/600?random=2"
  },
  {
    id: 3,
    title: "Legal Document Intelligence",
    problem: "Manual contract review was a bottleneck, consuming 40+ hours/week of senior counsel time for routine compliance checks.",
    approach: "Fine-tuned RoBERTa for NER and clause classification. Developed a human-in-the-loop active learning loop to improve model performance over time.",
    impact: "Automated 85% of initial review, reducing manual effort to 5 hours/week. Achieved 94% F1-score on critical risk clauses.",
    tags: ["HuggingFace", "NLP", "Docker", "PostgreSQL", "React"],
    githubUrl: "#",
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
            <div className="flex gap-3">
              <a 
                href={project.githubUrl} 
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all" 
                aria-label={`View ${project.title} source code on GitHub`}
              >
                <Github size={20} />
              </a>
              <a 
                href="#" 
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all" 
                aria-label={`View live demo of ${project.title}`}
              >
                <ExternalLink size={20} />
              </a>
            </div>
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