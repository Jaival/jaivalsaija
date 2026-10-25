import React from 'react';
import Projects from '@/components/projects';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects - Jaival Saija',
  description:
    'What I build outside work, with how each one ships: CI, releases and deploys, and links to the code.',
};

export default function ProjectsPage() {
  return <Projects />;
}
