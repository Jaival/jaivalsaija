import React from 'react';
import Experience from '@/components/experience';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experience - Jaival Saija',
};

export default function ExperiencePage() {
  return <Experience />;
}
