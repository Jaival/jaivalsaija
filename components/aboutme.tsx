import Image from 'next/image';
import Link from 'next/link';
import React from "react";
import userData from "../data/data";

export default function AboutMe() {
    return (
        <section className="bg-silver dark:bg-blue-dark">
            <div className="h-48 max-w-6xl mx-auto bg-silver dark:bg-blue-dark">
                <h1 className="py-20 text-5xl font-bold text-center md:text-9xl md:text-left">
                    About Me.
                </h1>
            </div>
            <div className="-mt-10 bg-gray dark:bg-black-light">
                <div className="max-w-6xl pt-20 mx-auto text-container">
                    <p
                        className="mx-4 text-2xl font-semibold leading-loose md:text-4xl"
                        style={{ lineHeight: "3rem" }}
                    >
                        {userData.about.title}. Currently working on{" "}
                        <Link
                            className="px-2 py-1 bg-red-500 rounded-md"
                            // href={userData.about.currentProjectUrl}
                            href=""
                        >
                            {userData.about.currentProject} ✈️
                        </Link>
                    </p>
                </div>
            </div>
            <div className="px-4 bg-gray dark:bg-black-light">
                <div className="grid max-w-6xl grid-cols-1 pt-20 mx-auto md:grid-cols-3 gap-y-20 gap-x-20">
                    {/* Social Buttons */}
                    <div className="inline-flex flex-col">
                        <div>
                            <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                                Contact
                            </h1>
                            <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
                                For any sort help / enquiry, shoot a{" "}
                                <Link
                                    href={`mailto:${userData.email}`}
                                    className="font-bold border-b-2 text-primary border-primary dark:border-gray-300 dark:text-white"
                                >
                                    mail
                                </Link>{" "}
                                and I&apos;ll get back. I swear.
                            </p>
                        </div>
                        <div className="mt-8">
                            <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                                Job Opportunities
                            </h1>
                            <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
                                I&apos;m looking for a job currently, If you see me as a good fit,
                                check my{" "}
                                <Link
                                    href={userData.resumeUrl}
                                    target="__blank"
                                    className="font-bold border-b-2 text-primary border-primary dark:border-gray-300 dark:text-white"
                                >
                                    CV
                                </Link>{" "}
                                and I&apos;d love to work for you.
                            </p>
                        </div>
                        {/* Social Links */}
                        <h1 className="mt-8 text-xl font-semibold text-gray-700 dark:text-gray-200">
                            Social Links
                        </h1>
                        <div className="mt-4 ml-4">
                            <div className="flex flex-row items-center justify-start">
                                <Link
                                    href={userData.socialLinks.twitter}
                                    className="flex flex-row items-center space-x-4 group"
                                >
                                    <div className="my-4">&rarr;</div>
                                    <p className="relative overflow-hidden font-mono text-lg text-gray-500 dark:text-gray-300">
                                        <div className="absolute h-0.5 w-full bg-gray-400 bottom-0 transform -translate-x-24 group-hover:translate-x-0 transition duration-300"></div>
                                        Twitter
                                    </p>
                                </Link>
                            </div>
                            <div className="flex flex-row items-center justify-start">
                                <Link
                                    href={userData.socialLinks.github}
                                    className="flex flex-row items-center space-x-4 group"
                                >
                                    <div className="my-4">&rarr;</div>
                                    <p className="relative overflow-hidden font-mono text-lg text-gray-500 dark:text-gray-300">
                                        <div className="absolute h-0.5 w-full bg-gray-400 bottom-0 transform -translate-x-24 group-hover:translate-x-0 transition duration-300"></div>
                                        GitHub
                                    </p>
                                </Link>
                            </div>
                            <div className="flex flex-row items-center justify-start">
                                <Link
                                    href={userData.socialLinks.linkedin}
                                    className="flex flex-row items-center space-x-4 group"
                                >
                                    <div className="my-4">&rarr;</div>
                                    <p className="relative overflow-hidden font-mono text-lg text-gray-500 dark:text-gray-300">
                                        <div className="absolute h-0.5 w-full bg-gray-400 bottom-0 transform -translate-x-24 group-hover:translate-x-0 transition duration-300"></div>
                                        LinkedIn
                                    </p>
                                </Link>
                            </div>
                            <div className="flex flex-row items-center justify-start">
                                <Link
                                    href={userData.socialLinks.instagram}
                                    className="flex flex-row items-center space-x-4 group"
                                >
                                    <div className="my-4">&rarr;</div>
                                    <p className="relative overflow-hidden font-mono text-lg text-gray-500 dark:text-gray-300">
                                        <div className="absolute h-0.5 w-full bg-gray-400 bottom-0 transform -translate-x-28 group-hover:translate-x-0 transition duration-300"></div>
                                        Instagram
                                    </p>
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* Text area */}
                    <div className="col-span-1 md:col-span-2">
                        {userData.about.description?.map((desc, idx) => (
                            <p
                                key={idx}
                                className="mb-4 text-xl text-gray-700 dark:text-gray-300 "
                            >
                                {desc}
                            </p>
                        ))}

                        <h1 className="inline-block px-2 py-1 text-3xl font-bold bg-red-500 rounded-md text-gray-50">
                            Tech Stack
                        </h1>
                        <div className="flex flex-row flex-wrap mt-8">
                        {/* https://skillicons.dev/icons?i=aws,firebase,docker,dart,flutter,python,next,tailwind,typescript,idea,vscode */}
                        <Image alt='' width={400} height={400}
                                src='https://skillicons.dev/icons?i=aws,next,tailwind,firebase,typescript,idea,vscode,docker,dart,flutter,python,&perline=6'
                                className='m-4'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
