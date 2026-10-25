import React from 'react';
import Experience from '@/components/experience';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experience - Jaival Saija',
  description:
    'My DevOps job at Maven Infosoft with its numbers, the internships before it, and my degrees.',
};

export default function ExperiencePage() {
  return <Experience />;
}
