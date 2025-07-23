import React from 'react';
import ContactMe from '@/components/contactme';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Me - Jaival Saija',
};

export default function Contact() {
  return <ContactMe />;
}
