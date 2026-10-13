import React from 'react';
import Experience from '@/components/experience';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experience - Jaival Saija',
  description:
    'My DevOps job at Maven Infosoft, my degrees, and the internships before them.',
};

export default function ExperiencePage() {
  return <Experience />;
}
