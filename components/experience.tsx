import Link from 'next/link';
import React from 'react';
import userData from '../data/data';

export default function Experience() {
  return (
    <section className="bg-silver dark:bg-blue-dark">
      <div className="h-48 max-w-6xl mx-auto ">
        <h1 className="py-12 md:py-20 text-4xl md:text-5xl lg:text-9xl font-bold text-center md:text-left px-4 md:px-8">
          Experience
        </h1>
      </div>
      <div className="-mt-10 bg-gray dark:bg-black-light px-4 md:px-8 pb-16 pt-10">
        <div className="grid grid-cols-1 max-w-xl mx-auto pt-12 md:pt-20 relative">
          {userData.experience.map((exp, idx) => (
            <div key={`experience-${exp.id}`} className="timeline-item">
              <ExperienceCard
                title={exp.title}
                desc={exp.desc}
                year={exp.year}
                company={exp.company}
              />

              {idx !== userData.experience.length - 1 && (
                <div className="flex flex-col items-center -mt-2 divider-container">
                  <div className="relative z-10 w-4 h-4 rounded-full bg-green-dark">
                    <div className="absolute w-4 h-4 rounded-full bg-green-dark animate-ping"></div>
                  </div>
                  <div className="w-1 h-16 md:h-24 rounded-full bg-gray-dark dark:bg-gray-dark"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const ExperienceCard = ({
  title,
  desc,
  year,
  company,
  companyLink = '#',
}: {
  title: string;
  desc: string;
  year: string;
  company: string;
  companyLink?: string;
}) => {
  return (
    <div className="relative z-10 p-4 md:p-6 border-2 rounded-md shadow-xl border-purple-dark dark:border-blue-gray bg-card-background dark:bg-purple-dark transition-all hover:shadow-2xl">
      <h1 className="text-4xl font-bold text-gray-light dark:text-blue-gray mb-2 md:absolute md:-left-10 md:-top-10">
        {year}
      </h1>
      <h1 className="text-xl font-semibold text-blue-gray mb-1">{title}</h1>
      <Link
        href={companyLink}
        className="text-blue-green dark:text-gray hover:underline inline-block mb-2"
      >
        {company}
      </Link>
      <p className="text-blue-green dark:text-gray">{desc}</p>
    </div>
  );
};
