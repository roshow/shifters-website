import { useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import absoluteUrl from 'next-absolute-url';

const withChapters = (PageComponent) => {
  const PageWithChapters = (props) => {
    const { chapters, setChapters } = props;
    
    useEffect(() => {
      if (!chapters.length) {
        (async () => {
          const res = await fetch('/api/chapters');
          const newChapters = await res.json();
          setChapters(newChapters);
        })();
      }
    },[chapters, setChapters]);
    
    if (!chapters.length) {
      return <h1>Loading...</h1>;
    }
    
    return <PageComponent {...props} />;
  };
  
  PageWithChapters.getInitialProps = async (ctx) => {
    let pageProps = {};
    
    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx);
    }
    
    let chapters = [];

    if (ctx.req) {
      let { origin } = absoluteUrl(ctx.req, 'localhost:3000');
      const res = await fetch(`${origin}/api/chapters`);
      chapters = await res.json();
    }
    
    return { ...pageProps, chapters };
  };
  
  return PageWithChapters;
};

export default withChapters;
