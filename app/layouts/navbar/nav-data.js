import config from '~/config.json';
export const navLinks = [
  { label: 'Projects', pathname: '/#project-1' },
  { label: 'Details', pathname: '/#details' },
  { label: 'Skills', pathname: '/uses' },
  { label: 'Contact', pathname: '/contact' },
];
export const socialLinks = [
  { label: 'GitHub', url: `https://github.com/${config.github}`, icon: 'github' },
  { label: 'Email Joshua', url: `mailto:${config.email}`, icon: 'send' },
];
