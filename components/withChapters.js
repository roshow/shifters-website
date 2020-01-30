import { useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import absoluteUrl from 'next-absolute-url';

export default (PageComponent) => {
  
  const PageWithChapters = (props) => {
    const { chapters, setChapters } = props;
    
    useEffect(() => {
      if (!chapters) {
        (async () => {
          const res = await fetch('/api/chapters');
          const newChapters = await res.json();
          setChapters(newChapters);
        })();
      }
    },[chapters, setChapters]);
    
    if (!props.chapters) {
      return <h1>Loading...</h1>;
    }
    
    return <PageComponent {...props} />;
  };
  
  PageWithChapters.getInitialProps = async (ctx) => {
    let pageProps = {};
    
    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx);
    }
    
    if (ctx.req) {
      let { origin } = absoluteUrl(ctx.req, 'localhost:3000');
      const res = await fetch(`${origin}/api/chapters`);
      const chapters = await res.json();
      return { ...pageProps, chapters };
    }
    
    return pageProps;
  };
  
  return PageWithChapters;
  
};