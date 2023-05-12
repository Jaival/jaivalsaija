import Link from "next/link";
import userData from "../data/data";

export default function Experience() {
    return (
        <section>
            <div className="h-48 max-w-6xl mx-auto bg-silver dark:bg-blue-dark">
                <h1 className="py-20 text-5xl font-bold text-center md:text-9xl md:text-left">
                    Experience
                </h1>
            </div>
            <div className="-mt-10 bg-gray dark:bg-black-light">
                <div className="grid max-w-xl grid-cols-1 pt-20 mx-auto dark:bg-black-light">
                    {/* Experience card */}
                    {userData.experience.map((exp, idx) => (
                        <>
                            <ExperienceCard
                                key={idx}
                                title={exp.title}
                                desc={exp.desc}
                                year={exp.year}
                                company={exp.company}
                            // companyLink={exp.companyLink}
                            />
                            {/* REFACTOR: Warning: Each child in a list should have a unique "key" prop. */}
                            {idx === userData.experience.length - 1 ? null : (
                                <div className="flex flex-col items-center -mt-2 divider-container">
                                    <div className="relative z-10 w-4 h-4 rounded-full bg-green-dark">
                                        <div className="relative z-10 w-4 h-4 rounded-full bg-green-dark animate-ping"></div>
                                    </div>
                                    <div className="w-1 h-24 -mt-2 rounded-full bg-gray-dark dark:bg-gray-dark"></div>
                                </div>
                            )}
                        </>
                    ))}
                </div>
            </div>
        </section>
    );
}

// TODO: Add company link to experience card
const ExperienceCard = ({ title, desc, year, company }: { title: string, desc: string, year: string, company: string }) => {
    return (
        <div className="relative z-10 p-4 border-2 rounded-md shadow-xl experience-card border-purple-dark dark:border-blue-gray bg-card-background dark:bg-purple-dark mx-4s">

            <h1 className="absolute text-4xl font-bold -top-10 md:-left-10 md:-top-10 text-gray-light dark:text-blue-gray">
                {year}
            </h1>
            <h1 className="text-xl font-semibold text-blue-gray">{title}</h1>
            <Link href=""
                // <Link href={companyLink} 
                className="text-blue-green dark:text-gray">
                {company}
            </Link>
            <p className="my-2 text-blue-green dark:text-gray">{desc}</p>
        </div>
    );
};
