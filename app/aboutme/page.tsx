import React from 'react';
import AboutMe from '@/components/aboutme';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Me - Jaival Saija',
  description:
    "How I got from games at 15 to running AWS in production, and what I'm studying at RPTU now.",
};

export default function About() {
  return <AboutMe />;
}
