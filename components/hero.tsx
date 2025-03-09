import Image from 'next/image';
import { RoughNotationGroup } from 'react-rough-notation';
import userData from '../data/data';
import { RoughNotationHero } from './roughNotationHero';

export default function Hero() {
  const colors = ['#FB9677', '#F1E2D2', '#CFE5C0', '#C8D9EB'];
  
  return (
    <section aria-label="Hero Section" className="flex flex-col md:flex-row items-center justify-center py-10 md:py-16 overflow-hidden bg-gray dark:bg-black-light">
      {/* Text container */}
      <div className="w-full px-4 md:px-4 md:w-1/2 text-center md:text-left lg:p-12 animate-fade-in-up">
        <RoughNotationGroup show={true}>
          {['DevOps Engineer.', 'Moody Developer.', 'Cloud Enthusiastic.', 'UI Hobbyist.'].map((text, index) => (
            <RoughNotationHero color={colors[index]} key={index}>
              <h1 className="my-3 md:my-4 sm:text-4xl md:text-8xl font-semibold text-blue-dark dark:text-hero-font transition-colors">
                {text}
              </h1>
            </RoughNotationHero>
          ))}
        </RoughNotationGroup>
      </div>
      
      {/* Image container */}
      <div className="w-full md:w-2/5 flex justify-center items-center mt-8 md:mt-0">
        <div className="w-4/5 sm:w-3/5 md:w-4/5 max-w-md transition-transform hover:scale-[1.02] duration-300">
          <Image
            src={userData.avatarUrl}
            alt={`${userData.name}'s profile picture`}
            className="rounded-lg shadow-md"
            width={500}
            height={500}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNM8WzYDwAEPAIgKxbCWQAAAABJRU5ErkJggg=="
            priority={true}
          />
          <div className="flex flex-row justify-start mt-4">
            <div className="flex flex-row items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-90deg-up"
                viewBox="0 0 16 16"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708l-4-4z"
                />
              </svg>
              <p className="font-mono text-base md:text-lg">That&apos;s me</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
