'use client';

import Link from 'next/link';
import userData from '@/data/data';

export default function ContactMe() {
  return (
    <section className="pb-16 md:pb-20 bg-gray dark:bg-black-light">
      <div className="h-48 max-w-6xl mx-auto antialiased">
        <h1 className="py-10 md:py-20 text-5xl md:text-9xl font-bold text-center md:text-left">
          Contact
        </h1>
      </div>
      <div className="relative z-10 max-w-6xl p-4 md:p-10 lg:p-16 mx-2 md:mx-auto text-white rounded-md shadow-md bg-blue">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-8">
            <header>
              <h2 className="text-xl md:text-2xl font-semibold">
                Get in touch, let&apos;s talk.
              </h2>
              <p className="mt-2 text-sm md:text-base font-light">
                Fill in the details and I&apos;ll get back to you as soon as I
                can.
              </p>
            </header>

            <div className="flex flex-col space-y-4">
              <div className="flex flex-row items-center p-3 md:p-4 space-x-4 border rounded-md border-blue hover:border-aero transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="w-4 h-4 flex-shrink-0"
                  viewBox="0 0 16 16"
                >
                  <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
                </svg>
                <p className="text-sm font-light truncate">{userData.email}</p>
              </div>

              <div className="flex flex-row items-center p-3 md:p-4 space-x-4 border rounded-md border-blue hover:border-aero transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="w-4 h-4 flex-shrink-0"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A5.921 5.921 0 0 1 5 6.708V2.277a2.77 2.77 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354z" />
                </svg>
                <p className="text-sm font-light">{userData.address}</p>
              </div>
            </div>

            <div className="flex flex-row space-x-4 pt-4">
              <Link
                href={userData.socialLinks.twitter}
                aria-label="Twitter Profile"
                className="flex items-center justify-center w-10 h-10 rounded-md border border-transparent hover:border-aero transition-colors duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="w-5 h-5"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                </svg>
              </Link>
              <Link
                href={userData.socialLinks.instagram}
                aria-label="Instagram Profile"
                className="flex items-center justify-center w-10 h-10 rounded-md border border-transparent hover:border-aero transition-colors duration-300"
              >
                <svg
                  width="24"
                  height="24"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7ZM9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12Z"
                    fill="currentColor"
                  />
                  <path
                    d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
                    fill="currentColor"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5 1C2.79086 1 1 2.79086 1 5V19C1 21.2091 2.79086 23 5 23H19C21.2091 23 23 21.2091 23 19V5C23 2.79086 21.2091 1 19 1H5ZM19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                    fill="currentColor"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <form className="flex flex-col p-4 rounded-lg form dark:bg-blue">
            <label htmlFor="name" className="mx-4 text-sm">
              {' '}
              Your Name
            </label>
            <input
              type="text"
              className="px-1 py-2 mx-4 mt-2 font-light border rounded-md focus:outline-hidden focus:ring-2 focus:border-none ring-border-aero"
              name="name"
            />
            <label htmlFor="email" className="mx-4 mt-4 text-sm">
              Email
            </label>
            <input
              type="text"
              className="px-1 py-2 mx-4 mt-2 font-light border rounded-md focus:outline-hidden focus:ring-2 focus:border-none ring-border-aero"
              name="email"
            />
            <label htmlFor="message" className="mx-4 mt-4 text-sm">
              Message
            </label>
            <textarea
              rows={4}
              typeof="text"
              className="px-1 py-2 mx-4 mt-2 font-light border rounded-md focus:outline-hidden focus:ring-2 focus:border-none ring-border-aero"
              name="message"
            ></textarea>
            <button
              type="submit"
              className="w-1/2 py-2 mx-4 mt-8 text-xs font-bold rounded-md bg-aero"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
