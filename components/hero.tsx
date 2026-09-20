'use client';

import { gradientText, titleStyles } from '@/utils/styles';
import { springPlayful } from '@/utils/animations';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, type CSSProperties } from 'react';
import { RoughNotationGroup } from 'react-rough-notation';
import userData from 'utils/data';
import BackgroundElements from './backgroundElements';
import { RoughNotationHero } from './roughNotationHero';

// Static data
const colors = ['#FB9677', '#F1E2D2', '#CFE5C0', '#C8D9EB'];
const roles = [
  'DevOps Engineer.',
  'AWS Cloud & Security.',
  'Incident Responder.',
  'Runbook Writer.',
];

const primaryCta =
  'inline-flex items-center justify-center h-11 px-8 py-2 text-sm font-medium rounded-md text-white bg-gradient-to-r from-hero-font to-blue-green hover:from-blue-green hover:to-hero-font dark:from-blue-light dark:to-aero dark:text-blue-dark shadow-lg hover:shadow-xl transition-[background-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0 focus-visible:ring-2 focus-visible:ring-hero-font/60 focus-visible:ring-offset-2';

const secondaryCta =
  'inline-flex items-center justify-center h-11 px-8 py-2 text-sm font-medium rounded-md border-2 border-hero-font bg-transparent shadow-sm hover:bg-hero-font hover:text-white dark:border-blue-light dark:text-blue-light dark:hover:bg-blue-light dark:hover:text-blue-dark backdrop-blur-sm transition-[color,background-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0 focus-visible:ring-2 focus-visible:ring-hero-font/50 focus-visible:ring-offset-2';

/** Entrance stagger step for the hero column, in `.animate-enter` units. */
const step = (index: number) => ({ '--stagger': index }) as CSSProperties;

export default function Hero() {
  const [showRoughNotation, setShowRoughNotation] = useState(false);

  // The hand-drawn highlight is drawn once the entrance has settled.
  useEffect(() => {
    const timer = setTimeout(() => setShowRoughNotation(true), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    // Above the fold: the entrance is CSS, so this is painted and readable
    // before any JS arrives.
    <section className='relative min-h-svh flex items-center justify-center py-20 px-4 overflow-hidden'>
      <BackgroundElements variant='hero' className='hero overflow-hidden' />

      <div className='container mx-auto flex flex-col md:flex-row items-center justify-between max-w-6xl relative z-10'>
        {/* Text Content */}
        <div className='w-full md:w-1/2 text-center md:text-left space-y-6'>
          <div
            className='animate-enter text-base md:text-lg font-mono text-hero-font dark:text-blue-light'
            style={step(0)}
          >
            👋 Hello, I&apos;m
          </div>

          <h1
            className={`${titleStyles.hero} ${gradientText.hero} animate-enter`}
            style={step(1)}
          >
            {userData.name}
          </h1>

          <div className='animate-enter space-y-3' style={step(2)}>
            <RoughNotationGroup show={showRoughNotation}>
              {roles.map((text, index) => (
                <div key={text} className='flex'>
                  <RoughNotationHero color={colors[index]}>
                    <span className='text-xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-blue-dark dark:text-hero-font'>
                      {text}
                    </span>
                  </RoughNotationHero>
                </div>
              ))}
            </RoughNotationGroup>
          </div>

          <p
            className='animate-enter text-lg md:text-xl text-gray-dark dark:text-gray-light max-w-2xl leading-relaxed'
            style={step(3)}
          >
            I look after AWS infrastructure across dev, stage and production,
            and I go through the logs when it breaks. Based in Kaiserslautern,
            finishing a Masters in Computer Science.
          </p>

          {/* CTAs: real links, so navigation stays client-side. Hover and
              press are CSS only — one owner per transform. */}
          <div
            className='animate-enter flex flex-col sm:flex-row gap-4 pt-6'
            style={step(4)}
          >
            <Link href='/projects' className={primaryCta}>
              View My Work
            </Link>
            <Link href='/contactme' className={secondaryCta}>
              Get In Touch
            </Link>
          </div>
        </div>

        {/* Profile Image */}
        <div
          className='animate-enter w-full md:w-2/5 flex justify-center items-center mt-8 md:mt-0'
          style={step(2)}
        >
          <div className='relative'>
            {/* Static glow — the rings used to rotate forever for no reason. */}
            <div
              aria-hidden
              className='absolute -inset-6 bg-gradient-to-r from-hero-font/20 via-blue-light/20 to-aero/20 rounded-full blur-xl'
            />

            <div className='relative z-10'>
              <Image
                src={userData.avatarUrl}
                alt={`${userData.name}'s profile picture`}
                className='rounded-full shadow-2xl object-cover border-4 border-white dark:border-blue-dark'
                width={320}
                height={320}
                priority={true}
                sizes='(max-width: 768px) 280px, 320px'
              />
            </div>

            {/* The one bouncy moment on the site: seen once per visit, on a
                purely decorative badge. */}
            <motion.div
              className='absolute -bottom-4 -right-4 origin-bottom-right bg-white dark:bg-blue-dark px-4 py-2 rounded-full shadow-lg border border-gray-light dark:border-blue-light'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...springPlayful, delay: 1.2 }}
            >
              <span className='text-sm font-medium text-blue-dark dark:text-blue-light'>
                That&apos;s me! 👋
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
