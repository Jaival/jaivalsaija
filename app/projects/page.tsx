import React from 'react';
import Projects from '@/components/projects';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects - Jaival Saija',
};

export default function ProjectsPage() {
  return <Projects />;
}
