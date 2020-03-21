import { useEffect } from 'react';
import axios from 'axios';
import absoluteUrl from 'next-absolute-url';

const API_ENDPOINT = '/api/chapters';

const fetchChapters = async (req) => {
  const { origin } = absoluteUrl(req, 'localhost:3000');
  const { data } = await axios(`${origin}${API_ENDPOINT}`);
  return data;
}

const withChapters = (PageComponent) => {
  const PageWithChapters = (props) => {
    const { chapters, setChapters } = props;
    
    useEffect(() => {
      if (!chapters.length) {
        fetchChapters().then(setChapters); // hey look, a promise!
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
    if (typeof window === 'undefined') {
      chapters = await fetchChapters(ctx.req);
    }
    
    return { ...pageProps, chapters };
  };
  
  return PageWithChapters;
};

export default withChapters;
