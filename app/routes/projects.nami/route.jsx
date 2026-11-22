import { PersonalProject } from '~/components/personal-project';
import { baseMeta } from '~/utils/meta';
const title = 'Nami';
const description = 'An Android study companion that keeps notes, lecture photos, and references organized by subject—with saved materials available offline.';
export const meta = () => baseMeta({ title, description, prefix: 'Projects' });
const screenshots = [
  {
    src: '/images/nami-onboarding.jpg',
    alt: 'Nami onboarding: subject library, saved lessons, and the red panda study companion',
    label: 'Ready when you are',
    width: 1185,
    height: 2540,
  },
  {
    src: '/images/nami-import-schedule.jpg',
    alt: 'Nami import schedule screen with a timetable photo and options to take, upload, and read a schedule',
    label: 'Import your schedule',
    width: 1220,
    height: 2609,
  },
  {
    src: '/images/nami-subject-library.jpg',
    alt: 'Nami subject library with subject search, add a subject, and import a class schedule options',
    label: 'Your subjects, together',
    width: 1220,
    height: 2591,
  },
  {
    src: '/images/nami-today.jpg',
    alt: 'Nami Today dashboard with the next class, lesson capture, and subject navigation',
    label: 'Your day at a glance',
    width: 1220,
    height: 2598,
  },
];

export default function Nami() {
  return <PersonalProject
    title={title} description={description}
    roles={['Personal project', 'Sole developer', 'Mobile development']}
    screenshots={screenshots}
    overview={[
      'Nami is a student-focused Android application I developed using Flutter and Dart. It organizes lecture materials, editable notes, and study references by subject and class.',
      'The project focuses on keeping useful study materials together, including the photos students capture from whiteboards and presentation slides.',
    ]}
    features={{ intro: 'From capturing a lecture to reviewing it later, Nami supports the student’s study workflow.', items: [
      { title: 'Organized materials', description: 'Lecture materials, editable notes, and references stay grouped by subject and class.' },
      { title: 'Capture & review', description: 'Students can capture and upload photos of whiteboards and presentation slides, retaining the original images for later review.' },
      { title: 'Offline access', description: 'Saved study materials and lecture images remain accessible without an internet connection.' },
    ] }}
    stack={{ description: 'Flutter and Dart form the Android application. Supabase and SQLite are part of the data stack, supporting the project’s connected and offline study experience.', items: ['Flutter', 'Dart', 'Supabase', 'SQLite'] }}
  />;
}
