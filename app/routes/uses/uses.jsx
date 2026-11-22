import { Footer } from '~/components/footer';
import { Link } from '~/components/link';
import { List, ListItem } from '~/components/list';
import { Table, TableBody, TableCell, TableHeadCell, TableRow } from '~/components/table';
import {
  ProjectContainer, ProjectHeader, ProjectSection, ProjectSectionContent,
  ProjectSectionHeading, ProjectSectionText, ProjectTextRow,
} from '~/layouts/project';
import { baseMeta } from '~/utils/meta';
import styles from './uses.module.css';

export const meta = () => baseMeta({ title: 'Skills & education', description: 'Joshua Sarno’s web and mobile development skills, tools, and education at Holy Name University.' });

export const Uses = () => (
  <>
    <ProjectContainer className={styles.uses}>
      <ProjectHeader title="Skills & education" description="The technologies I work with, the tools I use, and the education behind my web and mobile development projects." />
      <ProjectSection padding="none" className={styles.section}>
        <ProjectSectionContent>
          <ProjectTextRow width="m">
            <ProjectSectionHeading>Development</ProjectSectionHeading>
            <ProjectSectionText as="div">
              <List>
                <ListItem><strong>Web development:</strong> HTML, CSS, JavaScript, TypeScript, React, Next.js, and Tailwind CSS.</ListItem>
                <ListItem><strong>Mobile development:</strong> Flutter and Dart.</ListItem>
                <ListItem><strong>Backend & databases:</strong> PHP, Laravel, Supabase, PostgreSQL, and SQLite.</ListItem>
              </List>
            </ProjectSectionText>
          </ProjectTextRow>
        </ProjectSectionContent>
      </ProjectSection>
      <ProjectSection padding="none" className={styles.section}>
        <ProjectSectionContent>
          <ProjectTextRow width="m">
            <ProjectSectionHeading>Tools & platforms</ProjectSectionHeading>
            <ProjectSectionText>I use Git and GitHub for version control, Visual Studio Code for development, and tools including Vercel, Cloudinary, and Socket.IO in my projects. I also have basic knowledge of Microsoft Word and Excel.</ProjectSectionText>
            <ProjectSectionText>My practical experience includes database integration, media uploads, offline access, and real-time messaging. Explore <Link href="/projects/nami">Nami</Link> to see how I bring lesson capture, organized materials, and offline study together.</ProjectSectionText>
          </ProjectTextRow>
        </ProjectSectionContent>
      </ProjectSection>
      <ProjectSection padding="none" className={styles.section}>
        <ProjectSectionContent>
          <ProjectTextRow stretch width="m">
            <ProjectSectionHeading>Education</ProjectSectionHeading>
            <Table>
              <TableBody>
                <TableRow><TableHeadCell>Degree</TableHeadCell><TableCell>Bachelor of Science in Information Technology</TableCell></TableRow>
                <TableRow><TableHeadCell>University</TableHeadCell><TableCell>Holy Name University</TableCell></TableRow>
                <TableRow><TableHeadCell>Location</TableHeadCell><TableCell>Tagbilaran City, Bohol, Philippines</TableCell></TableRow>
                <TableRow><TableHeadCell>Expected graduation</TableHeadCell><TableCell>April–May 2027</TableCell></TableRow>
                <TableRow><TableHeadCell>Academic honors</TableHeadCell><TableCell>Dean’s Lister — three recognitions during 2025–2026</TableCell></TableRow>
              </TableBody>
            </Table>
          </ProjectTextRow>
        </ProjectSectionContent>
      </ProjectSection>
      <ProjectSection padding="none" className={styles.section}>
        <ProjectSectionContent>
          <ProjectTextRow width="m">
            <ProjectSectionHeading>What’s next</ProjectSectionHeading>
            <ProjectSectionText>I’m seeking an IT internship or an entry-level opportunity in IT support or web development. I’m ready to contribute, learn from a team, and keep building practical applications.</ProjectSectionText>
            <ProjectSectionText><Link href="/contact">Let’s get in touch</Link> or explore my work on <Link href="https://github.com/JoshDev1207">GitHub</Link>.</ProjectSectionText>
          </ProjectTextRow>
        </ProjectSectionContent>
      </ProjectSection>
    </ProjectContainer>
    <Footer />
  </>
);
