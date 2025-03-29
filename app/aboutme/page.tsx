import React from 'react';
import AboutMe from '@/components/aboutme';
import PageWrapper from '@/components/pageWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Jaival Saija',
};

export default function aboutMe() {
  return (
    <PageWrapper>
      <AboutMe />
    </PageWrapper>
  );
}
