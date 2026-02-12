import { LucideIcon } from 'lucide-react';

export interface Project {
  id: number;
  title: string;
  problem: string;
  approach: string;
  impact: string;
  tags: string[];
  githubUrl: string;
  imageUrl: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
  icon: LucideIcon;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  url: string;
}