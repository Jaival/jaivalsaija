'use client';

import Image from 'next/image';
import Link from 'next/link';
import userData from 'utils/data';
import { useState, type CSSProperties } from 'react';
import { ProjectCardProps } from '@/utils/interface';
import BackgroundElements from './backgroundElements';
import Reveal from './Reveal';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SquareArrowOutUpRight } from 'lucide-react';

// Hover lift and press are CSS on the card itself — one owner per property,
// and no JS involved in something that fires on every pointer move.
function ProjectCard({
  title,
  link,
  number,
  imgUrl,
  description,
}: ProjectCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const numberPadded = parseInt(number);

  return (
    <Link
      href={link}
      target='_blank'
      rel='noopener noreferrer'
      className='block transition-transform duration-200 ease-out hover:-translate-y-2 active:scale-[0.98] active:translate-y-0'
    >
      <Card className='group h-full bg-white/5 dark:bg-blue-dark/10 backdrop-blur-sm border-gray-light/20 dark:border-blue-line/20 hover:border-hero-font/30 shadow-lg hover:shadow-2xl overflow-hidden transition-[border-color,box-shadow] duration-200 ease-out'>
        <div className='relative overflow-hidden'>
          {/* Project number badge */}
          <div className='absolute top-4 left-4 z-10'>
            <div className='w-8 h-8 bg-gradient-to-br from-hero-font to-blue-green rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg'>
              {numberPadded}
            </div>
          </div>

          {/* Image container */}
          <div className='relative h-48 bg-gradient-to-br from-gray-light/10 to-blue-line/10 dark:from-blue-dark/20 dark:to-purple-dark/20'>
            <Image
              src={imgUrl}
              alt={`${title} project preview`}
              fill
              // Fade the image in once it decodes, and scale gently on hover.
              className={`object-cover transition-[opacity,transform] duration-300 ease-out group-hover:scale-105 ${
                isLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
            {/* Overlay gradient */}
            <div className='absolute inset-0 bg-gradient-to-t from-blue-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out' />
          </div>
        </div>

        <CardHeader>
          <CardTitle className='text-xl font-bold tracking-tight text-blue-dark dark:text-gray-light group-hover:text-hero-font transition-colors duration-200 ease-out'>
            {title}
          </CardTitle>
          <CardDescription className='text-blue-dark/90 dark:text-gray-light/80 line-clamp-3'>
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-2 text-sm text-hero-font dark:text-blue-light font-medium'>
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                />
              </svg>
              <span>View Project</span>
            </div>
            <div className='w-8 h-8 bg-hero-font/10 dark:bg-blue-light/10 rounded-full flex items-center justify-center group-hover:bg-hero-font/20 dark:group-hover:bg-blue-light/20 transition-colors duration-200 ease-out'>
              <svg
                className='w-4 h-4 text-hero-font dark:text-blue-light'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                aria-hidden='true'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 8l4 4m0 0l-4 4m4-4H3'
                />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function Projects() {
  return (
    <section className='relative py-20 px-4 min-h-svh'>
      <BackgroundElements className='projects-page' />

      <div className='container mx-auto max-w-6xl relative z-10'>
        {/* Above the fold: CSS entrance, no hydration wait. */}
        <div className='text-center mb-16'>
          <h1 className='animate-enter text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-6'>
            <span className='bg-gradient-to-r from-hero-font via-blue-green to-aero bg-clip-text text-transparent'>
              My Projects
            </span>
          </h1>

          <p
            className='animate-enter text-lg md:text-xl text-blue-dark/75 dark:text-gray-light max-w-3xl mx-auto leading-relaxed'
            style={{ '--stagger': 1 } as CSSProperties}
          >
            A collection of projects I&apos;ve worked on, showcasing different
            technologies and approaches to solving real-world problems.
          </p>
        </div>

        {/* One reveal per card — the old version animated each card twice. */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12'>
          {userData.projects.map((project, index) => (
            <Reveal key={project.title} index={index % 2}>
              <ProjectCard
                title={project.title}
                link={project.link}
                imgUrl={project.imgUrl}
                number={(index + 1).toString()}
                description={project.description}
              />
            </Reveal>
          ))}
        </div>

        <Reveal className='text-center mt-16'>
          <Link
            href={`https://github.com/${userData.githubUsername}`}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center space-x-3 bg-gradient-to-r from-hero-font to-blue-green text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-[box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0'
          >
            <svg
              className='w-5 h-5'
              fill='currentColor'
              viewBox='0 0 20 20'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z'
                clipRule='evenodd'
              />
            </svg>
            <span>View More on GitHub</span>
            <SquareArrowOutUpRight aria-hidden='true' />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
