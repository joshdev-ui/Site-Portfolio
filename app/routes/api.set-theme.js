import { json, createCookieSessionStorage } from '@vercel/remix';

export async function action({ request }) {
  const formData = await request.formData();
  const theme = formData.get('theme') === 'light' ? 'light' : 'dark';

  const { getSession, commitSession } = createCookieSessionStorage({
    cookie: {
      name: '__session',
      httpOnly: true,
      maxAge: 604_800,
      path: '/',
      sameSite: 'lax',
      secrets: [process.env.SESSION_SECRET || 'local-portfolio-theme-preference'],
      secure: new URL(request.url).protocol === 'https:',
    },
  });

  const session = await getSession(request.headers.get('Cookie'));
  session.set('theme', theme);

  return json(
    { status: 'success' },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    }
  );
}
