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
  /**
   * How the project gets built, tested and released. Only what the repo's
   * workflows actually do: a recruiter's engineer will click through.
   */
  ships?: string;
}

export interface Experience {
  id: number;
  title: string;
  /** Left out for a gap entry, which has no employer. */
  company?: string;
  year: string;
  companyLink?: string;
  desc: string;
  /** Results with numbers, shown as a list under desc. */
  highlights?: string[];
  /** A dated line that explains time between jobs, styled as a note. */
  gap?: boolean;
}

export interface About {
  title: string;
  description: string[];
}

/** What a recruiter filters on before reading anything else. */
export interface Availability {
  /** One line: the role I'm looking for. */
  role: string;
  /** Short label/value pairs. Plain text, so ATS and screen readers get it. */
  facts: { label: string; value: string }[];
}

export interface SkillGroup {
  group: string;
  items: string[];
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
  availability: Availability;
  /** Mirrors the Technical Proficiency block on the CV. */
  skills: SkillGroup[];
  /** Started, not yet something I'd claim as a skill. */
  learning: string[];
  /** Work only, newest first. Degrees live in education. */
  experience: Experience[];
  education: Experience[];
  /** Self-hosted, phone number removed: the repo and the file are public. */
  resumeUrl: string;
  socialLinks: SocialLinks;
}

// Static user data - safe for client components
const userData: UserData = {
  githubUsername: 'Jaival',
  name: 'Jaival Saija',
  designation: 'DevOps Engineer · AI Automation',
  avatarUrl: '/headshot.webp',
  email: 'saijajaival@gmail.com',
  address: 'Kaiserslautern, Germany',
  // Ordered by how much each one says about DevOps work: the two with real
  // release pipelines first, then the Kubernetes lab (the direction I'm
  // heading, labelled as learning), then apps with CI, themes last.
  projects: [
    {
      title: 'jobhunt-agent',
      description:
        'An LLM agent for my own job search, run every day as a Claude Code scheduled task. It pulls new ads from job APIs, Indeed and Gmail alerts, scores them against my CV and, on weekdays, drafts a tailored CV and cover letter for the best ones. Its rules treat ad text as untrusted input, so prompt-injection attempts get reported instead of followed, and every claim has to come from my master CV. The Python builder then enforces the rest in code: it refuses drafts with placeholders, letters outside 250-350 words or a CV over two pages. Nothing is ever sent automatically.',
      githubUrl: 'https://github.com/Jaival/jobhunt-agent',
      websiteUrl: '/blog/jobhunt-agent-setup',
      websiteLabel: 'Setup guide',
      ships:
        'Python tools with a pytest suite that builds a sample workspace end to end. Runs on my own machine as a scheduled task.',
    },
    {
      title: 'react-rough-notation',
      description:
        'My maintained fork of the React wrapper for Rough Notation, the hand-drawn highlights on this page. Releases use npm trusted publishing over OIDC, so there is no npm token stored anywhere.',
      githubUrl: 'https://github.com/Jaival/react-rough-notation',
      websiteUrl:
        'https://www.npmjs.com/package/@jaivalsaija/react-rough-notation',
      websiteLabel: 'npm',
      ships:
        'When the version on main changes, GitHub Actions runs the tests, publishes to npm with provenance, then tags the release. CodeQL scans the code.',
    },
    {
      title: 'Kubernetes Learning Lab',
      description:
        "Where I'm learning Kubernetes, starting from Docker. Fourteen modules on a local three-node kind cluster, from Pods and Gateway API routing to RBAC, Helm, Prometheus, and Argo CD with GitHub Actions, ending in a capstone app deployed through GitOps. I started in October 2026: the course material is in the repo, and my exercise work goes in module by module.",
      githubUrl: 'https://github.com/Jaival/kubernetes-learning-lab',
      ships: 'Nothing ships yet. The capstone will deploy through Argo CD.',
    },
    {
      title: 'NextGleis',
      description:
        "An Android departure board for German buses and trains, with live delays and platform changes. A small serverless proxy turns Deutsche Bahn's XML into JSON and keeps the API keys off the device. Built with Expo and React Native.",
      githubUrl: 'https://github.com/Jaival/NextGleis',
      ships:
        'CI on every pull request: type checks, lint, tests and npm audit. A merge to main deploys the proxy to Vercel from GitHub Actions and smoke-tests it; a version tag builds the Android app on EAS.',
    },
    {
      title: 'Taskly',
      description:
        'A task and project manager for small teams. Boards, shared projects with editor and viewer roles, repeating tasks, and offline support, running in the browser and on Android. Started as my 2020 internship project at Apexa and rewritten on Flutter, Riverpod and Firebase.',
      imgUrl: '/projects/taskly.webp',
      githubUrl: 'https://github.com/Jaival/taskly-flutter',
      websiteUrl: 'https://jaival.github.io/taskly-flutter/',
      ships:
        'release-please opens the release PRs. A release builds Android, iOS, macOS, Windows and web, each file with a signed build-provenance attestation. Main deploys the web app to GitHub Pages once the tests and an integration run pass.',
    },
    {
      title: 'mdgloss',
      description:
        'A reader-first markdown app for Windows, macOS and the web. Highlight, comment and bookmark as you read, without the markdown files ever changing. In progress, built with Tauri 2, React and TypeScript.',
      githubUrl: 'https://github.com/Jaival/mdgloss',
      ships:
        'CI checks the frontend (lint, types, tests) and the Rust side (fmt, clippy, tests). A version tag builds macOS and Windows binaries into a draft GitHub release.',
    },
    {
      title: 'Invoicely',
      description:
        'An invoicing app for freelancers, in development and built to learn the full stack. So far: Google sign-in, email verification and organizations. Next.js, Postgres on Neon, Drizzle and Better Auth.',
      githubUrl: 'https://github.com/Jaival/invoicely',
      websiteUrl: 'https://invoicely-roan.vercel.app',
      ships:
        'CI runs lint, types, unit and database tests, checks the migrations match the schema, then runs Playwright end-to-end tests. Vercel migrates the matching Neon branch before each build: production for main, a shared dev branch for previews.',
    },
    {
      title: 'NextToBinge',
      description:
        "One place to find your next movie, drama or anime. Search all three at once, browse what's trending, and keep watchlists with each title marked plan to watch, watching or watched. Next.js 16, Supabase, Drizzle and Clerk.",
      imgUrl: '/projects/nexttobinge.png',
      githubUrl: 'https://github.com/Jaival/nexttobinge',
      websiteUrl: 'https://nexttobinge.vercel.app',
      ships:
        'CI on every pull request: lint, types, tests and a build. Vercel deploys a preview per branch and production from main.',
    },
    {
      title: 'Jigna Saija Portfolio',
      description:
        'A portfolio site for architect and interior designer Jigna Saija, with more than twenty of her architecture and interior projects. Next.js, Tailwind CSS and Motion.',
      imgUrl: '/projects/jigna-saija-portfolio.png',
      githubUrl: 'https://github.com/Jaival/jigna-saija',
      websiteUrl: 'https://jignasaija.vercel.app',
      ships: 'Vercel deploys a preview per branch and production from main.',
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
      ships: 'Published to the VS Code Marketplace.',
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
      ships: 'Published to the VS Code Marketplace.',
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
      "Now I'm at RPTU in Kaiserslautern for my Master's, on distributed systems and network security. Next to it I build small apps with CI on every change, and most of what I build now involves AI tools: jobhunt-agent runs my job search every day, inside guardrails I wrote. I've also started a Kubernetes course on a local kind cluster, which is where Helm, Prometheus and Argo CD come in.",
    ],
  },
  availability: {
    role: "I'm looking for a working student or junior role in DevOps, cloud or AI automation, anywhere in Germany.",
    facts: [
      { label: 'Hours', value: '20 h/week, 40 in semester breaks' },
      { label: 'Start', value: 'As soon as possible' },
      { label: 'Graduation', value: 'M.Sc. expected autumn 2027' },
      {
        label: 'Permit',
        value: '§16b student permit, working student OK',
      },
      { label: 'Languages', value: 'English C1, German A1' },
    ],
  },
  skills: [
    {
      group: 'Cloud',
      items: [
        'AWS (EC2, S3, IAM, VPC, CloudWatch)',
        'Google Cloud',
        'Firebase',
      ],
    },
    {
      group: 'CI/CD and DevOps',
      items: [
        'GitHub Actions',
        'Docker',
        'Git',
        'Linux administration',
        'Terraform (basics)',
      ],
    },
    {
      group: 'Security',
      items: [
        'IAM least privilege',
        'VPC network segmentation',
        'OIDC trusted publishing',
      ],
    },
    {
      group: 'Code',
      items: ['Python', 'Bash', 'TypeScript', 'JavaScript', 'Flutter (Dart)'],
    },
    { group: 'AI', items: ['Claude', 'Claude Code', 'MCP'] },
    { group: 'Data', items: ['PostgreSQL', 'MySQL', 'Firestore'] },
  ],
  learning: ['Kubernetes', 'Helm', 'Prometheus', 'Grafana'],
  experience: [
    {
      id: 1,
      title: "Master's preparation and move to Germany",
      year: '2022 – 2023',
      desc: "After Maven I prepared my applications for a Master's and moved from India to Germany to start at RPTU.",
      gap: true,
    },
    {
      id: 2,
      title: 'Junior DevOps Engineer',
      company: 'Maven Infosoft Pvt. Ltd., Ahmedabad',
      year: 'Jun 2021 – Mar 2022',
      companyLink: 'https://in.linkedin.com/company/maven-infosoft-pvt-ltd',
      desc: 'I ran the AWS infrastructure for a .NET CMS product across dev, stage and production, and alerts came to me first.',
      highlights: [
        'Resolved 50+ production incidents in my first six months, tracing alerts through logs and fixing the networking faults behind most of them.',
        'Built the GitHub Actions pipelines for testing, UAT and dev deployments of 3 products.',
        'Secured dev, stage and production (EC2, S3, VPC) for a 7-person team with least-privilege IAM policies and a segmented VPC.',
        'Caught 8–10 CPU and memory problems before customers noticed, with CloudWatch alarms.',
        'Cut new-developer onboarding by 30% and maintenance time by 20% by writing the deployment runbooks and rewriting the update SOPs.',
        'Led monthly root-cause post-mortems with the developers, 4–6 incidents each, and trained 7 teammates in Docker as we moved the pipeline to containers.',
      ],
    },
    {
      id: 3,
      title: 'Junior Developer (Intern)',
      company: 'Apexa Information System Pvt. Ltd., Ahmedabad',
      year: 'Jan 2020 – Jun 2020',
      companyLink: 'https://apexa.in/',
      desc: 'Built a task management app in Flutter for iOS and Android, with Firebase behind it for real-time sync. I designed the data structure and deployed it to Firebase Hosting, then fixed the 5–6 bugs and UI issues the senior developers raised in review.',
      highlights: [
        'Later rebuilt it as the open-source Taskly, with Riverpod, offline support, and GitHub Actions that test it and build releases for every platform.',
      ],
    },
    {
      id: 4,
      title: 'Mobile App Developer (In-house)',
      company: 'Ganpat University | Institute of Computer Technology',
      year: 'May 2019 – Jun 2019',
      companyLink: 'https://ict.guni.ac.in/',
      desc: 'A scheduling app so professors and students could book meetings without the email back and forth. I built it with a 4-person student team, from the interface to a test phase with professors.',
    },
  ],
  education: [
    {
      id: 1,
      title: 'M.Sc. Computer Science',
      company: 'RPTU Kaiserslautern',
      year: '2023 – present',
      companyLink: 'https://cs.rptu.de/en/',
      desc: 'Distributed systems and network security. Close enough to the infrastructure work I was already doing that the theory fills in gaps I used to work around.',
    },
    {
      id: 2,
      title: 'B.Tech Computer Science & Engineering',
      company: 'Ganpat University | Institute of Computer Technology',
      year: 'Aug 2017 – May 2021',
      companyLink: 'https://ict.guni.ac.in/',
      desc: 'Specialized in cloud-based applications, which was an unusual track to pick at the time. CGPA 8.67, top 10% of the class. It meant I was writing serverless functions and setting up cloud networking while it was still coursework.',
    },
  ],
  resumeUrl: '/cv.pdf',
  socialLinks: {
    instagram: 'https://www.instagram.com/jaivalsaija/',
    twitter: 'https://x.com/Jaival469',
    linkedin: 'https://www.linkedin.com/in/jaivalsaija/',
    github: 'https://github.com/Jaival',
  },
};

export default userData;
