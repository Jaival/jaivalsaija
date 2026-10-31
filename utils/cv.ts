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
  dates: string;
  bullets: string[];
}

export interface CvEntry {
  org: string;
  place?: string;
  role?: string;
  dates: string;
  bullets: string[];
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
  /** The paragraph under the header. */
  summary: string;
  email: string;
  phone: string;
  location: string;
  links: CvLink[];
  /** Street address stays off: the file is public. */
  permit: string;
  photo: string;
  projects: CvProject[];
  experience: CvEntry[];
  education: CvEntry[];
  certifications: string[];
  /** A bold label, then the items comma-separated. */
  skills: CvGroup[];
  leadership: CvNote[];
  languages: CvLanguage[];
}

export const cv: Cv = {
  name: 'Jaival Saija',
  headline:
    'Working Student / Junior DevOps & Cloud Engineer | AWS · GitHub Actions · Docker · Linux',
  summary:
    "Computer Science master's student at RPTU Kaiserslautern with 10 months as a Junior DevOps Engineer: GitHub Actions pipelines for 3 products, AWS (EC2, S3, IAM, VPC) across Dev, Stage and Production, CloudWatch alerting and incident work. Looking for a working student or junior role in DevOps, cloud or platform engineering. 20 h/week during semester, up to 40 in breaks; available immediately; willing to relocate within Germany.",
  email: 'saijajaival@gmail.com',
  phone: '+49 174 512 6677',
  location: 'Kaiserslautern, Germany',
  links: [
    { label: 'jaivalsaija.vercel.app', href: 'https://jaivalsaija.vercel.app' },
    { label: 'github.com/Jaival', href: 'https://github.com/Jaival' },
    {
      label: 'linkedin.com/in/jaivalsaija',
      href: 'https://www.linkedin.com/in/jaivalsaija',
    },
  ],
  permit:
    'Student residence permit (§16b AufenthG), eligible for working student jobs (20 h/week)',
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
      dates: 'Sep 2026 – present',
      bullets: [
        'Scheduled Claude Code routine that pulls job ads from APIs, an Indeed connector and Gmail alerts, scores them against my CV and drafts applications for my review; Python tools keep a job ledger and block drafts with placeholders. Nothing is sent automatically.',
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
      dates: 'Sep 2026 – present',
      bullets: [
        'Annotations are stored next to the files, which never change; CI checks the frontend and Rust code, and a release workflow builds Windows and macOS binaries.',
      ],
    },
    {
      name: 'Kubernetes Lab',
      tagline: 'self-built learning lab on a local cluster (in progress)',
      stack: ['kind', 'Helm', 'Prometheus', 'Grafana'],
      link: {
        label: 'github.com/Jaival/kubernetes-learning-lab',
        href: 'https://github.com/Jaival/kubernetes-learning-lab',
      },
      dates: 'Oct 2026 – present',
      bullets: [
        'Multi-node kind cluster running; adding Helm charts and Prometheus/Grafana monitoring, then a CI-deployed capstone.',
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
      dates: 'Aug 2026 – Oct 2026',
      bullets: [
        'Live departures through a serverless proxy that turns transport-API XML into JSON and keeps the keys off the device; CI runs type checks, tests and npm audit; in development, APK on GitHub.',
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
      dates: 'Dec 2023 – present',
      bullets: [
        'Google sign-in, email verification and organizations; CI runs lint, type checks, tests and Playwright end-to-end tests.',
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
      dates: 'Apr 2026 – Oct 2026',
      bullets: [
        'Trending lists and watchlists for every title; CI checks lint, types, tests and the build.',
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
        'Resolved 50+ production incidents in my first six months as the first contact for infrastructure alerts on my shift, tracing them through logs and fixing the networking faults behind most of them.',
        'Automated testing, UAT and dev deployments for 3 products by building their GitHub Actions pipelines.',
        'Secured Dev, Stage and Production on AWS (EC2, S3, VPC) for a .NET CMS product and its 7-person team by writing least-privilege IAM policies and segmenting the VPC.',
        'Caught 8–10 CPU and memory problems before customers noticed with AWS CloudWatch alarms; added Python uptime checks run as cron jobs on Linux.',
        'Cut new-developer onboarding time by 30% and maintenance time by 20% by writing the deployment runbooks from scratch and rewriting the update SOPs; led monthly post-mortems with developers, each covering 4–6 incidents.',
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
      dates: '2023 – 2027 (expected)',
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
    '**AWS Cloud Quest: Generative AI Practitioner**',
    '**AWS Academy Cloud Foundations**',
    '**Google Cloud Platform Fundamentals**',
    'Cisco **CCNA R&S: Introduction to Networks** (course)',
  ],
  skills: [
    {
      label: 'Cloud',
      items: ['AWS (EC2, S3, IAM, VPC, CloudWatch)', 'Firebase'],
    },
    {
      label: 'CI/CD & IaC',
      items: ['GitHub Actions', 'Terraform (basics)', 'Git'],
    },
    { label: 'Containers', items: ['Docker'] },
    {
      label: 'Linux & Scripting',
      items: ['Linux administration', 'Bash', 'Python', 'cron'],
    },
    {
      label: 'Networking & Security',
      items: [
        'VPC segmentation',
        'least-privilege IAM',
        'subnetting and routing (CCNA ITN course)',
      ],
    },
    {
      label: 'Code & Data',
      items: [
        'Python',
        'JavaScript',
        'Flutter (Dart)',
        'PostgreSQL',
        'MySQL',
        'Firestore',
      ],
    },
    { label: 'AI tools', items: ['Claude', 'Claude Code'] },
    {
      label: 'Learning',
      items: ['Kubernetes', 'Helm', 'Prometheus', 'Grafana'],
    },
  ],
  leadership: [
    {
      title: 'Placement Coordinator',
      text: 'Ganpat University (2021). Connected classmates with recruiters and organized campus tech events with companies.',
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
