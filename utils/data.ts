import { postPath } from '@/utils/blog/paths';
import type { CvEntry } from '@/utils/cv';

// Enhanced type definitions for better type safety
export interface Project {
  title: string;
  /**
   * First and last commit month, "MM/YYYY – MM/YYYY", or "– present" while
   * work goes on. The data test checks the form.
   */
  dates: string;
  /** The main tools, shown after the title. */
  stack: string[];
  description: string;
  /** Small thumbnail at the right of the row. Rows without one show none. */
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

export interface About {
  title: string;
  description: string[];
}

/** What a recruiter filters on before reading anything else. */
export interface Availability {
  /** Short label/value pairs. Plain text, so ATS and screen readers get it. */
  facts: { label: string; value: string }[];
}

export interface SocialLinks {
  linkedin: string;
  github: string;
}

export interface UserData {
  githubUsername: string;
  name: string;
  designation: string;
  /** The short profile under the name on home. */
  intro: string;
  avatarUrl: string;
  email: string;
  address: string;
  projects: Project[];
  about: About;
  availability: Availability;
  /**
   * Older work that /experience shows after the CV's jobs, but the CV
   * leaves out. Same shape and date format as the CV's entries.
   */
  earlierWork: CvEntry[];
  /** My master CV PDF, copied in as is. */
  resumeUrl: string;
  socialLinks: SocialLinks;
}

// Static user data - safe for client components
const userData: UserData = {
  githubUsername: 'Jaival',
  name: 'Jaival Saija',
  designation: 'Junior DevOps & Cloud Engineer',
  intro:
    'Junior DevOps & Cloud Engineer. I kept AWS running in production at Maven Infosoft and fixed 50+ incidents in my first six months. Now an M.Sc. student at RPTU Kaiserslautern, building a Kubernetes lab.',
  avatarUrl: '/headshot.webp',
  email: 'saijajaival@gmail.com',
  address: 'Kaiserslautern, Germany',
  // Seven picked by hand, in this order. Everything else is one click away
  // through the GitHub link under the rows.
  projects: [
    {
      title: 'mdgloss',
      dates: '09/2026 – present',
      stack: ['Tauri 2', 'Rust', 'React', 'TypeScript'],
      description:
        'A reader-first markdown app for Windows, macOS and the web. Highlight, comment and bookmark as you read, without the markdown files ever changing. In progress, built with Tauri 2, React and TypeScript.',
      githubUrl: 'https://github.com/Jaival/mdgloss',
      ships:
        'CI checks the frontend (lint, types, tests) and the Rust side (fmt, clippy, tests). A version tag builds macOS and Windows binaries into a draft GitHub release.',
    },
    {
      title: 'jobhunt-agent',
      dates: '09/2026 – present',
      stack: ['Claude Code', 'MCP (Gmail, Indeed)', 'Python'],
      description:
        'An LLM agent for my own job search, run every day as a Claude Code scheduled task. It pulls new ads from job APIs, Indeed and Gmail alerts, scores them against my CV and, on weekdays, drafts a tailored CV and cover letter for the best ones. Its rules treat ad text as untrusted input, so prompt-injection attempts get reported instead of followed, and every claim has to come from my master CV. The Python builder then enforces the rest in code: it refuses drafts with placeholders, letters outside 250-350 words or a CV over two pages. Nothing is ever sent automatically.',
      githubUrl: 'https://github.com/Jaival/jobhunt-agent',
      websiteUrl: postPath('jobhunt-agent-setup'),
      websiteLabel: 'Setup guide',
      ships:
        'Python tools with a pytest suite that builds a sample workspace end to end. Runs on my own machine as a scheduled task.',
    },
    {
      title: 'Kubernetes Learning Lab',
      dates: '10/2026 – present',
      stack: ['kind', 'Helm', 'Prometheus', 'Grafana'],
      description:
        "Where I'm learning Kubernetes, starting from Docker. Fourteen modules on a local three-node kind cluster, from Pods and Gateway API routing to RBAC, Helm, Prometheus, and Argo CD with GitHub Actions, ending in a capstone app deployed through GitOps. I started in October 2026: the course material is in the repo, and my exercise work goes in module by module.",
      githubUrl: 'https://github.com/Jaival/kubernetes-learning-lab',
      ships: 'Nothing ships yet. The capstone will deploy through Argo CD.',
    },
    {
      title: 'react-rough-notation',
      dates: '12/2024 – present',
      stack: ['React', 'TypeScript', 'GitHub Actions', 'npm'],
      description:
        'My maintained fork of the React wrapper for Rough Notation, which draws hand-drawn highlights on a web page. Releases use npm trusted publishing over OIDC, so there is no npm token stored anywhere.',
      githubUrl: 'https://github.com/Jaival/react-rough-notation',
      websiteUrl:
        'https://www.npmjs.com/package/@jaivalsaija/react-rough-notation',
      websiteLabel: 'npm',
      ships:
        'When the version on main changes, GitHub Actions runs the tests, publishes to npm with provenance, then tags the release. CodeQL scans the code.',
    },
    {
      title: 'NextGleis',
      dates: '08/2026 – 10/2026',
      stack: ['Expo', 'React Native', 'TypeScript', 'Node.js on Vercel'],
      description:
        "An Android departure board for German buses and trains, with live delays and platform changes. A small serverless proxy turns Deutsche Bahn's XML into JSON and keeps the API keys off the device. Built with Expo and React Native.",
      githubUrl: 'https://github.com/Jaival/NextGleis',
      ships:
        'CI on every pull request: type checks, lint, tests and npm audit. A merge to main deploys the proxy to Vercel from GitHub Actions and smoke-tests it; a version tag builds the Android app on EAS.',
    },
    {
      title: 'Invoicely',
      dates: '12/2023 – present',
      stack: ['Next.js', 'Postgres (Neon)', 'Drizzle', 'Better Auth', 'Docker'],
      description:
        'An invoicing app for freelancers, in development and built to learn the full stack. So far: Google sign-in, email verification and organizations. Next.js, Postgres on Neon, Drizzle and Better Auth.',
      imgUrl: '/projects/invoicely.png',
      githubUrl: 'https://github.com/Jaival/invoicely',
      websiteUrl: 'https://invoicely-roan.vercel.app',
      ships:
        'CI runs lint, types, unit and database tests, checks the migrations match the schema, then runs Playwright end-to-end tests. Vercel migrates the matching Neon branch before each build: production for main, a shared dev branch for previews. It also runs locally with Docker Compose: a 453 MB multi-stage, non-root image, with migrations run before the app starts.',
    },
    {
      title: 'Taskly',
      dates: '02/2021 – 10/2026',
      stack: ['Flutter', 'Riverpod', 'Firebase'],
      description:
        'A task and project manager for small teams. Boards, shared projects with editor and viewer roles, repeating tasks, and offline support, running in the browser and on Android. Started as my 2020 internship project at Apexa and rewritten on Flutter, Riverpod and Firebase.',
      imgUrl: '/projects/taskly.webp',
      githubUrl: 'https://github.com/Jaival/taskly-flutter',
      websiteUrl: 'https://jaival.github.io/taskly-flutter/',
      ships:
        'release-please opens the release PRs. A release builds Android, iOS, macOS, Windows and web, each file with a signed build-provenance attestation. Main deploys the web app to GitHub Pages once the tests and an integration run pass.',
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
    // Worded like the CV (utils/cv.ts). Home shows these as status rows.
    facts: [
      {
        label: 'Looking for',
        value:
          'Working student or junior role · DevOps, cloud, platform · anywhere in Germany',
      },
      { label: 'Hours', value: '20 h/week in semester · up to 40 in breaks' },
      { label: 'Start', value: 'Available immediately' },
      {
        label: 'Permit',
        value: '§16b AufenthG student permit, valid until 07/2028',
      },
      {
        label: 'Languages',
        value: 'English C1 · German A1 (Goethe certificate), learning A2',
      },
    ],
  },
  earlierWork: [
    {
      title: 'Mobile App Developer (In-house)',
      org: 'Institute of Computer Technology, Ganpat University, India',
      dates: '05/2019 – 06/2019',
      context:
        'A scheduling app so professors and students could book meetings without the email back and forth.',
      bullets: [
        'Built it with a 4-person student team, from the interface to a test phase with professors.',
      ],
    },
  ],
  resumeUrl: '/cv.pdf',
  socialLinks: {
    linkedin: 'https://www.linkedin.com/in/jaivalsaija/',
    github: 'https://github.com/Jaival',
  },
};

export default userData;
