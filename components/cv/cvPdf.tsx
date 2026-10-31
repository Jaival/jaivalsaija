import {
  Defs,
  Document,
  Image,
  LinearGradient,
  Link,
  Page,
  Polyline,
  Rect,
  Stop,
  StyleSheet,
  Svg,
  Text,
  View,
} from '@react-pdf/renderer';
import { cv, yearSpan, type CvEntry, type CvLanguage } from '@/utils/cv';
import { photo, plainText, rich } from './pdfShared';

// The PDF layout, rendered by scripts/cv-pdf.tsx to public/cv.pdf: a white
// page in the site's style, built from the same data as /cv (cvPage.tsx).
// Change the PDF's look here and the words in utils/cv.ts. Sizes are in
// points (72 per inch); A4 is 595 × 842.

// The site's light theme (app/globals.css), converted from OKLCH.
const c = {
  fg: '#04191f',
  body: '#24363d',
  muted: '#54676d',
  primary: '#00717c',
  to: '#036eae',
  tint: '#e9f2f3',
  border: '#d9e4e6',
  success: '#007e46',
  successTint: '#edf6f1',
  successBorder: '#a3d1b6',
};

const side = 171;
const footerHeight = 34;

const barWidth: Record<CvLanguage['level'], number> = {
  A1: 0.18,
  A2: 0.3,
  B1: 0.48,
  B2: 0.65,
  C1: 0.85,
  C2: 0.95,
  Native: 1,
};

const s = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingBottom: footerHeight,
    paddingHorizontal: 34,
    fontFamily: 'space-grotesk',
    fontSize: 9,
    lineHeight: 1.38,
    color: c.body,
    ...plainText,
  },
  strip: { position: 'absolute', top: 0, left: 0 },
  // Placed from the top: react-pdf puts a fixed element with `bottom` set
  // far below the page.
  footer: {
    position: 'absolute',
    top: 812,
    left: 34,
    right: 34,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTop: `0.75pt solid ${c.border}`,
    paddingTop: 4,
    fontSize: 7.5,
    color: c.muted,
  },
  bold: { fontWeight: 700 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  photoRing: {
    padding: 2.5,
    border: `1.5pt solid ${c.primary}`,
    borderRadius: 12,
  },
  photo: { width: 74, height: 74, borderRadius: 9, objectFit: 'cover' },
  name: {
    fontSize: 30,
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: -0.9,
    color: c.fg,
  },
  headline: {
    fontSize: 10,
    fontWeight: 600,
    color: c.primary,
    marginTop: 4,
    marginBottom: 6,
  },
  contacts: { flexDirection: 'row', flexWrap: 'wrap', columnGap: 10 },
  contact: { flexDirection: 'row', alignItems: 'center', color: c.fg },
  contactDot: {
    width: 3.75,
    height: 3.75,
    borderRadius: 2,
    backgroundColor: c.primary,
    marginRight: 4,
  },
  link: { color: c.fg, textDecoration: 'none' },
  permit: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 4,
    marginTop: 6,
    paddingVertical: 1.5,
    paddingHorizontal: 7.5,
    border: `0.75pt solid ${c.successBorder}`,
    borderRadius: 10,
    backgroundColor: c.successTint,
    color: c.success,
    fontSize: 7.75,
    fontWeight: 600,
  },
  columns: { flexDirection: 'row', gap: 18 },
  main: { flex: 1 },
  side: { width: side },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 7,
  },
  headingText: { fontSize: 12, fontWeight: 700, color: c.fg },
  section: { marginBottom: 10 },
  item: { marginBottom: 8 },
  titleRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  title: {
    flex: 1,
    fontSize: 10,
    fontWeight: 700,
    color: c.fg,
    lineHeight: 1.25,
  },
  titleRest: { fontWeight: 400, color: c.muted },
  year: {
    backgroundColor: c.primary,
    color: '#fff',
    fontSize: 7.5,
    fontWeight: 700,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 0.75,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 3,
    marginTop: 3,
    marginBottom: 2,
  },
  tag: {
    fontSize: 7.5,
    backgroundColor: c.tint,
    border: `0.75pt solid ${c.border}`,
    borderRadius: 3.5,
    paddingHorizontal: 4.5,
    color: c.fg,
  },
  tagLink: {
    fontSize: 7.75,
    fontWeight: 600,
    color: c.primary,
    textDecoration: 'none',
    marginLeft: 2,
  },
  role: { fontSize: 9, fontWeight: 600, color: c.primary },
  dates: { fontSize: 7.75, fontWeight: 400, color: c.muted },
  bullet: { flexDirection: 'row', marginTop: 1.5 },
  dot: {
    width: 3.75,
    height: 3.75,
    borderRadius: 2,
    backgroundColor: c.primary,
    marginLeft: 1.5,
    marginRight: 6,
    marginTop: 4.5,
  },
  bulletText: { flex: 1 },
  gap: {
    border: `1pt dashed ${c.border}`,
    borderRadius: 6,
    paddingVertical: 3.5,
    paddingHorizontal: 7.5,
    marginBottom: 8,
    fontSize: 9,
    fontWeight: 700,
    color: c.fg,
  },
  panel: {
    backgroundColor: c.tint,
    border: `0.75pt solid ${c.border}`,
    borderRadius: 9,
    paddingTop: 9,
    paddingHorizontal: 10.5,
    paddingBottom: 4,
    marginBottom: 9,
  },
  panelHeading: { fontSize: 10.5, fontWeight: 700, color: c.fg },
  panelTitle: { fontSize: 8.6, fontWeight: 700, color: c.fg },
  panelText: { fontSize: 8, lineHeight: 1.34, color: c.body, marginBottom: 5 },
  group: {
    fontSize: 7,
    fontWeight: 700,
    letterSpacing: 0.6,
    color: c.primary,
    marginTop: 4,
    marginBottom: 2,
  },
  pills: { flexDirection: 'row', flexWrap: 'wrap', gap: 2.5, marginBottom: 3 },
  pill: {
    fontSize: 7.5,
    color: c.fg,
    backgroundColor: '#fff',
    border: `0.75pt solid ${c.border}`,
    borderRadius: 8,
    paddingHorizontal: 5,
  },
  pillLearning: {
    fontSize: 7.5,
    color: c.muted,
    border: `0.75pt dashed ${c.border}`,
    borderRadius: 8,
    paddingHorizontal: 5,
  },
  langName: { fontSize: 8.25, fontWeight: 700, color: c.fg },
  langLevel: { fontSize: 7.75, lineHeight: 1.3, color: c.muted },
  bar: {
    height: 4,
    backgroundColor: '#fff',
    border: `0.75pt solid ${c.border}`,
    borderRadius: 2,
    marginTop: 2,
    marginBottom: 4.5,
    overflow: 'hidden',
  },
});

/** The site's teal-to-blue gradient. react-pdf has no CSS gradients, so it's drawn. */
function Gradient({ width, height }: { width: number; height: number }) {
  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient id='brand' x1='0' y1='0' x2='1' y2='0'>
          <Stop offset='0' stopColor={c.primary} />
          <Stop offset='1' stopColor={c.to} />
        </LinearGradient>
      </Defs>
      <Rect
        width={width}
        height={height}
        rx={Math.min(height / 2, 2)}
        fill='url(#brand)'
      />
    </Svg>
  );
}

function Heading({ children }: { children: string }) {
  return (
    <View style={s.heading} minPresenceAhead={60}>
      <Gradient width={13.5} height={2.25} />
      <Text style={s.headingText}>{children}</Text>
    </View>
  );
}

function PanelHeading({ children }: { children: string }) {
  return (
    <View style={[s.heading, { marginBottom: 5 }]}>
      <Gradient width={11} height={2} />
      <Text style={s.panelHeading}>{children}</Text>
    </View>
  );
}

function Bullets({ items }: { items: string[] }) {
  return items.map(item => (
    <View key={item} style={s.bullet} wrap={false}>
      <View style={s.dot} />
      <Text style={s.bulletText}>{rich(item, s.bold)}</Text>
    </View>
  ));
}

function TitleRow({
  name,
  rest,
  badge,
}: {
  name: string;
  rest?: string;
  badge?: string;
}) {
  return (
    <View style={s.titleRow}>
      <Text style={s.title}>
        {name}
        {rest && <Text style={s.titleRest}> · {rest}</Text>}
      </Text>
      {badge && <Text style={s.year}>{badge}</Text>}
    </View>
  );
}

function Entry({ entry }: { entry: CvEntry }) {
  // An entry without a role explains time between jobs: a note, not a job.
  if (!entry.role) {
    return (
      <Text style={s.gap} wrap={false}>
        {entry.org}
        <Text style={s.titleRest}> · {entry.dates}</Text>
      </Text>
    );
  }
  return (
    <View style={s.item}>
      <View wrap={false} minPresenceAhead={30}>
        <TitleRow
          name={entry.org}
          rest={entry.place}
          badge={yearSpan(entry.dates)}
        />
        <Text style={s.role}>
          {entry.role}
          <Text style={s.dates}> · {entry.dates}</Text>
        </Text>
      </View>
      <Bullets items={entry.bullets} />
    </View>
  );
}

export default function CvPdf() {
  return (
    <Document title={`${cv.name} CV`} author={cv.name} language='en'>
      <Page size='A4' style={s.page}>
        <View style={s.strip} fixed>
          <Gradient width={595.28} height={4.5} />
        </View>
        <View style={s.footer} fixed>
          <Text>{cv.name} · CV</Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `jaivalsaija.vercel.app · ${pageNumber} / ${totalPages}`
            }
          />
        </View>

        <View style={s.header}>
          <View style={s.photoRing}>
            {/* eslint-disable-next-line jsx-a11y/alt-text -- react-pdf's Image has no alt prop */}
            <Image style={s.photo} src={photo} />
          </View>
          <View style={s.main}>
            <Text style={s.name}>{cv.name}</Text>
            <Text style={s.headline}>
              {cv.headline.replaceAll(' | ', ' · ')}
            </Text>
            <View style={s.contacts}>
              <View style={s.contact}>
                <View style={s.contactDot} />
                <Text>{cv.location}</Text>
              </View>
              <View style={s.contact}>
                <View style={s.contactDot} />
                <Link style={s.link} src={`mailto:${cv.email}`}>
                  {cv.email}
                </Link>
              </View>
              {cv.links.map(link => (
                <View key={link.href} style={s.contact}>
                  <View style={s.contactDot} />
                  <Link style={s.link} src={link.href}>
                    {link.label}
                  </Link>
                </View>
              ))}
            </View>
            <View style={s.permit}>
              <Svg width={7} height={7} viewBox='0 0 10 10'>
                <Polyline
                  points='1.5,5.5 4,8 8.5,2'
                  stroke={c.success}
                  strokeWidth={1.6}
                  fill='none'
                />
              </Svg>
              <Text>
                Nationality: {cv.nationality} · {cv.permit}
              </Text>
            </View>
          </View>
        </View>

        <View style={s.columns}>
          <View style={s.main}>
            <View style={s.section}>
              <Heading>Projects</Heading>
              {cv.projects.map(project => (
                <View key={project.name} style={s.item}>
                  <View wrap={false} minPresenceAhead={30}>
                    <TitleRow
                      name={project.name}
                      rest={project.tagline}
                      badge={project.year}
                    />
                    <View style={s.tags}>
                      {project.stack.map(tech => (
                        <Text key={tech} style={s.tag}>
                          {tech}
                        </Text>
                      ))}
                      <Link style={s.tagLink} src={project.link.href}>
                        {project.link.label}
                      </Link>
                    </View>
                  </View>
                  <Bullets items={project.bullets} />
                </View>
              ))}
            </View>

            <View style={s.section}>
              <Heading>Experience</Heading>
              {cv.experience.map(entry => (
                <Entry key={entry.org + entry.dates} entry={entry} />
              ))}
            </View>

            <View style={s.section}>
              <Heading>Education</Heading>
              {cv.education.map(entry => (
                <Entry key={entry.org + entry.dates} entry={entry} />
              ))}
            </View>

            <View style={s.section}>
              <Heading>Certifications</Heading>
              <Bullets items={cv.certifications} />
            </View>
          </View>

          {/* Each panel moves to the next page whole rather than splitting. */}
          <View style={s.side}>
            <View style={s.panel} wrap={false}>
              <PanelHeading>Skills</PanelHeading>
              {cv.skills.map(skill => (
                <View key={skill.title}>
                  <Text style={s.panelTitle}>{skill.title}</Text>
                  <Text style={s.panelText}>{skill.points.join(' ')}</Text>
                </View>
              ))}
            </View>

            <View style={s.panel} wrap={false}>
              <PanelHeading>Languages</PanelHeading>
              {cv.languages.map(language => (
                <View key={language.name}>
                  <Text style={s.langName}>{language.name}</Text>
                  <Text style={s.langLevel}>{language.text}</Text>
                  <View style={s.bar}>
                    <View
                      style={{
                        width: `${barWidth[language.level] * 100}%`,
                        overflow: 'hidden',
                      }}
                    >
                      <Gradient width={side} height={4} />
                    </View>
                  </View>
                </View>
              ))}
            </View>

            <View style={s.panel} wrap={false}>
              <PanelHeading>Tech stack</PanelHeading>
              {cv.proficiency.map(group => (
                <View key={group.label}>
                  <Text style={s.group}>{group.label.toUpperCase()}</Text>
                  <View style={s.pills}>
                    {group.items.map(item => (
                      <Text
                        key={item}
                        style={
                          group.label === 'Learning' ? s.pillLearning : s.pill
                        }
                      >
                        {item}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}
              <View style={{ height: 4 }} />
            </View>

            <View style={s.panel} wrap={false}>
              <PanelHeading>Leadership</PanelHeading>
              {cv.leadership.map(item => (
                <View key={item.title}>
                  <Text style={s.panelTitle}>{item.title}</Text>
                  <Text style={s.panelText}>{item.text}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
