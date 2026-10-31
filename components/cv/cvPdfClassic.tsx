import {
  Document,
  Image,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import { cv, type CvEntry } from '@/utils/cv';
import { photo, plainText, rich } from './pdfShared';

// The classic layout, rendered to public/cv-classic.pdf: the Google Docs
// CV I used before the site-style one (cvPdf.tsx), from the same data.
// Sizes are in points (72 per inch); A4 is 595 × 842.

const ink = '#000';
const muted = '#666';
const accent = '#3d85c6';
const side = 168;
const gap = 22;

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
  link: { color: muted, textDecoration: 'none' },
  headerLink: { color: ink, textDecoration: 'none' },
  photo: { width: 76, height: 86, objectFit: 'cover' },
  columns: { marginTop: 22 },
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
  skill: { marginBottom: 12 },
  skillTitle: { fontWeight: 700 },
  spaced: { marginBottom: 7 },
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
    <Text style={[s.heading, first ? s.first : {}]} minPresenceAhead={40}>
      {children}
    </Text>
  );
}

function Entry({ entry }: { entry: CvEntry }) {
  const rest = [entry.place, entry.role].filter(Boolean).join(' | ');
  return (
    <View style={s.entry}>
      <View wrap={false} minPresenceAhead={30}>
        <Text style={s.title}>
          <Text style={s.bold}>
            {entry.org}
            {rest && ','}
          </Text>
          {rest && ` ${rest}`}
        </Text>
        <Text style={s.meta}>{entry.dates}</Text>
      </View>
      <Bullets items={entry.bullets} />
    </View>
  );
}

export default function CvPdfClassic() {
  return (
    <Document title={`${cv.name} CV`} author={cv.name} language='en'>
      <Page size='A4' style={s.page}>
        <View style={[s.row, s.header]}>
          <View style={s.main}>
            <Text style={s.name}>{cv.name}</Text>
            <Text style={s.bold}>{cv.headline}</Text>
            <Link style={s.headerLink} src={`mailto:${cv.email}`}>
              {cv.email}
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
            <Text>
              Nationality: {cv.nationality} | {cv.permit}
            </Text>
          </View>
          <View style={s.side}>
            {/* eslint-disable-next-line jsx-a11y/alt-text -- react-pdf's Image has no alt prop */}
            <Image style={s.photo} src={photo} />
          </View>
        </View>

        <View style={[s.row, s.columns]}>
          <View style={s.main}>
            <Heading first>PROJECTS</Heading>
            {cv.projects.map(project => (
              <View key={project.name} style={s.entry}>
                <View wrap={false} minPresenceAhead={30}>
                  <Text style={s.title}>
                    <Text style={s.bold}>{project.name},</Text>{' '}
                    {project.tagline}
                  </Text>
                  <Text style={s.meta}>
                    {project.stack.join(', ')} |{' '}
                    <Link style={s.link} src={project.link.href}>
                      {project.link.label}
                    </Link>{' '}
                    | {project.year}
                  </Text>
                </View>
                <Bullets items={project.bullets} />
              </View>
            ))}

            <Heading>EXPERIENCE</Heading>
            {cv.experience.map(entry => (
              <Entry key={entry.org + entry.dates} entry={entry} />
            ))}

            <Heading>EDUCATION</Heading>
            {cv.education.map(entry => (
              <Entry key={entry.org + entry.dates} entry={entry} />
            ))}

            <Heading>CERTIFICATIONS</Heading>
            <Bullets items={cv.certifications} />
          </View>

          <View style={s.side}>
            <Heading first>Skills</Heading>
            {cv.skills.map(skill => (
              <View key={skill.title} style={s.skill} wrap={false}>
                <Text style={s.skillTitle}>{skill.title}</Text>
                {skill.points.map(point => (
                  <Text key={point}>- {point}</Text>
                ))}
              </View>
            ))}

            <Heading>LEADERSHIP & INITIATIVE</Heading>
            {cv.leadership.map(item => (
              <Text key={item.title} wrap={false}>
                - <Text style={s.bold}>{item.title}:</Text> {item.text}
              </Text>
            ))}

            <Heading>Languages</Heading>
            {cv.languages.map(language => (
              <Text key={language.name} style={s.spaced} wrap={false}>
                <Text style={s.bold}>{language.name}:</Text> {language.text}
              </Text>
            ))}

            <Heading>Technical Proficiency</Heading>
            {cv.proficiency.map(group => (
              <Text key={group.label} style={s.spaced} wrap={false}>
                <Text style={s.bold}>{group.label}:</Text>{' '}
                {group.items.join(', ')}
              </Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
