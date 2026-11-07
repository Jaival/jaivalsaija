import React from 'react';
import Experience from '@/components/experience';
import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: '/experience' },
  title: 'Experience - Jaival Saija',
  description:
    'My DevOps job at Maven Infosoft with its numbers, the internship before it, and my degrees.',
};

export default function ExperiencePage() {
  return <Experience />;
}
