'use client';

import { useTheme } from 'next-themes';
import Link from 'next/link';
// import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import userData from '../data/data';

export default function Navbar() {
  // const pathName = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="max-w-6xl px-4 py-10 mx-auto md:py-20">
      <div className="flex items-center justify-between md:flex-row">
        {/* Logo / Home / Text */}

        <div className="flex flex-col">
          <Link href="/">
            <div>
              <h1 className="text-xl font-semibold text-black-dark dark:text-silver">
                {userData.name}
              </h1>
              <p className="text-base font-light text-black-dark dark:text-silver">
                {userData.designation}
              </p>
            </div>
          </Link>
        </div>

        <div className="flex flex-row items-center space-x-4">
          <button
            aria-label="Toggle Dark Mode"
            type="button"
            className="w-10 h-10 p-3 rounded focus:outline-none"
            onClick={() => {
              setTheme(theme === 'dark' ? 'light' : 'dark');
            }}
          >
            {mounted && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                className="w-4 h-4 text-yellow-light dark:text-orange-dark"
              >
                {theme === 'dark' ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                )}
              </svg>
            )}
          </button>
        </div>
      </div>
      <div className="block mt-4 space-x-8">
        <Link
          href="/aboutme"
          className="text-base font-normal text-purple-dark dark:text-silver"
        >
          About Me
        </Link>
        <Link
          href="/projects"
          className="text-base font-normal text-purple-dark dark:text-silver"
        >
          Projects
        </Link>
        <Link
          href="/experience"
          className="text-base font-normal text-purple-dark dark:text-silver"
        >
          Experience
        </Link>
        <Link
          href="/contactme"
          className="text-base font-normal text-purple-dark dark:text-silver"
        >
          Contact Me
        </Link>
      </div>
    </div>
  );
}
// <div className="hidden space-x-8 md:block text-silver">
//     <Link href="/aboutme">
//         <text
//            className={`text-base  ${router.asPath === "/aboutme"
//               ? "text-purple-dark font-bold dark:text-silver"
//               : "text-purple-dark dark:text-silver font-normal "
//            }`}
//         >
//             About Me{" "}
//             {router.asPath === "/aboutme" && (
//                <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="16"
//                   height="16"
//                   fill="currentColor"
//                   className="inline-block w-3 h-3 bi bi-arrow-down"
//                   viewBox="0 0 16 16"
//                >
//                    <path
//                       fillRule="evenodd"
//                       d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
//                    />
//                </svg>
//             )}
//         </text>
//     </Link>
//     <Link href="/projects">
//         <text
//            className={`text-base  ${router.asPath === "/projects"
//               ? "text-purple-dark dark:text-silver font-bold  "
//               : "text-purple-dark dark:text-silver font-normal "
//            }`}
//         >
//             Projects
//             {router.asPath === "/projects" && (
//                <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="16"
//                   height="16"
//                   fill="currentColor"
//                   className="inline-block w-3 h-3 bi bi-arrow-down"
//                   viewBox="0 0 16 16"
//                >
//                    <path
//                       fillRule="evenodd"
//                       d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
//                    />
//                </svg>
//             )}
//         </text>
//     </Link>
//     <Link href="/experience">
//         <text
//            className={`text-base  ${router.asPath === "/experience"
//               ? "text-purple-dark dark:text-silver font-bold  "
//               : "text-purple-dark dark:text-silver font-normal "
//            }`}
//         >
//             Experience{" "}
//             {router.asPath === "/experience" && (
//                <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="16"
//                   height="16"
//                   fill="currentColor"
//                   className="inline-block w-3 h-3 bi bi-arrow-down"
//                   viewBox="0 0 16 16"
//                >
//                    <path
//                       fillRule="evenodd"
//                       d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
//                    />
//                </svg>
//             )}
//         </text>
//     </Link>
//     <Link href="/contactme">
//         <text
//            className={`text-base  ${router.asPath === "/contactme"
//               ? "text-purple-dark dark:text-silver font-bold  "
//               : "text-purple-dark dark:text-silver font-normal "
//            }`}
//         >
//             Contact Me
//             {router.asPath === "/contactme" && (
//                <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="16"
//                   height="16"
//                   fill="currentColor"
//                   className="inline-block w-3 h-3 bi bi-arrow-down"
//                   viewBox="0 0 16 16"
//                >
//                    <path
//                       fillRule="evenodd"
//                       d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"
//                    />
//                </svg>
//             )}
//         </text>
{
  /*    </Link>*/
}
{
  /*</div>*/
}
