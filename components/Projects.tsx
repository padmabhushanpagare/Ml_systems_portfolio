import React from 'react';
import Section from './Section';
import { Github, ExternalLink } from 'lucide-react';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: 1,
    title: "Predictive Maintenance System",
    problem: "Manufacturing equipment downtime was costing the client $50k/hour in lost production.",
    approach: "Developed an LSTM-based anomaly detection model on time-series sensor data. Deployed via FastAPI on Kubernetes with drift monitoring.",
    impact: "Reduced unplanned downtime by 35%, saving approximately $2M annually.",
    tags: ["Python", "TensorFlow", "Kubernetes", "FastAPI"],
    githubUrl: "#",
    imageUrl: "https://picsum.photos/800/600?random=1"
  },
  {
    id: 2,
    title: "Real-time Recommendation Engine",
    problem: "E-commerce platform suffered from low conversion rates due to static product sorting.",
    approach: "Built a two-tower retrieval and ranking architecture using TFX pipelines. Implemented A/B testing framework to validate gains.",
    impact: "Increased click-through rate by 12% and gross merchandise value (GMV) by 8% in Q3.",
    tags: ["PyTorch", "Redis", "TFX", "BigQuery"],
    githubUrl: "#",
    imageUrl: "https://picsum.photos/800/600?random=2"
  },
  {
    id: 3,
    title: "Document Intelligence Platform",
    problem: "Legal team spent 40+ hours weekly manually reviewing contracts for compliance risks.",
    approach: "Fine-tuned BERT models for Named Entity Recognition (NER) and clause classification. Wrapped in a React/Flask app for human-in-the-loop review.",
    impact: "Automated 85% of initial review process, reducing manual effort to <5 hours weekly.",
    tags: ["HuggingFace", "NLP", "Docker", "PostgreSQL"],
    githubUrl: "#",
    imageUrl: "https://picsum.photos/800/600?random=3"
  }
];

const Projects: React.FC = () => {
  return (
    <Section id="projects">
      <div className="mb-16">
        <h3 className="text-accent font-medium mb-2 uppercase tracking-wider">Case Studies</h3>
        <h2 className="text-3xl md:text-4xl font-bold text-white">Featured Projects</h2>
      </div>

      <div className="flex flex-col gap-12">
        {projects.map((project) => (
          <div key={project.id} className="group bg-surface rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300">
            <div className="flex flex-col lg:flex-row">
              {/* Image Section */}
              <div className="lg:w-2/5 relative overflow-hidden h-64 lg:h-auto">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
              </div>

              {/* Content Section */}
              <div className="lg:w-3/5 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    <a href={project.githubUrl} className="text-gray-400 hover:text-white transition-colors" aria-label="View on GitHub">
                      <Github size={20} />
                    </a>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="text-sm font-semibold text-accent uppercase tracking-wide mb-1">Problem</h4>
                      <p className="text-gray-400">{project.problem}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-accent uppercase tracking-wide mb-1">Approach</h4>
                      <p className="text-gray-400">{project.approach}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-accent uppercase tracking-wide mb-1">Impact</h4>
                      <p className="text-white font-medium">{project.impact}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs font-mono px-3 py-1 rounded-full bg-background border border-gray-700 text-gray-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Projects;