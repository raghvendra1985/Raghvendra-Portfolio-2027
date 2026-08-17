import React from "react";
import { Document, Page, Text, View, Link, StyleSheet, Font } from "@react-pdf/renderer";
import { resume } from "./resume-data";

Font.registerHyphenationCallback((word) => [word]);

const navy = "#0B1849";
const muted = "#3D4A6B";
const rule = "#0B1849";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9,
    color: navy,
    backgroundColor: "#FFFFFF",
    paddingTop: 38,
    paddingBottom: 34,
    paddingHorizontal: 44,
  },
  name: {
    fontFamily: "Helvetica-Bold",
    fontSize: 20,
    letterSpacing: -0.4,
    lineHeight: 1.1,
  },
  headline: {
    marginTop: 6,
    fontSize: 10,
    letterSpacing: 0.15,
    color: navy,
  },
  meta: {
    marginTop: 6,
    fontSize: 8.5,
    color: muted,
    lineHeight: 1.45,
  },
  link: {
    color: navy,
    textDecoration: "none",
  },
  hairline: {
    marginTop: 12,
    marginBottom: 10,
    height: 1.25,
    backgroundColor: rule,
  },
  section: {
    marginBottom: 9,
  },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    letterSpacing: 0.4,
    textTransform: "uppercase",
    color: navy,
    marginBottom: 5,
  },
  profile: {
    fontSize: 9.25,
    lineHeight: 1.42,
    color: navy,
  },
  expertiseRow: {
    flexDirection: "row",
    marginBottom: 2.5,
    alignItems: "flex-start",
  },
  expertiseLabel: {
    width: 72,
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: navy,
    paddingTop: 1,
  },
  expertiseItems: {
    flex: 1,
    fontSize: 8.5,
    color: muted,
    lineHeight: 1.35,
  },
  role: {
    marginBottom: 7,
  },
  roleHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  org: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    flex: 1,
    lineHeight: 1.25,
  },
  dates: {
    fontSize: 8,
    color: muted,
    textAlign: "right",
  },
  roleTitle: {
    marginTop: 1,
    fontSize: 9,
    color: navy,
  },
  roleMeta: {
    marginTop: 1,
    fontSize: 8,
    color: muted,
  },
  scope: {
    marginTop: 3,
    fontSize: 8.75,
    lineHeight: 1.35,
    color: navy,
  },
  bullet: {
    flexDirection: "row",
    marginTop: 2.5,
    alignItems: "flex-start",
  },
  bulletMark: {
    width: 10,
    fontSize: 8.5,
    color: navy,
  },
  bulletText: {
    flex: 1,
    fontSize: 8.75,
    lineHeight: 1.35,
    color: navy,
  },
  selectedRow: {
    flexDirection: "row",
    marginBottom: 2.5,
    alignItems: "flex-start",
  },
  selectedName: {
    width: 108,
    fontFamily: "Helvetica-Bold",
    fontSize: 8.5,
    color: navy,
    textDecoration: "none",
  },
  selectedDetail: {
    flex: 1,
    fontSize: 8.5,
    color: muted,
    lineHeight: 1.3,
  },
  eduRow: {
    marginBottom: 4,
  },
  eduSchool: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
  },
  eduMeta: {
    fontSize: 8.5,
    color: muted,
    marginTop: 1,
  },
  toolsRow: {
    flexDirection: "row",
    marginBottom: 2,
    alignItems: "flex-start",
  },
  toolsLabel: {
    width: 72,
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
  },
  toolsItems: {
    flex: 1,
    fontSize: 8.5,
    color: muted,
    lineHeight: 1.35,
  },
  workshops: {
    fontSize: 8.75,
    lineHeight: 1.4,
    color: navy,
  },
});

type Role = {
  org: string;
  title: string;
  dates: string;
  meta: string;
  scope?: string;
  bullets: readonly string[];
};

function RoleBlock({ role }: { role: Role }) {
  return (
    <View style={styles.role} wrap={false}>
      <View style={styles.roleHead}>
        <Text style={styles.org}>{role.org}</Text>
        <Text style={styles.dates}>{role.dates}</Text>
      </View>
      <Text style={styles.roleTitle}>{role.title}</Text>
      <Text style={styles.roleMeta}>{role.meta}</Text>
      {role.scope ? <Text style={styles.scope}>{role.scope}</Text> : null}
      {role.bullets.map((bullet) => (
        <View key={bullet} style={styles.bullet}>
          <Text style={styles.bulletMark}>•</Text>
          <Text style={styles.bulletText}>{bullet}</Text>
        </View>
      ))}
    </View>
  );
}

function Header() {
  return (
    <View>
      <Text style={styles.name}>{resume.name}</Text>
      <Text style={styles.headline}>{resume.headline}</Text>
      <Text style={styles.meta}>{resume.location}</Text>
      <Text style={styles.meta}>
        <Link src={resume.portfolioUrl} style={styles.link}>
          {resume.portfolioLabel}
        </Link>
        {"  ·  "}
        <Link src={resume.linkedinUrl} style={styles.link}>
          {resume.linkedinLabel}
        </Link>
        {"  ·  "}
        <Link src={`mailto:${resume.email}`} style={styles.link}>
          {resume.email}
        </Link>
      </Text>
      <View style={styles.hairline} />
    </View>
  );
}

export function ResumeDocument() {
  return (
    <Document
      title="Raghvendra Singh — Product Design Leader"
      author="Raghvendra Singh"
      subject="Product Design Leadership resume"
      keywords="Product Design, UX, DesignOps, AI products, Design Systems"
      language="en"
      creator="Raghvendra Singh"
      producer="raghvendrasingh.com"
    >
      <Page size="A4" style={styles.page}>
        <Header />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Executive Profile</Text>
          <Text style={styles.profile}>{resume.profile}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Core Expertise</Text>
          {resume.expertise.map((row) => (
            <View key={row.label} style={styles.expertiseRow}>
              <Text style={styles.expertiseLabel}>{row.label}</Text>
              <Text style={styles.expertiseItems}>{row.items}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {resume.experience.page1.map((role) => (
            <RoleBlock key={role.org} role={role} />
          ))}
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience (continued)</Text>
          {resume.experience.page2.map((role) => (
            <RoleBlock key={role.org} role={role} />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Selected Product & Enterprise Work</Text>
          {resume.selectedWork.map((item) => (
            <View key={item.name} style={styles.selectedRow}>
              <Link src={item.href} style={styles.selectedName}>
                {item.name}
              </Link>
              <Text style={styles.selectedDetail}>{item.detail}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education Leadership</Text>
          <RoleBlock role={resume.teachingRole} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {resume.education.map((item) => (
            <View key={item.school} style={styles.eduRow} wrap={false}>
              <Text style={styles.eduSchool}>{item.school}</Text>
              <Text style={styles.eduMeta}>
                {item.credential} · {item.dates}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tools</Text>
          {resume.tools.map((row) => (
            <View key={row.label} style={styles.toolsRow}>
              <Text style={styles.toolsLabel}>{row.label}</Text>
              <Text style={styles.toolsItems}>{row.items}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Teaching & Workshops</Text>
          <Text style={styles.workshops}>{resume.workshops}</Text>
        </View>
      </Page>
    </Document>
  );
}
