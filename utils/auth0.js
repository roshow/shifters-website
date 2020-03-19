import { initAuth0 } from '@auth0/nextjs-auth0';
import absoluteUrl from 'next-absolute-url';

export default (req) => {
  const { origin } = absoluteUrl(req, 'localhost:3000');

  return initAuth0({
    domain: process.env.AUTH_DOMAIN,
    clientId: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    scope: 'openid profile',
    redirectUri: `${origin}/api/callback`,
    postLogoutRedirectUri: origin,
    session: {
      // The secret used to encrypt the cookie.
      cookieSecret: 'rfgeslrsvgbelgbelsegehlbdglhgbldhtjvbbhv',
      // The cookie lifetime (expiration) in seconds. Set to 8 hours by default.
      cookieLifetime: 60 * 60 * 8,
    },
  });
}