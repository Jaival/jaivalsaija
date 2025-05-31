import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import userData from 'utils/data';

// Reusable component for social links
const SocialLink = ({ href, name }: { href: string; name: string }) => (
  <div className="flex flex-row items-center justify-start">
    <Link href={href} className="flex flex-row items-center space-x-4 group">
      <div className="my-4">&rarr;</div>
      <div className="relative overflow-hidden font-mono text-lg text-gray-500 dark:text-gray-300">
        <div className="absolute h-0.5 w-full bg-red-light bottom-0 transform -translate-x-full group-hover:translate-x-0 transition duration-300"></div>
        {name}
      </div>
    </Link>
  </div>
);

// Reusable component for section headers
const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
    {children}
  </h2>
);

export default function AboutMe() {
  return (
    <section className="bg-silver dark:bg-blue-dark">
      {/* Header section */}
      <div className="h-48 max-w-6xl mx-auto bg-silver dark:bg-blue-dark">
        <h1 className="py-12 sm:py-16 md:py-20 text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-bold text-center md:text-left transition-all">
          About Me.
        </h1>
      </div>

      {/* Main content section */}
      <div className="-mt-10 bg-gray dark:bg-black-light">
        {/* Title and current project */}
        <div className="max-w-6xl pt-16 sm:pt-20 mx-auto">
          <div className="mx-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold leading-relaxed">
            {userData.about.title} Currently working on{' '}
            <Link
              className="px-2 py-1 rounded-md bg-red-light hover:bg-red-400 transition-colors"
              href={userData.about.currentProjectUrl}
              aria-label={`Current project: ${userData.about.currentProject}`}
            >
              {userData.about.currentProject} ✈️
            </Link>
          </div>
        </div>
      </div>

      {/* Content grid */}
      <div className="px-4 bg-gray dark:bg-black-light">
        <div className="grid max-w-6xl grid-cols-1 pt-12 sm:pt-16 md:pt-20 mx-auto md:grid-cols-3 gap-y-12 md:gap-y-20 gap-x-8 md:gap-x-20">
          {/* Left sidebar */}
          <aside className="inline-flex flex-col space-y-8">
            {/* Contact section */}
            <div>
              <SectionHeader>Contact</SectionHeader>
              <div className="text-base sm:text-lg text-gray-500 dark:text-gray-300">
                For any sort help / enquiry, shoot a{' '}
                <Link
                  href={`mailto:${userData.email}`}
                  className="font-bold border-b-2 text-primary border-primary dark:border-gray-300 dark:text-white"
                >
                  mail
                </Link>{' '}
                and I&apos;ll get back. I swear.
              </div>
            </div>

            {/* Job opportunities section */}
            <div>
              <SectionHeader>Job Opportunities</SectionHeader>
              <div className="text-base sm:text-lg text-gray-500 dark:text-gray-300">
                I&apos;m looking for a job currently, If you see me as a good
                fit, check my{' '}
                <Link
                  href={userData.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold border-b-2 text-primary border-primary dark:border-gray-300 dark:text-white"
                >
                  CV
                </Link>{' '}
                and I&apos;d love to work for you.
              </div>
            </div>

            {/* Social Links */}
            <div>
              <SectionHeader>Social Links</SectionHeader>
              <div className="mt-2 ml-4 space-y-1">
                <SocialLink
                  href={userData.socialLinks.twitter}
                  name="Twitter"
                />
                <SocialLink href={userData.socialLinks.github} name="GitHub" />
                <SocialLink
                  href={userData.socialLinks.linkedin}
                  name="LinkedIn"
                />
                <SocialLink
                  href={userData.socialLinks.instagram}
                  name="Instagram"
                />
              </div>
            </div>
          </aside>

          {/* Main content area */}
          <div className="col-span-1 md:col-span-2">
            {/* About me description */}
            <div className="space-y-4 mb-8">
              {userData.about.description?.map((desc, idx) => (
                <p
                  key={idx}
                  className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300"
                >
                  {desc}
                </p>
              ))}
            </div>

            {/* Tech stack section */}
            <h3 className="inline-block px-2 py-1 text-2xl sm:text-3xl font-bold bg-red-500 rounded-md text-gray-50 mb-6">
              Tech Stack
            </h3>
            <div className="flex flex-row flex-wrap">
              <Image
                alt="My technology skills including AWS, Next.js, Tailwind, Firebase, TypeScript, IntelliJ, VSCode, Docker, Dart, Flutter, and Python"
                width={400}
                height={400}
                src="https://skillicons.dev/icons?i=aws,next,tailwind,firebase,typescript,idea,vscode,docker,dart,flutter,python,&perline=6"
                className="m-2 sm:m-4"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
