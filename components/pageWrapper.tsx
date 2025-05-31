import React from 'react';
import Footer from './footer';
import Navbar from './navbar';
import { PageWrapperProps } from '@/data/interface';

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="w-full h-full bg-silver dark:bg-blue-dark">
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
