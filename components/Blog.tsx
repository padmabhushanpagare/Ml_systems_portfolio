import React from 'react';
import Section from './Section';
import { ArrowUpRight } from 'lucide-react';
import { BlogPost } from '../types';

const posts: BlogPost[] = [
  {
    id: 1,
    title: "Designing Feature Stores for Real-time Inference",
    excerpt: "A deep dive into reducing training-serving skew using Feast and Redis in high-throughput environments.",
    date: "Oct 12, 2023",
    readTime: "8 min read",
    url: "/blog-template.html" // Linked to template for demo purposes
  },
  {
    id: 2,
    title: "From Notebook to Production: MLOps Best Practices",
    excerpt: "Why you should stop pickling models and start versioning your data and pipelines.",
    date: "Sep 28, 2023",
    readTime: "6 min read",
    url: "/blog-template.html"
  },
  {
    id: 3,
    title: "Optimizing Transformer Inference with Quantization",
    excerpt: "Benchmarking standard PyTorch vs ONNX Runtime vs TensorRT for BERT-large models.",
    date: "Aug 15, 2023",
    readTime: "12 min read",
    url: "/blog-template.html"
  }
];

const Blog: React.FC = () => {
  return (
    <Section id="blog">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h3 className="text-accent font-medium mb-2 uppercase tracking-wider">Writing</h3>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Latest Articles</h2>
        </div>
        <a href="#" className="hidden md:flex items-center gap-2 text-accent hover:text-white transition-colors">
          View all posts <ArrowUpRight size={18} />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <a key={post.id} href={post.url} className="group block h-full">
            <article className="bg-surface h-full p-6 rounded-xl border border-gray-800 group-hover:border-accent/50 group-hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-center text-xs text-gray-500 mb-4 font-mono">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {post.excerpt}
              </p>
              <div className="mt-6 flex items-center text-sm text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Read Article <ArrowUpRight size={14} className="ml-1" />
              </div>
            </article>
          </a>
        ))}
      </div>
      
      <div className="mt-8 md:hidden text-center">
         <a href="#" className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors">
          View all posts <ArrowUpRight size={18} />
        </a>
      </div>
    </Section>
  );
};

export default Blog;