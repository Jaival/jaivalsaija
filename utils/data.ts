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
  socialLinks: SocialLinks;
}

// Static user data - safe for client components
const userData: UserData = {
  githubUsername: 'Jaival',
  name: 'Jaival Saija',
  designation: 'Cloud Engineer',
  avatarUrl: '/avatar.JPG',
  email: 'saijajaival@gmail.com',
  address: 'Ahmedabad, Gujarat, India',
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
      'I am a DevOps Engineer focused on optimizing cloud infrastructure and building scalable, automated systems for reliable products and web applications.',
    description: [
      "I've been interested in computer science since I was 15 years old, first is was because of the games and I dreamed of becoming a game developer or something related to computers. After few year of playing games and studying I got into a specialized bachelor's program in computer science for cloud computing.",
      'It was like a new world to open to exploration and [something] . As I was learning about cloud computing, how it works, why it works, how it came to existence; I was falling in love with it more and more.',
      "During my bachelor's program, I worked with many technologies like AWS, Azure, Google Cloud, Firebase, Flutter, Android and many more.",
      'The most exposure I got to cloud computing was through the projects in the last year of my college. I was a part of a team and I was responsible for the cloud operations such as creating the infrastructure, maintaining it, CI/CD, as well as selecting a DB for the application that was being developed.',
    ],
    currentProject: 'AWS with Projects',
    currentProjectUrl: 'https://github.com/Jaival/aws-projects',
  },
  experience: [
    {
      id: 1,
      title: 'Masters in Computer Science',
      company: 'RPTU',
      year: 'Currently',
      companyLink: '#',
      desc: 'I am pursuing my master in CS at RPTU.',
    },
    {
      id: 2,
      title: 'Junior DevOps Engineer',
      company: 'Maven Infosoft Pvt. Ltd.',
      year: '2022',
      companyLink: '#',
      desc: 'During my time there I handled their cloud infrastructure on AWS for their flagship dotnet product. My work included to monitor, upgrade the existing configuration, and help the developer team to push updates to the system.',
    },
    {
      id: 3,
      title: 'Graduation',
      company: 'Ganpat University | Institute of Computer Technology',
      year: '2021',
      companyLink: '#',
      desc: 'Major in Computer Science and Engineering with specialization in Cloud Based Application.',
    },
    {
      id: 4,
      title: 'Industry Internship ',
      company: 'Apexa Information System Pvt. Ltd.',
      year: '2019',
      companyLink: '#',
      desc: 'During my internship I worked for an application for task management for the company. The application was made in flutter and was deployed on firebase.',
    },
    {
      id: 5,
      title: 'In-House Internship',
      company: 'Ganpat University | Institute of Computer Technology',
      year: '2019',
      companyLink: '#',
      desc: 'During my internship I was given the task to create a mobile application for managing meeting between professor and student.',
    },
    {
      id: 6,
      title: 'Social Internship',
      company: 'Karma Foundation',
      year: '2018',
      companyLink: '#',
      desc: 'Our responsibility was to conduct survey about the "Pay and Use Toilet" under the Right to Cleanliness initiative of Karma Foundation',
    },
  ],
  resumeUrl:
    'https://drive.google.com/file/d/1-SmecqmoMsASfEkmqytU_YXc2M3JO5aa/view?usp=sharing',
  socialLinks: {
    instagram: 'https://www.instagram.com/jaivalsaija/',
    twitter: 'https://x.com/Jaival469',
    linkedin: 'https://www.linkedin.com/in/jaivalsaija/',
    github: 'https://github.com/Jaival',
  },
};

export default userData;
