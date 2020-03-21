import { initAuth0 } from '@auth0/nextjs-auth0';

const SITE_URI = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://shifters-website.now.sh';

export default initAuth0({
  domain: process.env.AUTH_DOMAIN,
  clientId: process.env.AUTH_CLIENT_ID,
  clientSecret: process.env.AUTH_CLIENT_SECRET,
  scope: 'openid email profile',
  redirectUri: `${SITE_URI}/api/callback`,
  postLogoutRedirectUri: SITE_URI,
  session: {
    // The secret used to encrypt the cookie.
    cookieSecret: process.env.COOKIE_SECRET,
    // The cookie lifetime (expiration) in seconds. Set to 8 hours by default.
    cookieLifetime: 60 * 60 * 8,
  },
});