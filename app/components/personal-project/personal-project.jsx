import { Button } from '~/components/button';
import { Footer } from '~/components/footer';
import { Link } from '~/components/link';
import { Text } from '~/components/text';
import { PhoneGallery } from '~/components/phone-gallery';
import {
  ProjectContainer, ProjectHeader, ProjectImage,
  ProjectSection, ProjectSectionColumns, ProjectSectionContent,
  ProjectSectionHeading, ProjectSectionText, ProjectTextRow,
} from '~/layouts/project';
import styles from './personal-project.module.css';

export function PersonalProject({ title, description, roles, screenshots, image, imageAlt, imageWidth, imageHeight, overview, features, stack, secondaryImage, secondaryImageAlt, secondaryImageWidth, secondaryImageHeight, previewCaption, credit, mobile }) {
  const width = imageWidth || (mobile ? 750 : 1280);
  const height = imageHeight || (mobile ? 1500 : 800);
  return (
    <>
      <ProjectContainer>
        <ProjectHeader title={title} description={description} roles={roles} />
        <ProjectSection padding="top">
          <ProjectSectionContent>
            {screenshots?.length ? (
              <PhoneGallery images={screenshots} title={title} />
            ) : (
              <figure className={styles.figure}>
                <div className={styles.previews} data-mobile={mobile}>
                  <ProjectImage src={image} alt={imageAlt} width={width} height={height} className={styles.preview} />
                  {secondaryImage && <ProjectImage src={secondaryImage} alt={secondaryImageAlt} width={secondaryImageWidth || width} height={secondaryImageHeight || height} className={styles.preview} />}
                </div>
                {previewCaption && <Text as="figcaption" size="s" secondary className={styles.caption}>{previewCaption}</Text>}
              </figure>
            )}
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>The idea</ProjectSectionHeading>
              {overview.map(paragraph => <ProjectSectionText key={paragraph}>{paragraph}</ProjectSectionText>)}
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection light>
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>What I built</ProjectSectionHeading>
              <ProjectSectionText>{features.intro}</ProjectSectionText>
            </ProjectTextRow>
            <div className={styles.features}>
              {features.items.map(({ title, description }, index) => (
                <div className={styles.feature} key={title}>
                  <Text size="s" secondary className={styles.number}>{String(index + 1).padStart(2, '0')}</Text>
                  <ProjectSectionHeading level={4} as="h3">{title}</ProjectSectionHeading>
                  <ProjectSectionText>{description}</ProjectSectionText>
                </div>
              ))}
            </div>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection>
          <ProjectSectionColumns>
            <div>
              <ProjectSectionHeading>Behind the build</ProjectSectionHeading>
              <ProjectSectionText>{stack.description}</ProjectSectionText>
              {credit && <ProjectSectionText>Based on the open-source portfolio by <Link href="https://github.com/HamishMW/portfolio">Hamish Williams</Link>, with the original MIT license preserved.</ProjectSectionText>}
            </div>
            <ul className={styles.stack} aria-label="Project technologies">
              {stack.items.map(item => <li key={item}><Text size="l">{item}</Text></li>)}
            </ul>
          </ProjectSectionColumns>
        </ProjectSection>
        <ProjectSection padding="bottom">
          <ProjectSectionContent>
            <ProjectTextRow>
              <ProjectSectionHeading>Let’s talk about it</ProjectSectionHeading>
              <ProjectSectionText>Interested in the project or how I approach development? Get in touch.</ProjectSectionText>
              <div className={styles.actions}>
                <Button secondary icon="chevron-right" iconHoverShift href="/contact">Contact me</Button>
                <Link href="/#project-1">Back to projects</Link>
              </div>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </>
  );
}
