import profileImgLarge from '~/assets/profile-large.jpg';
import profileImgPlaceholder from '~/assets/profile-placeholder.jpg';
import profileImg from '~/assets/profile.jpg';
import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Heading } from '~/components/heading';
import { Image } from '~/components/image';
import { Link } from '~/components/link';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { Fragment, useId, useState } from 'react';
import { media } from '~/utils/style';
import styles from './profile.module.css';

const ProfileText = ({ visible, titleId }) => (
  <Fragment>
    <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
      <DecoderText text="Hi, I’m Joshua" start={visible} delay={500} />
    </Heading>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      I’m Joshua, a fourth-year Information Technology student at Holy Name
      University in Bohol, Philippines. I build web and mobile applications,
      from offline study tools to online marketplaces. Explore my{' '}
      <Link href="/uses">skills and education</Link>.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      I’m looking for an IT internship or an entry-level opportunity where I can
      contribute, learn, and keep building. Have an opportunity or a project in mind?
      I’d love to hear from you.
    </Text>
  </Fragment>
);

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;
  const nameGradientId = `profile-name-${useId()}`;

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {({ visible, nodeRef }) => (
          <div className={styles.content} ref={nodeRef}>
            <div className={styles.column}>
              <ProfileText visible={visible} titleId={titleId} />
              <p className={styles.description} data-visible={visible}><a href="/Joshua-Sarno-Resume.docx" download>Download my résumé ↗</a></p>
              <Button
                secondary
                className={styles.button}
                data-visible={visible}
                href="/contact"
                icon="send"
              >
                Send me a message
              </Button>
            </div>
            <div className={styles.column}>
              <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!visible}
                  collapseDelay={1000}
                />
                <div className={styles.tagText} data-visible={visible}>
                  About me
                </div>
              </div>
              <div className={styles.image}>
                <Image
                  reveal
                  delay={100}
                  placeholder={profileImgPlaceholder}
                  srcSet={`${profileImg} 480w, ${profileImgLarge} 960w`}
                  width={960}
                  height={960}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt="Joshua Sarno, web and mobile developer"
                />
                <svg
                  className={styles.svg}
                  data-visible={visible}
                  viewBox="0 0 136 766"
                  role="img"
                  aria-label="Joshua in Japanese: ジョシュア"
                >
                  <defs>
                    <linearGradient id={nameGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--nameHighlight)" />
                      <stop offset="46%" stopColor="var(--nameCopper)" />
                      <stop offset="100%" stopColor="var(--nameDeepCopper)" />
                    </linearGradient>
                  </defs>
                  <text
                    className={styles.japaneseName}
                    x="68"
                    y="8"
                    textLength="750"
                    lengthAdjust="spacing"
                    fill={`url(#${nameGradientId})`}
                    stroke={`url(#${nameGradientId})`}
                    lang="ja"
                    aria-hidden="true"
                  >
                    ジョシュア
                  </text>
                </svg>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
