// import App from 'next/app'
import { useState } from 'react';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';

function MyApp({ Component, pageProps }) {
  
  const { chapters: initialChapters = [] } = pageProps;
  const [chapters, setChapters] = useState(initialChapters);
  
  const allProps = {
    ...pageProps,
    chapters,
    setChapters,
  }
  
  const seoDescription = 'A story about cats by Chobberchobber.';
  const seoImgUrl = 'https://drive.google.com/uc?id=1mH8s2oQtuoeeZ90-j7U-hfiB8wZ_Qsxs';
  
  const defaultSeoProps = {
    title: 'Shifters',
    description: seoDescription,
    openGraph: {
      title: 'Shifters',
      description: seoDescription,
      images: [{ url: seoImgUrl }],
      site_name: 'Shifters by Chobberchobber',
    }
  };
  
  return (
    <>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <DefaultSeo {...defaultSeoProps} />
      <Component {...allProps} />
    </>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp