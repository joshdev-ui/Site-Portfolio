import { useState } from 'react';
import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Input } from '~/components/input';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import { Transition } from '~/components/transition';
import { baseMeta } from '~/utils/meta';
import config from '~/config.json';
import styles from './contact.module.css';

export const meta = () => baseMeta({ title: 'Contact', description: 'Get in touch with Joshua Sarno about IT internships, web development, and mobile applications.' });

export const Contact = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [prepared, setPrepared] = useState(false);
  const mailto = `mailto:${config.email}?subject=${encodeURIComponent('Portfolio enquiry')}&body=${encodeURIComponent(`From: ${email}\n\n${message}`)}`;
  function compose(event) {
    event.preventDefault();
    setPrepared(true);
    window.location.href = mailto;
  }
  return (
    <Section className={styles.contact}>
      <Transition in timeout={1000}>
        {({ status, nodeRef }) => (
          <form className={styles.form} onSubmit={compose} ref={nodeRef}>
            <Heading className={styles.title} data-status={status} level={3} as="h1">
              <DecoderText text="Say hello" start={status !== 'exited'} delay={300} />
            </Heading>
            <Divider className={styles.divider} data-status={status} />
            <Text as="p" style={{ marginBottom: '24px' }}>Have an internship opportunity or a project in mind? Let’s talk.</Text>
            <Input required className={styles.input} data-status={status} autoComplete="email" label="Your email" type="email" name="email" maxLength={254} value={email} onChange={event => setEmail(event.target.value)} />
            <Input required multiline className={styles.input} data-status={status} label="Message" name="message" maxLength={2000} value={message} onChange={event => setMessage(event.target.value)} />
            <Button className={styles.button} data-status={status} icon="send" type="submit">Open email draft</Button>
            <Text as="p" size="s" style={{ marginTop: '24px' }}>Opens your email app so you can review and send your message.</Text>
            <Text as="p" size="s" style={{ marginTop: '12px', overflowWrap: 'anywhere' }}><a href={`mailto:${config.email}`}>{config.email}</a></Text>
            <Text as="p" size="s" role="status" style={{ marginTop: '12px' }}>{prepared ? 'Your draft is ready in your email app. If it did not open, email me directly using the address above.' : 'Based in Bohol, Philippines.'}</Text>
          </form>
        )}
      </Transition>
      <Footer className={styles.footer} />
    </Section>
  );
};
