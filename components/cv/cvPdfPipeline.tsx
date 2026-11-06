import {
  Document,
  Image,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import { Children, type ReactNode } from 'react';
import { cv, type CvEntry, type CvProject } from '@/utils/cv';
import { photo, plainText } from './pdfShared';

// The CV PDF, rendered by scripts/cv-pdf.tsx to public/cv.pdf from the same
// data as /cv, in the layout of my "A · Pipeline" master CV: an engineer's
// terminal, with mono accents, lowercase section labels and an accent line
// beside the jobs. Sizes are in points (72 per inch; 1 mm = 2.835 pt).
//
// One column, in reading order: an ATS reads name → tagline → contact →
// profile → skills → education → experience → projects → certifications.
// Page 1 ends with Experience; Projects start page 2.

const mm = (value: number) => value * 2.835;

const color = {
  accent: '#0B5E6B',
  ink: '#14181A',
  body: '#22292B',
  muted: '#3B4447',
  date: '#4A5558',
  rule: '#D3DDE0',
};

/** The order in utils/cv.ts. */
export const defaultProjectOrder = cv.projects.map(p => p.name);

const s = StyleSheet.create({
  page: {
    paddingTop: mm(13),
    paddingBottom: mm(11),
    paddingHorizontal: mm(14),
    fontFamily: 'google-sans',
    fontSize: 9.5,
    lineHeight: 1.2,
    color: color.body,
    ...plainText,
  },
  mono: { fontFamily: 'jetbrains-mono' },
  header: { flexDirection: 'row', justifyContent: 'space-between', gap: 16 },
  name: {
    fontSize: 25.5,
    fontWeight: 700,
    letterSpacing: -0.5,
    lineHeight: 1.1,
    color: color.ink,
  },
  tagline: { fontSize: 10, fontWeight: 500, color: color.accent, marginTop: 2 },
  contact: { color: color.muted, marginTop: 6 },
  link: { color: color.muted, textDecoration: 'none' },
  photo: {
    width: mm(27.5),
    height: mm(27.5),
    borderRadius: mm(2),
    objectFit: 'cover',
  },
  heading: {
    fontFamily: 'jetbrains-mono',
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: 0.3,
    color: color.accent,
    marginTop: 12,
    marginBottom: 5,
    paddingBottom: 2,
    borderBottomWidth: 0.75,
    borderBottomColor: color.rule,
  },
  first: { marginTop: 14 },
  skill: { flexDirection: 'row', marginBottom: 1.5 },
  skillLabel: {
    width: mm(40),
    fontFamily: 'jetbrains-mono',
    fontSize: 8.5,
    fontWeight: 500,
    color: color.accent,
    paddingTop: 0.75,
  },
  skillValue: { flex: 1 },
  entry: { marginBottom: 5 },
  // The timeline: a job's lines sit beside an accent rule.
  job: {
    borderLeftWidth: 1.5,
    borderLeftColor: color.accent,
    paddingLeft: mm(4),
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: 12,
  },
  title: { fontSize: 10, color: color.ink, flex: 1 },
  bold: { fontWeight: 600 },
  dates: {
    fontFamily: 'jetbrains-mono',
    fontSize: 8.5,
    color: color.date,
  },
  context: { fontStyle: 'italic', color: color.date, marginTop: 1 },
  details: { marginTop: 1 },
  repo: {
    fontFamily: 'jetbrains-mono',
    fontSize: 8.5,
    color: color.date,
    textDecoration: 'none',
    marginTop: 1,
    marginBottom: 1,
  },
  bullet: { flexDirection: 'row', marginTop: 1 },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: color.accent,
    marginTop: 4.25,
    marginLeft: mm(1.5),
    marginRight: mm(2.5) - 3,
  },
  bulletText: { flex: 1 },
  pageTwo: { marginTop: 0 },
});

function Bullets({ items }: { items: string[] }) {
  return items.map(item => (
    <View key={item} style={s.bullet} wrap={false}>
      <View style={s.dot} />
      <Text style={s.bulletText}>{item}</Text>
    </View>
  ));
}

function TitleRow({
  title,
  org,
  dates,
}: {
  title: string;
  org: string;
  dates: string;
}) {
  return (
    <View style={s.titleRow}>
      <Text style={s.title}>
        <Text style={s.bold}>{title}</Text> · {org}
      </Text>
      <Text style={s.dates}>{dates}</Text>
    </View>
  );
}

function Entry({ entry }: { entry: CvEntry }) {
  const job = entry.bullets.length > 0;
  return (
    <View style={[s.entry, job ? s.job : {}]}>
      {/* A title never ends a page alone. */}
      <View wrap={false} minPresenceAhead={30}>
        <TitleRow title={entry.title} org={entry.org} dates={entry.dates} />
        {entry.context && <Text style={s.context}>{entry.context}</Text>}
        {entry.details && <Text style={s.details}>{entry.details}</Text>}
      </View>
      <Bullets items={entry.bullets} />
    </View>
  );
}

function Project({ project }: { project: CvProject }) {
  return (
    <View style={s.entry} wrap={false}>
      <TitleRow
        title={project.name}
        org={project.stack.join(', ')}
        dates={project.dates}
      />
      <Link style={s.repo} src={project.link.href}>
        {project.link.label}
      </Link>
      <Text>{project.text}</Text>
    </View>
  );
}

function Section({
  title,
  first,
  breakBefore,
  children,
}: {
  title: string;
  first?: boolean;
  breakBefore?: boolean;
  children: ReactNode;
}) {
  // The heading stays on a page with the first item.
  const [head, ...rest] = Children.toArray(children);
  return (
    <View break={breakBefore}>
      <View wrap={false}>
        <Text
          style={[
            s.heading,
            first ? s.first : {},
            breakBefore ? s.pageTwo : {},
          ]}
        >
          {title}
        </Text>
        {head}
      </View>
      {rest}
    </View>
  );
}

export default function CvPdfPipeline({
  projectOrder = defaultProjectOrder,
}: {
  /** Project names, in the order to print them. */
  projectOrder?: string[];
}) {
  // Every project prints: an order that leaves one out is a mistake.
  if (new Set(projectOrder).size !== cv.projects.length) {
    throw new Error(
      `projectOrder must name all ${cv.projects.length} projects once each`,
    );
  }
  const projects = projectOrder.map(name => {
    const project = cv.projects.find(p => p.name === name);
    if (!project) {
      throw new Error(`No project named "${name}" in utils/cv.ts`);
    }
    return project;
  });

  return (
    <Document title={`${cv.name} CV`} author={cv.name} language='en'>
      <Page size='A4' style={s.page}>
        <View style={s.header}>
          <View>
            <Text style={s.name}>{cv.name}</Text>
            <Text style={[s.mono, s.tagline]}>{cv.tagline}</Text>
            <View style={s.contact}>
              <Text>
                {cv.location} ·{' '}
                <Link
                  style={s.link}
                  src={`tel:${cv.phone.replaceAll(' ', '')}`}
                >
                  {cv.phone}
                </Link>{' '}
                ·{' '}
                <Link style={s.link} src={`mailto:${cv.email}`}>
                  {cv.email}
                </Link>
              </Text>
              <Text>
                {cv.links.map((item, i) => (
                  <Text key={item.href}>
                    {i > 0 && ' · '}
                    <Link style={s.link} src={item.href}>
                      {item.label}
                    </Link>
                  </Text>
                ))}
              </Text>
              <Text>{cv.status}</Text>
            </View>
          </View>
          {/* eslint-disable-next-line jsx-a11y/alt-text -- react-pdf's Image has no alt prop */}
          <Image style={s.photo} src={photo} />
        </View>

        <Section title='profile' first>
          <Text>{cv.profile}</Text>
        </Section>

        <Section title='skills'>
          {/* Written label, value, label, value: an ATS that reads the
              content stream (pdftotext -raw) gets each pair together. */}
          {cv.skills.map(skill => (
            <View key={skill.label} style={s.skill} wrap={false}>
              <Text style={s.skillLabel}>{skill.label}</Text>
              <Text style={s.skillValue}>
                {skill.value}
                {skill.learning && ` · learning: ${skill.learning}`}
              </Text>
            </View>
          ))}
        </Section>

        <Section title='education'>
          {cv.education.map(entry => (
            <Entry key={entry.title} entry={entry} />
          ))}
        </Section>

        <Section title='experience'>
          {cv.experience.map(entry => (
            <Entry key={entry.title + entry.dates} entry={entry} />
          ))}
        </Section>

        <Section title='projects' breakBefore>
          {projects.map(project => (
            <Project key={project.name} project={project} />
          ))}
          <Text>
            {cv.moreProjects.text} ·{' '}
            <Link style={s.link} src={cv.moreProjects.link.href}>
              {cv.moreProjects.link.label}
            </Link>
          </Text>
        </Section>

        <Section title='certifications'>
          <Bullets items={cv.certifications} />
        </Section>
      </Page>
    </Document>
  );
}
