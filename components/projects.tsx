import Image from "next/image";
import Link from "next/link";
import userData from "../data/data";

export default function Projects() {
    return (
        <section className="bg-silver dark:bg-blue-dark">
            <div className="h-48 max-w-6xl mx-auto bg-silver dark:bg-blue-dark">
                <h1 className="py-20 text-5xl font-bold text-center md:text-9xl md:text-left">
                    Projects
                </h1>
            </div>
            {/* Grid starts here */}
            <div className="-mt-10 bg-gray dark:bg-black-light">
                <div className="grid max-w-6xl grid-cols-1 gap-8 py-20 pb-40 mx-auto md:grid-cols-2">
                    {userData.projects.map((proj, idx) => (
                        <ProjectCard
                            key={idx}
                            title={proj.title}
                            link={proj.link}
                            imgUrl={proj.imgUrl}
                            number={`${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
// TODO: Image url for thr project card
const ProjectCard = ({ title, link, number, imgUrl }: { title: string, link: string, number: string, imgUrl: string }) => {
    return (
        <Link href={link} className="block w-full shadow-2xl">
            <div className="relative overflow-hidden rounded-md">
                <div className="object-cover h-72">
                    <Image
                        src={imgUrl}
                        fill={true}
                        alt="portfolio"
                        className="object-cover w-full h-full transition ease-out transform hover:scale-125 duration-2000 "
                    />
                </div>
                <h1 className="absolute px-2 text-xl font-bold bg-red-500 rounded-md top-10 left-10 text-gray-50">
                    {title}
                </h1>
                <h1 className="absolute text-xl font-bold bottom-10 left-10 text-gray-50">
                    {number.length === 1 ? "0" + number : number}
                </h1>
            </div>
        </Link>
    );
};
