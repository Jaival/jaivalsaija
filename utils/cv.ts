// The CV, as data, shown by app/cv. The words follow my "A · Pipeline"
// master CV, which is built outside this repo and copied to public/cv.pdf
// as is: keep the two in step by hand.

export interface CvLink {
  label: string;
  href: string;
}

export interface CvSkill {
  /** Lowercase, like a CLI flag group: "ci_cd & iac". */
  label: string;
  value: string;
  /** Started, not yet a skill I'd claim. Printed after "learning:". */
  learning?: string;
}

export interface CvEntry {
  title: string;
  /** Printed after the title, past a " · ". */
  org: string;
  dates: string;
  /** The italic line under a job: what the company was, what I ran. */
  context?: string;
  /** Plain text under the title, for education. */
  details?: string;
  /** One achievement each. */
  bullets: string[];
}

export interface CvProject {
  name: string;
  stack: string[];
  link: CvLink;
  dates: string;
  text: string;
}

export interface Cv {
  name: string;
  /** Terminal-style decoration, where the PDF has its title line. */
  tagline: string;
  profile: string;
  email: string;
  phone: string;
  /** City only on the page; the PDF carries the full address. */
  location: string;
  links: CvLink[];
  status: string;
  /** In public/. A JPEG, because react-pdf can't read WebP. */
  photo: string;
  skills: CvSkill[];
  education: CvEntry[];
  /** Reverse chronological. An entry without bullets is a gap, not a job. */
  experience: CvEntry[];
  /** At most 4, chosen for DevOps relevance, in the PDF's order. */
  projects: CvProject[];
  /** The rest of the projects, in one line. */
  moreProjects: { text: string; link: CvLink };
  certifications: string[];
}

export const cv: Cv = {
  name: 'Jaival Saija',
  tagline: '$ junior-devops-engineer --aws --github-actions --docker',
  profile:
    'M.Sc. Computer Science student at RPTU Kaiserslautern (Distributed Systems, Network Security; graduating 09/2027) with 10 months as a Junior DevOps Engineer (06/2021 – 03/2022): built GitHub Actions deploy pipelines to AWS for 2 products, ran AWS (EC2, S3, IAM, VPC) for a 7-server Dev/Stage/Production setup, and resolved 50+ production incidents. Team project on software-defined radio (Python, GNU Radio, Git) in winter semester 2025/26; since 08/2026 building projects with GitHub Actions CI, now a Kubernetes lab on kind.',
  email: 'saijajaival@gmail.com',
  phone: '+49 174 512 6677',
  location: 'Kaiserslautern, Germany',
  links: [
    { label: 'jaivalsaija.dev', href: 'https://www.jaivalsaija.dev' },
    { label: 'github.com/Jaival', href: 'https://github.com/Jaival' },
    {
      label: 'linkedin.com/in/jaivalsaija',
      href: 'https://www.linkedin.com/in/jaivalsaija',
    },
  ],
  status:
    'Work permit: student residence permit (§16b AufenthG) – 20 h/week in semester, up to 40 h/week in breaks · Available immediately · Willing to relocate within Germany',
  photo: '/cv-photo.jpg',
  skills: [
    { label: 'cloud', value: 'AWS (EC2, S3, IAM, VPC, CloudWatch), Firebase' },
    {
      label: 'ci_cd & iac',
      value: 'GitHub Actions, Git, GitLab, Terraform (basics)',
    },
    { label: 'containers', value: 'Docker' },
    {
      label: 'linux & scripting',
      value: 'Linux administration, Bash, Python, cron',
    },
    { label: 'monitoring', value: 'AWS CloudWatch alarms' },
    {
      label: 'network & security',
      value: 'VPC segmentation, least-privilege IAM, subnetting, routing',
    },
    {
      label: 'code & data',
      value: 'Python, JavaScript, TypeScript, Node.js, SQL (PostgreSQL, MySQL)',
    },
    {
      label: 'kubernetes (beginner)',
      value: 'kind, kubectl',
      learning: 'Helm, Prometheus, Grafana',
    },
    {
      label: 'languages',
      value:
        'English (C1) · German (A1, Goethe certificate 03/2023, learning A2) · Hindi, Gujarati (native)',
    },
  ],
  education: [
    {
      title: 'M.Sc. Computer Science',
      org: 'RPTU Kaiserslautern, Germany',
      dates: '10/2023 – 09/2027 (expected)',
      details:
        'Focus: Distributed Systems, Network Security · Courses: Network Security; Internet Security Assessment and Operations · Seminar paper (03/2026): “The Gap Between Theory and Reality: A Survey of Deniable Messaging” – surveyed 8 papers on deniable authenticated key exchange (e.g. XZDH) and how deniability holds up in legal and social practice.',
      bullets: [],
    },
    {
      title: 'B.Tech Computer Science & Engineering',
      org: 'Ganpat University, India',
      dates: '08/2017 – 05/2021',
      details:
        'Specialization: Cloud-Based Applications · CGPA 8.67 / 10 (top 10% of class) · Placement Coordinator 2021',
      bullets: [],
    },
  ],
  experience: [
    {
      title: 'Career break',
      org: "Master's preparation and relocation to Germany",
      dates: '04/2022 – 09/2023',
      bullets: [
        'Took the GRE for M.Sc. admission.',
        'Passed the Goethe-Institut German A1 exam (03/2023).',
      ],
    },
    {
      title: 'Junior DevOps Engineer',
      org: 'Maven Infosoft Pvt. Ltd., Ahmedabad, India',
      dates: '06/2021 – 03/2022',
      context:
        'IT services company (~10 staff) building web products for clients. Deploy pipelines for 2 products; AWS for a .NET school-management CMS used by 3–4 schools (7 EC2 servers across Dev, Stage and Production).',
      bullets: [
        'Resolved 50+ production incidents in the first six months as first contact for infrastructure alerts, most within 1 hour; traced them through logs and fixed the networking faults behind most of them.',
        'Built GitHub Actions pipelines to deploy 2 of the 3 products to AWS; they reached the testing stage but were not used in production because of .NET version limits.',
        'Secured Dev, Stage and Production on AWS (EC2, S3, VPC) for the CMS and its 7-person team: wrote least-privilege IAM policies and segmented the VPC.',
        'Used AWS CloudWatch CPU/memory alarms to catch 8–10 problems before customers noticed.',
        'Wrote the deployment runbooks from scratch and rewrote the update SOPs: new-developer onboarding time down 30%, maintenance time down 20%.',
        'Led monthly post-mortems with the developers, each reviewing 4–6 incidents to find root causes; as a result, added service health checks and a Python cron job on Linux that alerts when a service is down (before, monitoring covered only cost and CPU/memory usage).',
        'Trained 7 teammates in Docker; the team adopted it for local development as the first step toward container-based deployments.',
      ],
    },
    {
      title: 'Junior Developer Intern',
      org: 'Apexa Information System, Ahmedabad, India',
      dates: '01/2020 – 06/2020',
      bullets: [
        'Built and shipped a cross-platform Flutter task manager for about 4 users with a real-time Firebase backend; designed the data model and deployed it on Firebase Hosting.',
      ],
    },
  ],
  projects: [
    {
      name: 'DISCO',
      stack: ['Python', 'GNU Radio', 'SDR hardware', 'Git'],
      link: {
        label: 'sci-git.cs.rptu.de/purple-heads/disco-project',
        href: 'https://sci-git.cs.rptu.de/purple-heads/disco-project',
      },
      dates: '10/2025 – 03/2026',
      text: "Software-defined radio team project at RPTU Kaiserslautern (course: Project Performance Evaluation in Distributed Systems, team of 3, shared Git repository). Studied digital modulation (QPSK, QAM) and how data is packaged into frames for modern radio signals; built the team's QAM64 simulations and sent and received data over the air with SDR hardware, measuring an SNR of 10.21 dB for QAM64 and QPSK and 8.15 dB for BPSK.",
    },
    {
      name: 'NextGleis',
      stack: [
        'GitHub Actions',
        'Expo',
        'React Native',
        'TypeScript',
        'Node.js',
        'Vercel',
        'EAS',
      ],
      link: {
        label: 'github.com/Jaival/NextGleis',
        href: 'https://github.com/Jaival/NextGleis',
      },
      dates: '08/2026 – 10/2026',
      text: 'CI pipeline and serverless API. The GitHub Actions pipeline runs type checks, tests and npm audit; Android builds on EAS publish the APK to GitHub Releases. A serverless proxy on Vercel turns transport-API XML into JSON and keeps the API keys off the device.',
    },
    {
      name: 'Kubernetes Lab',
      stack: ['kind (Helm, Prometheus, Grafana planned)'],
      link: {
        label: 'github.com/Jaival/kubernetes-learning-lab',
        href: 'https://github.com/Jaival/kubernetes-learning-lab',
      },
      dates: '10/2026 – present',
      text: 'Set up a multi-node kind cluster locally and deployed a sample app to it with kubectl. Next modules: Helm charts, Prometheus/Grafana monitoring, and a capstone app deployed by CI.',
    },
    {
      name: 'Job-Hunt Agent',
      stack: ['Python', 'Claude Code', 'MCP'],
      link: {
        label: 'github.com/Jaival/jobhunt-agent',
        href: 'https://github.com/Jaival/jobhunt-agent',
      },
      dates: '09/2026 – present',
      text: 'Scheduled agent that pulls job ads from APIs and Gmail alerts, scores them and drafts applications for human review; Python tools keep a job ledger and block drafts that still contain placeholders.',
    },
  ],
  moreProjects: {
    text: 'Further projects (web, desktop and mobile apps with CI): Invoicely, NextToBinge, mdgloss, Taskly',
    link: { label: 'github.com/Jaival', href: 'https://github.com/Jaival' },
  },
  certifications: [
    'AWS Cloud Quest: Generative AI Practitioner (2025)',
    'AWS Academy Cloud Foundations',
    'Google Cloud Platform Fundamentals',
    'Cisco CCNA: Introduction to Networks (course)',
  ],
};
