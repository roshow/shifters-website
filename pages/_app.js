// import App from 'next/app'
import { useState } from 'react';
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