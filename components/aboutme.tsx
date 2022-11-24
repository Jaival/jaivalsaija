import Image from 'next/image';
import React from "react";
import userData from "../data/data";

export default function AboutMe() {
    return (
        <section className="bg-silver dark:bg-blue-dark">
            <div className="max-w-6xl mx-auto h-48 bg-silver dark:bg-blue-dark">
                <h1 className=" text-5xl md:text-9xl font-bold py-20 text-center md:text-left">
                    About Me.
                </h1>
            </div>
            <div className="bg-gray -mt-10 dark:bg-black-light">
                <div className="text-container max-w-6xl mx-auto pt-20">
                    <p
                        className="leading-loose text-2xl md:text-4xl font-semibold  mx-4"
                        style={{ lineHeight: "3rem" }}
                    >
                        {userData.about.title}. Currently working on{" "}
                        <a
                            className="bg-red-500 rounded-md px-2 py-1"
                            // href={userData.about.currentProjectUrl}
                            href=""
                        >
                            {userData.about.currentProject} ✈️
                        </a>
                    </p>
                </div>
            </div>
            <div className="bg-gray dark:bg-black-light px-4">
                <div className="pt-20 grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto gap-y-20 gap-x-20">
                    {/* Social Buttons */}
                    <div className="inline-flex flex-col">
                        <div>
                            <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                                Contact
                            </h1>
                            <p className="text-lg text-gray-500 mt-4 dark:text-gray-300">
                                For any sort help / enquiry, shoot a{" "}
                                <a
                                    href={`mailto:${userData.email}`}
                                    className="text-primary border-b-2 border-primary dark:border-gray-300 font-bold dark:text-white"
                                >
                                    mail
                                </a>{" "}
                                and I&apos;ll get back. I swear.
                            </p>
                        </div>
                        <div className="mt-8">
                            <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                                Job Opportunities
                            </h1>
                            <p className="text-lg text-gray-500 mt-4 dark:text-gray-300">
                                I&apos;m looking for a job currently, If you see me as a good fit,
                                check my{" "}
                                <a
                                    href={userData.resumeUrl}
                                    target="__blank"
                                    className="text-primary border-b-2 border-primary dark:border-gray-300 font-bold dark:text-white"
                                >
                                    CV
                                </a>{" "}
                                and I&apos;d love to work for you.
                            </p>
                        </div>
                        {/* Social Links */}
                        <h1 className="text-xl font-semibold text-gray-700 mt-8 dark:text-gray-200">
                            Social Links
                        </h1>
                        <div className="mt-4 ml-4">
                            <div className="flex flex-row justify-start items-center">
                                <a
                                    href={userData.socialLinks.twitter}
                                    className="flex flex-row items-center space-x-4 group"
                                >
                                    <div className="my-4">&rarr;</div>
                                    <p className="text-lg text-gray-500 font-mono relative overflow-hidden dark:text-gray-300">
                                        <div className="absolute h-0.5 w-full bg-gray-400 bottom-0 transform -translate-x-24 group-hover:translate-x-0 transition duration-300"></div>
                                        Twitter
                                    </p>
                                </a>
                            </div>
                            <div className="flex flex-row justify-start items-center">
                                <a
                                    href={userData.socialLinks.github}
                                    className="flex flex-row items-center space-x-4 group"
                                >
                                    <div className="my-4">&rarr;</div>
                                    <p className="text-lg text-gray-500 font-mono relative overflow-hidden dark:text-gray-300">
                                        <div className="absolute h-0.5 w-full bg-gray-400 bottom-0 transform -translate-x-24 group-hover:translate-x-0 transition duration-300"></div>
                                        GitHub
                                    </p>
                                </a>
                            </div>
                            <div className="flex flex-row justify-start items-center">
                                <a
                                    href={userData.socialLinks.linkedin}
                                    className="flex flex-row items-center space-x-4 group"
                                >
                                    <div className="my-4">&rarr;</div>
                                    <p className="text-lg text-gray-500 font-mono relative overflow-hidden dark:text-gray-300">
                                        <div className="absolute h-0.5 w-full bg-gray-400 bottom-0 transform -translate-x-24 group-hover:translate-x-0 transition duration-300"></div>
                                        LinkedIn
                                    </p>
                                </a>
                            </div>
                            <div className="flex flex-row justify-start items-center">
                                <a
                                    href={userData.socialLinks.instagram}
                                    className="flex flex-row items-center space-x-4 group"
                                >
                                    <div className="my-4">&rarr;</div>
                                    <p className="text-lg text-gray-500 font-mono relative overflow-hidden dark:text-gray-300">
                                        <div className="absolute h-0.5 w-full bg-gray-400 bottom-0 transform -translate-x-28 group-hover:translate-x-0 transition duration-300"></div>
                                        Instagram
                                    </p>
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* Text area */}
                    <div className="col-span-1 md:col-span-2">
                        {userData.about.description?.map((desc, idx) => (
                            <p
                                key={idx}
                                className="text-xl text-gray-700 mb-4 dark:text-gray-300 "
                            >
                                {desc}
                            </p>
                        ))}

                        <h1 className="bg-red-500 text-3xl rounded-md px-2 py-1 inline-block font-bold text-gray-50">
                            Tech Stack
                        </h1>
                        <div className="flex flex-row flex-wrap mt-8">
                            <Image alt='' width={80} height={80}
                                src='https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png'
                                className='m-4'
                            />
                            <Image alt='' width={80} height={80}
                                src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/java/java.png"
                                className="m-4"
                            />
                            <Image alt='' width={80} height={80}
                                src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/typescript/typescript.png"
                                className="m-4"
                            />
                            <Image alt='' width={80} height={80}
                                src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/html/html.png"
                                className="m-4"
                            />
                            <Image alt='' width={80} height={80}
                                src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/css/css.png"
                                className="m-4"
                            />
                            <Image alt='' width={80} height={80}
                                src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/angular/angular.png"
                                className="m-4"
                            />
                            <Image alt='' width={80} height={80}
                                src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/vue/vue.png"
                                className="m-4"
                            />
                            <Image alt='' width={80} height={80}
                                src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/git/git.png"
                                className="m-4"
                            />
                            <Image alt='' width={80} height={80}
                                src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png"
                                className="m-4"
                            />
                            <Image alt='' width={80} height={80}
                                src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/firebase/firebase.png"
                                className="m-4"
                            />
                            <Image alt='' width={80} height={80}
                                src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/mysql/mysql.png"
                                className="m-4"
                            />
                            <Image alt='' width={80} height={80}
                                src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/mongodb/mongodb.png"
                                className="m-4"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
