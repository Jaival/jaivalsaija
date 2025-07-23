// Simple TypeScript interfaces for portfolio components

// Project-related interfaces
export interface Project {
  title: string;
  link: string;
  imgUrl: string;
  description?: string;
}

export interface ProjectCardProps {
  title: string;
  link: string;
  number: string;
  imgUrl: string;
  description?: string;
}

// Experience-related interfaces
export interface Experience {
  id: number;
  title: string;
  company: string;
  year: string;
  companyLink: string;
  desc: string;
}

export interface ExperienceCardProps {
  title: string;
  desc: string;
  year: string;
  company: string;
  companyLink: string;
  index: number;
}

// User data interfaces
export interface About {
  title: string;
  description: string[];
  currentProject: string;
  currentProjectUrl: string;
}

export interface SocialLinks {
  instagram: string;
  twitter: string;
  linkedin: string;
  github: string;
}

export interface UserData {
  githubUsername: string;
  name: string;
  designation: string;
  avatarUrl: string;
  email: string;
  address: string;
  projects: Project[];
  about: About;
  experience: Experience[];
  resumeUrl: string;
  socialLinks: SocialLinks;
}

// Form-related interfaces
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Navigation-related interfaces
export interface NavigationItem {
  href: string;
  label: string;
}

// Background elements interface
export interface BackgroundElementsProps {
  variant?: 'default' | 'contact' | 'minimal' | 'hero';
  className?: string;
}
