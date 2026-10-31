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
import { photo, plainText, rich } from './pdfShared';

// The CV PDF, rendered by scripts/cv-pdf.tsx to public/cv.pdf from the same
// data as /cv: the layout of the Google Docs CV I used before.
// Sizes are in points (72 per inch); A4 is 595 × 842.
//
// Reading order: react-pdf writes each page's text before the next page's,
// so a sidebar beside the first page would be read in the middle of
// Experience by an ATS. The main sections run full width instead, and the
// sidebar (Skills, Leadership) sits in a two-column band at the end, beside
// the last main sections and Languages: it is always read after them.

const ink = '#000';
const muted = '#666';
const accent = '#3d85c6';
const side = 168;
const gap = 22;

export type CvVariant = 'student' | 'junior';

/** Data order, with Job-Hunt Agent moved last. */
export const defaultProjectOrder = [
  ...cv.projects.map(p => p.name).filter(name => name !== 'Job-Hunt Agent'),
  'Job-Hunt Agent',
];

const s = StyleSheet.create({
  page: {
    paddingTop: 32,
    paddingBottom: 32,
    paddingHorizontal: 34,
    fontFamily: 'google-sans',
    fontSize: 9.25,
    lineHeight: 1.32,
    color: muted,
    ...plainText,
  },
  row: { flexDirection: 'row', gap },
  main: { flex: 1 },
  side: { width: side },
  header: { color: ink },
  name: { fontSize: 36, fontWeight: 700, lineHeight: 1.1, marginBottom: 6 },
  bold: { fontWeight: 700 },
  // Links take the accent so they read as clickable.
  link: { color: accent, textDecoration: 'none' },
  headerLink: { color: accent, textDecoration: 'none' },
  // Without this, a link on its own line is clickable across the column.
  ownLine: { alignSelf: 'flex-start' },
  photo: { width: 76, height: 86, objectFit: 'cover' },
  // Only as wide as the photo, so the headline fits on one line.
  photoColumn: { width: 76 },
  summary: { marginTop: 12 },
  body: { marginTop: 8 },
  heading: {
    color: accent,
    fontWeight: 700,
    marginTop: 14,
    marginBottom: 9,
  },
  first: { marginTop: 0 },
  title: { color: ink, fontSize: 11, lineHeight: 1.3 },
  meta: { fontSize: 7.5, marginTop: 2, marginBottom: 3 },
  entry: { marginBottom: 4 },
  gapLine: { marginBottom: 6 },
  bullet: { flexDirection: 'row', marginBottom: 1.5 },
  dot: {
    width: 6.5,
    height: 6.5,
    borderRadius: 3.25,
    backgroundColor: muted,
    marginLeft: 14,
    marginRight: 8,
    marginTop: 3,
  },
  bulletText: { flex: 1 },
  spaced: { marginBottom: 7 },
  band: { marginTop: 14 },
});

function Bullets({ items }: { items: string[] }) {
  return items.map(item => (
    <View key={item} style={s.bullet} wrap={false}>
      <View style={s.dot} />
      <Text style={s.bulletText}>{rich(item, s.bold)}</Text>
    </View>
  ));
}

function Heading({ children, first }: { children: string; first?: boolean }) {
  return (
    <Text style={[s.heading, first ? s.first : {}]}>
      {children}
    </Text>
  );
}

function Entry({
  entry,
  placeInMeta,
}: {
  entry: CvEntry;
  /** Moves the place under the title, so a long title fits a narrow column. */
  placeInMeta?: boolean;
}) {
  // An entry without a role explains time between jobs: a plain line.
  if (!entry.role) {
    return (
      <Text style={s.gapLine}>
        {entry.org}, {entry.dates}
      </Text>
    );
  }
  const rest = placeInMeta
    ? entry.role
    : [entry.place, entry.role].filter(Boolean).join(' | ');
  const meta = placeInMeta
    ? [entry.place, entry.dates].filter(Boolean).join(' | ')
    : entry.dates;
  return (
    <View style={s.entry}>
      <View wrap={false} minPresenceAhead={30}>
        <Text style={s.title}>
          <Text style={s.bold}>{entry.org},</Text> {rest}
        </Text>
        <Text style={s.meta}>{meta}</Text>
      </View>
      <Bullets items={entry.bullets} />
    </View>
  );
}

function Project({ project }: { project: CvProject }) {
  // A project is a few lines: keep it on one page.
  return (
    <View style={s.entry} wrap={false}>
      <View>
        <Text style={s.title}>
          <Text style={s.bold}>{project.name},</Text> {project.tagline}
        </Text>
        <Text style={s.meta}>
          {project.stack.join(', ')} |{' '}
          <Link style={s.link} src={project.link.href}>
            {project.link.label}
          </Link>{' '}
          | {project.dates}
        </Text>
      </View>
      <Bullets items={project.bullets} />
    </View>
  );
}

function Section({
  title,
  first,
  children,
}: {
  title: string;
  first?: boolean;
  children: ReactNode;
}) {
  // The heading stays on a page with the first item. minPresenceAhead alone
  // misses when that item can't be split.
  const [head, ...rest] = Children.toArray(children);
  return (
    <View>
      <View wrap={false}>
        <Heading first={first}>{title}</Heading>
        {head}
      </View>
      {rest}
    </View>
  );
}

export default function CvPdfClassic({
  variant = 'junior',
  projectOrder = defaultProjectOrder,
}: {
  variant?: CvVariant;
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

  const education = (first?: boolean) => (
    <Section key='education' title='EDUCATION' first={first}>
      {cv.education.map(entry => (
        <Entry key={entry.org + entry.dates} entry={entry} placeInMeta />
      ))}
    </Section>
  );
  const experience = (
    <Section key='experience' title='EXPERIENCE'>
      {cv.experience.map(entry => (
        <Entry key={entry.org + entry.dates} entry={entry} />
      ))}
    </Section>
  );
  const projectList = (
    <Section key='projects' title='PROJECTS'>
      {projects.map(project => (
        <Project key={project.name} project={project} />
      ))}
    </Section>
  );
  const languages = (
    <Section key='languages' title='LANGUAGES'>
      {cv.languages.map(language => (
        <Text key={language.name} style={s.spaced} wrap={false}>
          <Text style={s.bold}>{language.name}:</Text> {language.text}
        </Text>
      ))}
    </Section>
  );
  const certifications = (first?: boolean) => (
    <Section key='certifications' title='CERTIFICATIONS' first={first}>
      <Bullets items={cv.certifications} />
    </Section>
  );

  // Full width, in reading order; the band's left column follows them.
  const full =
    variant === 'student'
      ? [education(), experience, projectList]
      : [experience, projectList];
  const bandLeft =
    variant === 'student'
      ? [certifications(true), languages]
      : [education(true), certifications(), languages];

  return (
    <Document title={`${cv.name} CV`} author={cv.name} language='en'>
      <Page size='A4' style={s.page}>
        <View style={[s.row, s.header]}>
          <View style={s.main}>
            <Text style={s.name}>{cv.name}</Text>
            <Text style={s.bold}>{cv.headline}</Text>
            <Link style={[s.headerLink, s.ownLine]} src={`mailto:${cv.email}`}>
              {cv.email}
            </Link>
            <Link
              style={[s.headerLink, s.ownLine]}
              src={`tel:${cv.phone.replaceAll(' ', '')}`}
            >
              {cv.phone}
            </Link>
            <Text>{cv.location}</Text>
            <Text>
              {cv.links.map((link, i) => (
                <Text key={link.href}>
                  {i > 0 && ' | '}
                  <Link style={s.headerLink} src={link.href}>
                    {link.label}
                  </Link>
                </Text>
              ))}
            </Text>
            <Text>{cv.permit}</Text>
          </View>
          <View style={s.photoColumn}>
            {/* eslint-disable-next-line jsx-a11y/alt-text -- react-pdf's Image has no alt prop */}
            <Image style={s.photo} src={photo} />
          </View>
        </View>

        <Text style={s.summary}>{cv.summary}</Text>

        <View style={s.body}>{full}</View>

        <View style={[s.row, s.band]}>
          <View style={s.main}>{bandLeft}</View>
          <View style={s.side}>
            <Heading first>SKILLS</Heading>
            {cv.skills.map(group => (
              <Text key={group.label} style={s.spaced} wrap={false}>
                <Text style={s.bold}>{group.label}:</Text>{' '}
                {group.items.join(', ')}
              </Text>
            ))}

            <Heading>LEADERSHIP & INITIATIVE</Heading>
            {cv.leadership.map(item => (
              <Text key={item.title} style={s.spaced} wrap={false}>
                <Text style={s.bold}>{item.title}:</Text> {item.text}
              </Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
