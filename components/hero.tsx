import Image from 'next/image';
import { RoughNotationGroup } from 'react-rough-notation';
import userData from '../data/data';
import { RoughNotationHero } from './roughNotationHero';

export default function Hero() {
  const colors = ['#FB9677', '#F1E2D2', '#CFE5C0', '#C8D9EB'];
  return (
    <div className="flex flex-col md:flex-row items-center justify-center overflow-hidden bg-gray dark:bg-black-light">
      {/* Text container */}
      {/* TODO: Change Hero Text color */}

      <div className="mx-auto text-center md:w-1/2 md:text-left lg:p-12">
        <RoughNotationGroup show={true}>
          <RoughNotationHero color={colors[0]}>
            <h1 className="my-4 text-3xl font-semibold md:text-8xl text-blue-dark dark:text-hero-font">
              DevOps Engineer.
            </h1>
          </RoughNotationHero>
          <RoughNotationHero color={colors[1]}>
            <h1 className="my-4 text-3xl font-semibold md:text-8xl text-blue-dark dark:text-hero-font">
              Moody Developer.
            </h1>
          </RoughNotationHero>
          <RoughNotationHero color={colors[2]}>
            <h1 className="my-4 text-3xl font-semibold md:text-8xl text-blue-dark dark:text-hero-font">
              Cloud Enthusiastic.
            </h1>
          </RoughNotationHero>
          <RoughNotationHero color={colors[3]}>
            <h1 className="my-4 text-3xl font-semibold md:text-8xl text-blue-dark dark:text-hero-font">
              UI Hobbyist.
            </h1>
          </RoughNotationHero>
        </RoughNotationGroup>
      </div>
      {/* Image container */}
      <div className="flex md:mx-auto items-center justify-center mt-10 md:w-2/5">
        <div className="w-3/4 ">
          <Image
            src={userData.avatarUrl}
            alt="avatar"
            className="shadow"
            width={500}
            height={500}
            placeholder='blur'
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMszN1aDwAE/gIUJRDHNgAAAABJRU5ErkJggg==="
            priority={false}
          />
          <div className="flex flex-row justify-between mt-4">
            <div className="flex flex-row space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-90deg-up"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708l-4-4z"
                />
              </svg>
              <p className="font-mono">That&apos;s me</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
