'use client';

import Image from 'next/image';
import Link from 'next/link';
import userData from '../data/data';
import { useState } from 'react';

// Define types for project data
interface Project {
  title: string;
  link: string;
  imgUrl: string;
  description?: string;
}

interface ProjectCardProps extends Project {
  number: string;
}

// Extract ProjectCard to its own component for better organization
const ProjectCard = ({
  title,
  link,
  number,
  imgUrl,
  description,
}: ProjectCardProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Link
      href={link}
      className="block w-full shadow-2xl transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <div className="relative overflow-hidden rounded-md group">
        <div className="relative h-64 sm:h-72 w-full">
          <Image
            src={imgUrl}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={parseInt(number) <= 2} // Prioritize loading first two images
            alt={`Project: ${title}`}
            className={`
              object-cover w-full h-full 
              transition-all duration-700 ease-out 
              group-hover:scale-110
              ${isLoading ? 'blur-sm' : 'blur-0'}
            `}
            onLoadingComplete={() => setIsLoading(false)}
          />
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800 animate-pulse">
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/70 opacity-80">
          <span className="absolute px-3 py-1 text-sm sm:text-lg font-bold bg-red-500 rounded-md top-4 left-4 text-white">
            {title}
          </span>
          <span className="absolute px-3 py-1 text-sm sm:text-lg font-bold bottom-4 left-4 text-white">
            {number.length === 1 ? '0' + number : number}
          </span>
          {description && (
            <p className="absolute bottom-4 right-4 left-16 text-xs sm:text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity">
              {description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default function Projects() {
  return (
    <section
      className="bg-silver dark:bg-blue-dark"
      id="projects"
      aria-labelledby="projects-heading"
    >
      <div className="h-48 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          id="projects-heading"
          className="py-20 text-5xl sm:text-6xl md:text-9xl font-bold text-center md:text-left"
        >
          Projects
        </h1>
      </div>

      <div className="bg-gray dark:bg-black-light">
        <div className="-mt-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-10">
            {userData.projects.map((proj, idx) => (
              <ProjectCard
                key={idx}
                title={proj.title}
                link={proj.link}
                imgUrl={proj.imgUrl}
                number={`${idx + 1}`}
                // description={proj.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
