import React from 'react';
import ContactMe from '@/components/contactme';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Me - Jaival Saija',
  description:
    "I'm looking for a working student or junior role in DevOps, cloud or AI automation in Germany. Email is the fastest way to reach me.",
};

export default function Contact() {
  return <ContactMe />;
}
