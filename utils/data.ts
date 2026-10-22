// Enhanced type definitions for better type safety
export interface Project {
  title: string;
  description: string;
  /** Preview image. Cards without one fall back to a title block. */
  imgUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;
  /** Button text for websiteUrl, e.g. 'Marketplace'. Defaults to 'Live site'. */
  websiteLabel?: string;
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
      title: 'jobhunt-agent',
      description:
        'A daily job-search routine for Claude Code. Each morning it pulls new ads from job APIs, Indeed and Gmail alerts, scores them against my CV and, on weekdays, drafts a tailored CV and cover letter for the best ones. Python tools keep a ledger of every screened job, reject drafts with placeholders or over-long letters, and keep an Excel tracker. Nothing is ever sent automatically.',
      githubUrl: 'https://github.com/Jaival/jobhunt-agent',
      websiteUrl: '/blog/jobhunt-agent-setup',
      websiteLabel: 'Setup guide',
    },
    {
      title: 'mdgloss',
      description:
        'A reader-first markdown app for Windows, macOS and the web. Highlight, comment and bookmark as you read, without the markdown files ever changing. In progress, built with Tauri 2, React and TypeScript.',
      githubUrl: 'https://github.com/Jaival/mdgloss',
    },
    {
      title: 'Kubernetes Learning Lab',
      description:
        "Where I'm learning Kubernetes, starting from Docker. Fourteen modules on a local three-node kind cluster, from Pods and Gateway API routing to RBAC, Helm, Prometheus, and Argo CD with GitHub Actions. It ends in a capstone app deployed through GitOps. Just started, with my notes and exercise work committed module by module.",
      githubUrl: 'https://github.com/Jaival/kubernetes-learning-lab',
    },
    {
      title: 'NextGleis',
      description:
        "An Android departure board for German buses and trains, with live delays and platform changes. A small serverless proxy turns Deutsche Bahn's XML into JSON and keeps the API keys off the device. Built with Expo and React Native.",
      githubUrl: 'https://github.com/Jaival/NextGleis',
    },
    {
      title: 'react-rough-notation',
      description:
        'My maintained fork of the React wrapper for Rough Notation, the hand-drawn highlights on this page. A GitHub Actions pipeline publishes to npm whenever the version on main changes, then tags the release. It uses npm trusted publishing over OIDC, so there is no npm token to store and every build ships with provenance.',
      githubUrl: 'https://github.com/Jaival/react-rough-notation',
      websiteUrl:
        'https://www.npmjs.com/package/@jaivalsaija/react-rough-notation',
      websiteLabel: 'npm',
    },
    {
      title: 'NextToBinge',
      description:
        "One place to find your next movie, drama or anime. Search all three at once, browse what's trending, and keep watchlists with each title marked plan to watch, watching or watched. Next.js 16, Supabase, Drizzle and Clerk.",
      imgUrl: '/projects/nexttobinge.png',
      githubUrl: 'https://github.com/Jaival/nexttobinge',
      websiteUrl: 'https://nexttobinge.vercel.app',
    },
    {
      title: 'Jigna Saija Portfolio',
      description:
        'A portfolio site for architect and interior designer Jigna Saija, with more than twenty of her architecture and interior projects. Next.js, Tailwind CSS and Motion.',
      imgUrl: '/projects/jigna-saija-portfolio.png',
      githubUrl: 'https://github.com/Jaival/jigna-saija',
      websiteUrl: 'https://jignasaija.vercel.app',
    },
    {
      title: 'Taskly',
      description:
        'A task and project manager for small teams. Boards, shared projects with editor and viewer roles, repeating tasks, and offline support, running in the browser and on Android. Started as my 2020 internship project at Apexa and rewritten on Flutter, Riverpod and Firebase.',
      imgUrl: '/projects/taskly.webp',
      githubUrl: 'https://github.com/Jaival/taskly-flutter',
      websiteUrl: 'https://jaival.github.io/taskly-flutter/',
    },
    {
      title: 'Flat',
      description:
        'A dark VS Code theme in flat, solid colors: a deep teal editor, yellow text and a lime status bar.',
      imgUrl: '/projects/flat-theme.png',
      githubUrl: 'https://github.com/Jaival/Flat-Theme',
      websiteUrl:
        'https://marketplace.visualstudio.com/items?itemName=JaivalSaija.flat',
      websiteLabel: 'Marketplace',
    },
    {
      title: "Hacker's Hideout",
      description:
        "A dark VS Code theme with a near-black background, lime-green text and neon accents. It covers the whole workbench, down to the terminal's 16 ANSI colors.",
      imgUrl: '/projects/hacker-hideout.png',
      githubUrl: 'https://github.com/Jaival/HackersHideout',
      websiteUrl:
        'https://marketplace.visualstudio.com/items?itemName=JaivalSaija.hacker-hideout',
      websiteLabel: 'Marketplace',
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
      companyLink: 'https://cs.rptu.de/en/',
      desc: 'Distributed systems and network security. Close enough to the infrastructure work I was already doing that the theory fills in gaps I used to work around.',
    },
    {
      id: 2,
      title: 'Junior DevOps Engineer',
      company: 'Maven Infosoft Pvt. Ltd.',
      year: 'Jun 2021 - Mar 2022',
      companyLink: 'https://in.linkedin.com/company/maven-infosoft-pvt-ltd',
      desc: 'I ran the AWS infrastructure for a .NET CMS product across dev, stage and production. Alerts came to me first: around 50 incidents in the first six months, plus the post-mortems after the bad ones. I wrote the deployment runbooks, set up monitoring for CPU spikes and memory leaks, and handled access control.',
    },
    {
      id: 3,
      title: 'B.Tech Computer Science & Engineering',
      company: 'Ganpat University | Institute of Computer Technology',
      year: 'Aug 2017 - May 2021',
      companyLink: 'https://ict.guni.ac.in/',
      desc: 'Specialized in cloud-based applications, which was an unusual track to pick at the time. CGPA 8.67, top 10% of the class. It meant I was writing serverless functions and setting up cloud networking while it was still coursework.',
    },
    {
      id: 4,
      title: 'Junior Developer (Intern)',
      company: 'Apexa Information System Pvt. Ltd.',
      year: 'Jan - Jun 2020',
      companyLink: 'https://apexa.in/',
      desc: 'Built a task management app in Flutter for iOS and Android, with Firebase behind it for real-time sync. I designed the data structure and deployed it to Firebase Hosting, then fixed what the senior developers marked up.',
    },
    {
      id: 5,
      title: 'Mobile App Developer (In-house)',
      company: 'Ganpat University | Institute of Computer Technology',
      year: 'May - Jun 2019',
      companyLink: 'https://ict.guni.ac.in/',
      desc: 'A scheduling app so professors and students could book meetings without the email back and forth. I did the whole thing, from the interface to testing it with students on campus.',
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
