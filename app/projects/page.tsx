import React from 'react';
import Projects from '@/components/projects';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects - Jaival Saija',
  description:
    "Apps, a client site and VS Code themes I've built outside work, with links to the code.",
};

export default function ProjectsPage() {
  return <Projects />;
}
