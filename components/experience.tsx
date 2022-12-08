import userData from "../data/data";

export default function Experience() {
    return (
        <section>
            <div className="max-w-6xl mx-auto h-48 bg-silver dark:bg-blue-dark">
                <h1 className=" text-5xl md:text-9xl font-bold py-20 text-center md:text-left">
                    Experience
                </h1>
            </div>
            <div className="bg-gray dark:bg-black-light -mt-10">
                <div className="grid grid-cols-1 dark:bg-black-light max-w-xl mx-auto pt-20">
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
                                <div className="divider-container flex flex-col items-center -mt-2">
                                    <div className="w-4 h-4 bg-green-dark rounded-full relative z-10">
                                        <div className="w-4 h-4 bg-green-dark rounded-full relative z-10 animate-ping"></div>
                                    </div>
                                    <div className="w-1 h-24 bg-gray-dark dark:bg-gray-dark rounded-full -mt-2"></div>
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
        <div className="relative experience-card border-2 border-purple-dark dark:border-blue-gray p-4 rounded-md shadow-xl bg-card-background dark:bg-purple-dark z-10 mx-4s">

            <h1 className="absolute -top-10 md:-left-10 md:-top-10 text-4xl text-gray-light font-bold dark:text-blue-gray">
                {year}
            </h1>
            <h1 className="font-semibold text-xl text-blue-gray">{title}</h1>
            <a href=""
                // <a href={companyLink} 
                className="text-blue-green dark:text-gray">
                {company}
            </a>
            <p className="text-blue-green dark:text-gray my-2">{desc}</p>
        </div>
    );
};
