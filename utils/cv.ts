// The CV, as data. app/cv shows it as a web page and `bun run cv:pdf`
// renders it to public/cv.pdf: edit here, then regenerate the PDF.
// `**text**` marks bold in any string below.

export interface CvLink {
  label: string;
  href: string;
}

export interface CvProject {
  name: string;
  tagline: string;
  stack: string[];
  link: CvLink;
  year: string;
  bullets: string[];
}

export interface CvEntry {
  org: string;
  place?: string;
  role?: string;
  dates: string;
  bullets: string[];
}

export interface CvSkill {
  title: string;
  points: string[];
}

export interface CvLanguage {
  name: string;
  /** Sets the bar on /cv. */
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Native';
  text: string;
}

export interface CvGroup {
  label: string;
  items: string[];
}

export interface CvNote {
  title: string;
  text: string;
}

export interface Cv {
  name: string;
  headline: string;
  email: string;
  location: string;
  links: CvLink[];
  nationality: string;
  /** Phone and street address stay off: the file is public. */
  permit: string;
  photo: string;
  projects: CvProject[];
  experience: CvEntry[];
  education: CvEntry[];
  certifications: string[];
  skills: CvSkill[];
  leadership: CvNote[];
  languages: CvLanguage[];
  proficiency: CvGroup[];
}

export const cv: Cv = {
  name: 'Jaival Saija',
  headline:
    'M.Sc. Computer Science Student | DevOps, Cloud & AI: AWS, CI/CD, Docker',
  email: 'saijajaival@gmail.com',
  location: 'Kaiserslautern, Germany',
  links: [
    { label: 'jaivalsaija.vercel.app', href: 'https://jaivalsaija.vercel.app' },
    { label: 'github.com/Jaival', href: 'https://github.com/Jaival' },
    {
      label: 'linkedin.com/in/jaivalsaija',
      href: 'https://www.linkedin.com/in/jaivalsaija',
    },
  ],
  nationality: 'Indian',
  permit:
    'Student residence permit (§16b AufenthG), eligible for working student jobs (20 h/week)',
  /** In public/. A JPEG, because react-pdf can't read WebP. */
  photo: '/cv-photo.jpg',
  projects: [
    {
      name: 'Job-Hunt Agent',
      tagline: 'automated job search with Claude Code',
      stack: ['Claude Code', 'MCP (Gmail, Indeed)', 'Python'],
      link: {
        label: 'github.com/Jaival/jobhunt-agent',
        href: 'https://github.com/Jaival/jobhunt-agent',
      },
      year: '2026',
      bullets: [
        'A daily agent pulls ads from job APIs and Gmail, scores them against my CV and drafts tailored applications for review; Python tools keep a job ledger and block unfinished drafts.',
      ],
    },
    {
      name: 'NextGleis',
      tagline: 'Android departure board for German buses and trains',
      stack: ['Expo', 'React Native', 'TypeScript', 'Node.js on Vercel'],
      link: {
        label: 'github.com/Jaival/NextGleis',
        href: 'https://github.com/Jaival/NextGleis',
      },
      year: '2026',
      bullets: [
        'Live departures through a serverless proxy that turns transport-API XML into JSON and keeps the keys off the device; CI runs type checks, tests and npm audit; in development, APK on GitHub.',
      ],
    },
    {
      name: 'NextToBinge',
      tagline: 'one search for movies, dramas and anime',
      stack: ['Next.js', 'Supabase', 'Drizzle', 'Clerk'],
      link: {
        label: 'nexttobinge.vercel.app',
        href: 'https://nexttobinge.vercel.app',
      },
      year: '2026',
      bullets: [
        'Trending lists and watchlists for every title; CI checks lint, types, tests and the build.',
      ],
    },
    {
      name: 'Invoicely',
      tagline: 'invoicing app for freelancers (in development)',
      stack: ['Next.js', 'Postgres (Neon)', 'Drizzle', 'Better Auth'],
      link: {
        label: 'invoicely-roan.vercel.app',
        href: 'https://invoicely-roan.vercel.app',
      },
      year: '2026',
      bullets: [
        'Google sign-in, email verification and organizations; CI runs lint, type checks, tests and Playwright end-to-end tests.',
      ],
    },
    {
      name: 'mdgloss',
      tagline: 'markdown reader for highlighting and commenting (pre-alpha)',
      stack: ['Tauri 2', 'React', 'TypeScript', 'Rust'],
      link: {
        label: 'github.com/Jaival/mdgloss',
        href: 'https://github.com/Jaival/mdgloss',
      },
      year: '2026',
      bullets: [
        'Annotations are stored next to the files, which never change; CI checks the frontend and Rust code, and a release workflow builds Windows and macOS binaries.',
      ],
    },
    {
      name: 'Kubernetes Lab',
      tagline: 'hands-on course on a local cluster (learning stage)',
      stack: ['kind', 'Helm', 'Prometheus', 'Grafana'],
      link: {
        label: 'github.com/Jaival/kubernetes-learning-lab',
        href: 'https://github.com/Jaival/kubernetes-learning-lab',
      },
      year: '2026',
      bullets: [
        'Multi-node kind cluster running; Helm and Prometheus/Grafana modules in progress, building toward a CI-deployed capstone.',
      ],
    },
  ],
  experience: [
    {
      org: "Master's preparation and move to Germany",
      dates: '2022 – 2023',
      bullets: [],
    },
    {
      org: 'Maven Infosoft Pvt. Ltd.',
      place: 'Ahmedabad, India',
      role: 'Junior DevOps Engineer',
      dates: 'June 2021 – March 2022',
      bullets: [
        'Automated testing, UAT and dev deployments for 3 products by building their GitHub Actions pipelines.',
        'Resolved 50+ production incidents in my first six months by tracing server alerts through logs and fixing the networking faults behind most of them.',
        'Secured Dev, Stage and Production on AWS (EC2, S3, VPC) for a .NET CMS product and its 7-person team by writing least-privilege IAM policies and segmenting the VPC.',
        'Caught 8–10 CPU and memory problems before customers noticed by setting up AWS CloudWatch alarms.',
        "Monitored the CMS product's health and uptime by writing Python check scripts and scheduling them as cron jobs on Linux.",
        'Cut new-developer onboarding time by 30% and maintenance time by 20% by writing the deployment runbooks from scratch and rewriting the update SOPs.',
        'Prevented repeat crashes by leading monthly root-cause post-mortems with the developers, each covering 4–6 incidents.',
        'Trained 7 teammates in Docker as the team began moving its deployment pipeline to containers.',
      ],
    },
    {
      org: 'Apexa Information System Pvt. Ltd.',
      place: 'Ahmedabad, India',
      role: 'Junior Developer (Intern)',
      dates: 'January 2020 – June 2020',
      bullets: [
        'Shipped a cross-platform task manager for iOS and Android by building it end to end in Flutter with a Firebase backend that syncs data in real time.',
        "Designed the app's data model and took it live on Firebase Hosting, fixing the 5–6 bugs and UI issues raised in senior developers' code reviews.",
        'Later rebuilt it as the open-source app Taskly (github.com/Jaival/taskly-flutter) with Riverpod, offline support, and GitHub Actions CI that tests it and builds releases for 4 platforms.',
      ],
    },
    {
      org: 'Ganpat University',
      place: 'Ahmedabad, India',
      role: 'Mobile App Developer (In-house)',
      dates: 'May 2019 – June 2019',
      bullets: [
        'Replaced long email chains for booking meetings by building a scheduling app, from the interface to a test phase with professors and my 4-person student team.',
      ],
    },
  ],
  education: [
    {
      org: 'RPTU Kaiserslautern',
      place: 'Kaiserslautern, Germany',
      role: 'M.Sc. Computer Science',
      dates: '2023 – Present',
      bullets: ['Focus: Distributed Systems and Network Security.'],
    },
    {
      org: 'Ganpat University',
      place: 'Ahmedabad, India',
      role: 'B.Tech CSE (Cloud-Based Applications)',
      dates: 'August 2017 – May 2021',
      bullets: [
        '**CGPA: 8.67 / 10.0** (top 10% of class)',
        'Specialized in cloud applications early: serverless functions and cloud networking.',
      ],
    },
  ],
  certifications: [
    '**AWS Academy Cloud Foundations** and **Google Cloud Platform Fundamentals**',
    'Cisco **CCNA R&S: Introduction to Networks course** (IP addressing, subnetting, routing).',
    '**AWS Cloud Quest: Generative AI Practitioner**',
  ],
  skills: [
    {
      title: 'Cloud Infrastructure & AWS',
      points: [
        'Managed and secured EC2, S3 and VPC across Dev, Stage and Production.',
        'Wrote least-privilege IAM policies and secure network configurations; AWS guardrails such as Service Control Policies are my next step.',
      ],
    },
    {
      title: 'CI/CD & Release Management',
      points: [
        'Build and fix GitHub Actions pipelines for tests, builds and deployments, at work and in my own projects. Adding automated security checks (shift-left) next.',
        'Write runbooks so deployments are boring, predictable and safe on a Friday.',
      ],
    },
    {
      title: 'Troubleshooting & Monitoring',
      points: [
        'Trace crashes to their root cause through logs, metrics and errors across the stack.',
        'Set up dashboards and alerts that catch issues before users do.',
      ],
    },
    {
      title: 'Security & Networking Fundamentals',
      points: [
        'CCNA R&S networking training (IP addressing, subnetting, routing, segmentation), applied to AWS VPC design.',
        'Explain security trade-offs to developers and agree on a fix instead of blocking releases.',
      ],
    },
    {
      title: 'Communication & Teamwork',
      points: [
        'Work alongside developers, on site or remote, to understand their code and run it in production.',
        'Explain infrastructure problems to non-technical people in plain English.',
      ],
    },
  ],
  leadership: [
    {
      title: 'Placement Coordinator',
      text: 'Ganpat University (2021). Connected classmates with recruiters and organized campus tech events with companies.',
    },
    {
      title: 'Solo DevOps Support',
      text: 'Usually the first contact for infrastructure issues on my shift at Maven Infosoft.',
    },
  ],
  languages: [
    {
      name: 'English',
      level: 'C1',
      text: 'Business fluent (C1), used daily at work and university',
    },
    { name: 'German', level: 'A1', text: 'A1, actively learning' },
    { name: 'Hindi/Gujarati', level: 'Native', text: 'Native' },
  ],
  proficiency: [
    {
      label: 'Cloud',
      items: ['AWS (EC2, S3, IAM, VPC)', 'Google Cloud', 'Firebase'],
    },
    {
      label: 'DevOps',
      items: [
        'Docker',
        'Git',
        'GitHub Actions',
        'Terraform (basics)',
        'Linux administration',
      ],
    },
    {
      label: 'Security',
      items: ['IAM least privilege', 'VPC network segmentation'],
    },
    {
      label: 'Code',
      items: ['Python', 'Bash', 'JavaScript', 'Flutter (Dart)'],
    },
    { label: 'AI', items: ['Claude', 'Claude Code (AI coding assistant)'] },
    { label: 'Data', items: ['PostgreSQL', 'MySQL', 'Firestore'] },
    {
      label: 'Learning',
      items: ['Kubernetes', 'Helm', 'Prometheus', 'Grafana'],
    },
  ],
};

/**
 * The two PDFs `bun run cv:pdf` writes to public/, and the switch on /cv
 * picks between. `site` stays at userData.resumeUrl, which the rest of the
 * site links to.
 */
export const cvDownloads = {
  site: { label: 'Website style', href: '/cv.pdf' },
  classic: { label: 'Classic', href: '/cv-classic.pdf' },
};

/** "June 2021 – March 2022" → "2021–22", "2023 – Present" → "2023–". */
export function yearSpan(dates: string) {
  const [first, ...rest] = dates.match(/\d{4}/g) ?? [];
  if (/present/i.test(dates)) {
    return `${first}–`;
  }
  const last = rest.at(-1);
  return last && last !== first ? `${first}–${last.slice(2)}` : first;
}
