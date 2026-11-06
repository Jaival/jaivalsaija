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
  /** Terminal-style decoration; the profile's first words are the title. */
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
  /** At most 3, chosen for DevOps relevance. */
  projects: CvProject[];
  /** The rest of the projects, in one line. */
  moreProjects: { text: string; link: CvLink };
  certifications: string[];
}

export const cv: Cv = {
  name: 'Jaival Saija',
  tagline: '$ junior-devops-engineer --aws --github-actions --docker',
  profile:
    'Junior DevOps & Cloud Engineer with 10 months of production experience: built GitHub Actions pipelines for 3 products, ran AWS (EC2, S3, IAM, VPC) across Dev, Stage and Production, and resolved 50+ incidents. M.Sc. Computer Science student at RPTU Kaiserslautern, building a Kubernetes lab. 20 h/week in semester, up to 40 in breaks; available immediately; willing to relocate within Germany.',
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
  status:
    'Indian · Student residence permit (§16b AufenthG): 20 h/week in semester',
  photo: '/cv-photo.jpg',
  skills: [
    { label: 'cloud', value: 'AWS (EC2, S3, IAM, VPC, CloudWatch), Firebase' },
    { label: 'ci_cd & iac', value: 'GitHub Actions, Terraform (basics), Git' },
    {
      label: 'containers',
      value: 'Docker',
      learning: 'Kubernetes (kind), Helm',
    },
    {
      label: 'linux & scripting',
      value: 'Linux administration, Bash, Python, cron',
    },
    {
      label: 'monitoring',
      value: 'AWS CloudWatch alarms',
      learning: 'Prometheus, Grafana',
    },
    {
      label: 'network & security',
      value:
        'VPC segmentation, least-privilege IAM, subnetting, routing (CCNA ITN course)',
    },
    {
      label: 'code & data',
      value:
        'Python, JavaScript, Flutter (Dart), SQL (PostgreSQL, MySQL), Firestore',
    },
    { label: 'ai tools', value: 'Claude Code, MCP connectors' },
    {
      label: 'languages',
      value:
        'English C1 · German A1 (Goethe certificate), actively learning · Hindi, Gujarati native',
    },
  ],
  education: [
    {
      title: 'M.Sc. Computer Science',
      org: 'RPTU Kaiserslautern, Germany',
      dates: '10/2023 – 09/2027 (expected)',
      details:
        'Focus: Distributed Systems, Network Security · Courses: Network Security; Internet Security Assessment and Operations · Seminar paper: “The Gap Between Theory and Reality: A Survey of Deniable Messaging”',
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
      bullets: [],
    },
    {
      title: 'Junior DevOps Engineer',
      org: 'Maven Infosoft Pvt. Ltd., Ahmedabad, India',
      dates: '06/2021 – 03/2022',
      context:
        'IT services company (~10 staff) building web products for clients. CI/CD for 3 products; AWS for a .NET school-management CMS used by 3–4 schools (7 EC2 servers across Dev, Stage and Production).',
      bullets: [
        'Resolved 50+ production incidents in my first six months as first contact for infrastructure alerts, tracing them through logs and fixing the networking faults behind most of them.',
        'Automated testing, UAT and dev deployments for 3 products by building their GitHub Actions pipelines.',
        'Secured Dev, Stage and Production on AWS (EC2, S3, VPC) for the CMS and its 7-person team by writing least-privilege IAM policies and segmenting the VPC.',
        'Caught 8–10 CPU and memory problems before customers noticed with AWS CloudWatch alarms and Python uptime checks run as cron jobs on Linux.',
        'Cut new-developer onboarding time by 30% and maintenance time by 20% by writing the deployment runbooks from scratch and rewriting the update SOPs.',
        'Led monthly post-mortems with developers, each reviewing 4–6 incidents to find their root causes.',
        'Trained 7 teammates in Docker as the team began moving its deployment pipeline to containers.',
      ],
    },
    {
      title: 'Junior Developer Intern',
      org: 'Apexa Information System, Ahmedabad, India',
      dates: '01/2020 – 06/2020',
      context:
        'Internship on a task-management app for about 4 users, built end to end.',
      bullets: [
        'Built and shipped a cross-platform Flutter task manager with a real-time Firebase backend; designed its data model and deployed it on Firebase Hosting.',
      ],
    },
  ],
  projects: [
    {
      name: 'Kubernetes Lab',
      stack: ['kind', 'Helm', 'Prometheus', 'Grafana'],
      link: {
        label: 'github.com/Jaival/kubernetes-learning-lab',
        href: 'https://github.com/Jaival/kubernetes-learning-lab',
      },
      dates: '10/2026 – present',
      text: 'Multi-node kind cluster running locally; Helm charts and Prometheus/Grafana monitoring are the next modules, building toward a capstone app deployed by CI.',
    },
    {
      name: 'NextGleis',
      stack: ['Expo', 'React Native', 'TypeScript', 'Node.js on Vercel'],
      link: {
        label: 'github.com/Jaival/NextGleis',
        href: 'https://github.com/Jaival/NextGleis',
      },
      dates: '08/2026 – 10/2026',
      text: 'Serverless proxy on Vercel turns transport-API XML into JSON and keeps the API keys off the device; CI runs type checks, tests and npm audit, and Android builds on EAS publish the APK to GitHub Releases.',
    },
    {
      name: 'Job-Hunt Agent',
      stack: ['Claude Code', 'MCP (Gmail, Indeed)', 'Python'],
      link: {
        label: 'github.com/Jaival/jobhunt-agent',
        href: 'https://github.com/Jaival/jobhunt-agent',
      },
      dates: '09/2026 – present',
      text: 'Scheduled agent that pulls job ads from APIs and Gmail alerts, scores them and drafts applications for human review; Python tools keep a job ledger and block drafts with placeholders. Nothing is sent automatically.',
    },
  ],
  moreProjects: {
    text: 'Further projects (web, desktop and mobile apps with CI): Invoicely, NextToBinge, mdgloss, Taskly',
    link: { label: 'github.com/Jaival', href: 'https://github.com/Jaival' },
  },
  certifications: [
    'AWS Academy Cloud Foundations',
    'Google Cloud Platform Fundamentals',
    'AWS Cloud Quest: Generative AI Practitioner',
    'Cisco CCNA: Introduction to Networks (course)',
  ],
};
