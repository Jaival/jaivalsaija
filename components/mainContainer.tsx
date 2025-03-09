import React from 'react';
import Footer from './footer';
import Navbar from './navbar';

interface ContainerMainProps {
  children: React.ReactNode;
}

export default function ContainerMain({ children }: ContainerMainProps) {
  return (
    <div className="w-full h-full bg-silver dark:bg-blue-dark">
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
