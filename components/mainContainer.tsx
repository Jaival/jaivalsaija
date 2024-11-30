import React from 'react';
import Footer from './footer';
import Navbar from './navbar';

export default function ContainerMain({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-full bg-silver dark:bg-blue-dark">
      <Navbar />
      <div>{children}</div>
      <Footer />
    </main>
  );
}
