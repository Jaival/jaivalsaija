import React from 'react';
import AboutMe from '@/components/aboutme';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me - Jaival Saija',
};

export default function About() {
  return <AboutMe />;
}
