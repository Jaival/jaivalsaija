// Enhanced type definitions for better type safety
export interface Project {
  title: string;
  link: string;
  imgUrl: string;
  description?: string;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  year: string;
  companyLink: string;
  desc: string;
}

export interface About {
  title: string;
  description: string[];
  currentProject: string;
  currentProjectUrl: string;
}

export interface SocialLinks {
  instagram: string;
  twitter: string;
  linkedin: string;
  github: string;
}

export interface UserData {
  githubUsername: string;
  name: string;
  designation: string;
  avatarUrl: string;
  email: string;
  address: string;
  projects: Project[];
  about: About;
  experience: Experience[];
  resumeUrl: string;
  coverLetterUrl: string;
  socialLinks: SocialLinks;
}

// Static user data - safe for client components
const userData: UserData = {
  githubUsername: 'Jaival',
  name: 'Jaival Saija',
  designation: 'DevOps Engineer',
  avatarUrl: '/avatar.JPG',
  email: 'saijajaival@gmail.com',
  address: 'Kaiserslautern, Germany',
  projects: [
    {
      title: 'Jigna Saija Portfolio',
      link: 'https://jignasaija.vercel.app/',
      imgUrl: '/projects/jigna-saija-portfolio.png',
      description:
        'A modern portfolio website built with Next.js showcasing design and development work.',
    },
    {
      title: 'Portfolio',
      link: 'https://github.com/Jaival',
      imgUrl: '/projects/portfolio.png',
      description:
        'Personal portfolio website showcasing projects and experience.',
    },
    {
      title: 'Taskly',
      link: 'https://taskly-dc4e2.web.app/',
      imgUrl: '/projects/taskly.png',
      description:
        'A task management application built with Flutter and Firebase.',
    },
    {
      title: 'VS Code Flat Theme',
      link: 'https://marketplace.visualstudio.com/items?itemName=JaivalSaija.flat',
      imgUrl: '/projects/flat-theme.png',
      description: 'A clean and minimalist theme for Visual Studio Code.',
    },
  ],
  about: {
    title:
      "I'm a DevOps engineer. I like deployments that are boring, and servers that stay up without anyone watching them.",
    description: [
      "I got into computers at 15, mostly because of games. For a while the plan was to become a game developer. That didn't happen, but the interest stayed, and I ended up in a bachelor's program at Ganpat University that specialized in cloud-based applications.",
      'Cloud is the part that held me. I wanted to know how it worked underneath and what actually happens when something goes down. I finished with a CGPA of 8.67, in the top 10% of my class, and by the final year I was the one on my project team handling the infrastructure, the CI/CD, and the database choice.',
      'My first job was at Maven Infosoft, running AWS for a .NET CMS product across dev, stage and production. I was usually the only infrastructure person there, so alerts came to me first. About 50 incidents in my first six months, most of them solved by reading logs and untangling networking. After the bad ones we sat down with the developers and worked out the root cause, so the same bug would not come back a month later.',
      "I also wrote the deployment runbooks, which hadn't existed before. Onboarding a new developer got roughly 30% faster after that, and cleaning up the update SOPs cut about 20% off our maintenance time.",
      "Now I'm at RPTU in Kaiserslautern for my Masters, on distributed systems and network security. On the side I'm working through AWS projects: IAM least-privilege policies, VPC segmentation, and getting security checks into my GitHub Actions pipelines before anything ships. Service Control Policies are next.",
    ],
    currentProject: 'AWS with Projects',
    currentProjectUrl: 'https://github.com/Jaival/aws-projects',
  },
  experience: [
    {
      id: 1,
      title: 'M.Sc. Computer Science',
      company: 'RPTU Kaiserslautern',
      year: '2023 - Now',
      companyLink: '#',
      desc: 'Distributed systems and network security. Close enough to the infrastructure work I was already doing that the theory fills in gaps I used to work around.',
    },
    {
      id: 2,
      title: 'Junior DevOps Engineer',
      company: 'Maven Infosoft Pvt. Ltd.',
      year: 'Jun 2021 - Mar 2022',
      companyLink: '#',
      desc: 'I ran the AWS infrastructure for a .NET CMS product across dev, stage and production. Alerts came to me first: around 50 incidents in the first six months, plus the post-mortems after the bad ones. I wrote the deployment runbooks, set up monitoring for CPU spikes and memory leaks, and handled access control.',
    },
    {
      id: 3,
      title: 'B.Tech Computer Science & Engineering',
      company: 'Ganpat University | Institute of Computer Technology',
      year: 'Aug 2017 - May 2021',
      companyLink: '#',
      desc: 'Specialized in cloud-based applications, which was an unusual track to pick at the time. CGPA 8.67, top 10% of the class. It meant I was writing serverless functions and setting up cloud networking while it was still coursework.',
    },
    {
      id: 4,
      title: 'Junior Developer (Intern)',
      company: 'Apexa Information System Pvt. Ltd.',
      year: 'Jan - Jun 2020',
      companyLink: '#',
      desc: 'Built a task management app in Flutter for iOS and Android, with Firebase behind it for real-time sync. I designed the data structure and deployed it to Firebase Hosting, then fixed what the senior developers marked up.',
    },
    {
      id: 5,
      title: 'Mobile App Developer (In-house)',
      company: 'Ganpat University | Institute of Computer Technology',
      year: 'May - Jun 2019',
      companyLink: '#',
      desc: 'A scheduling app so professors and students could book meetings without the email back and forth. I did the whole thing, from the interface to testing it with students on campus.',
    },
    {
      id: 6,
      title: 'Social Internship',
      company: 'Karma Foundation',
      year: '2018',
      companyLink: '#',
      desc: 'We surveyed the "Pay and Use Toilet" program under the Karma Foundation Right to Cleanliness initiative.',
    },
  ],
  resumeUrl:
    'https://drive.google.com/file/d/1FTAVOxPSRb_0cRQaYSl-V2NUo_K41Dtn/view?usp=sharing',
  coverLetterUrl:
    'https://drive.google.com/file/d/1ImeVzPK66tjdttiXjG4JUWiP3hPMOqlP/view?usp=sharing',
  socialLinks: {
    instagram: 'https://www.instagram.com/jaivalsaija/',
    twitter: 'https://x.com/Jaival469',
    linkedin: 'https://www.linkedin.com/in/jaivalsaija/',
    github: 'https://github.com/Jaival',
  },
};

export default userData;
