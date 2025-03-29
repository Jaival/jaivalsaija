import React from 'react';
import ContactMe from '@/components/contactme';
import PageWrapper from '@/components/pageWrapper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Me - Jaival Saija',
};

export default function contactMe() {
  return (
    <PageWrapper>
      <ContactMe />
    </PageWrapper>
  );
}
