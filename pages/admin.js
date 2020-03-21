import { useState } from 'react';
import Router from "next/router";
import Link from 'next/link';
import axios from 'axios';
import styled from 'styled-components';
import auth0 from '../utils/auth0';

const StyledAdmin = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;

  button {
    font-size: 20px;
    cursor: pointer;
  }
`

const AdminPage = ({ setChapters }) => {

  const [didPublish, setDidPublish] = useState(false);

  const [isPublishing, setIsPublishing] = useState(false);

  const [isErrorPublishing, setIsErrorPublishing] = useState(false);

  const publishChapters = async () => {
    setIsPublishing(true);
    setDidPublish(false);
    try {
      const { data } = await axios.post('/api/create-index');
      setChapters(data);
    } catch (e) {
      setIsErrorPublishing(true);
    }
    setDidPublish(true);
    setIsPublishing(false);
  };

  return (
    <StyledAdmin>
      {isPublishing && <h4>Publishing in progress...</h4>}
      
      {isErrorPublishing 
        && <h4>Something went wrong. Refresh the page & try again. If it still fails, tell Rolando.</h4>}
      
      {didPublish && !isErrorPublishing && <h4>Last publish was successful.</h4>}

      {!isPublishing && !isErrorPublishing && <button onClick={publishChapters}>Publish Shifters Chapters</button>}

      <h4><Link href="/allpages"><a>Go See All Pages</a></Link></h4>
    </StyledAdmin>
  );
};

AdminPage.getInitialProps = async (ctx) => {
  if (typeof window === 'undefined') {
    const session = await auth0.getSession(ctx.req);
    const user = session?.user;
    if (!user) {
      ctx.res.writeHead(302, {
        Location: '/api/login'
      });
      ctx.res.end();
      return;
    }
    return { user };
  }

  try {
    const { data } = await axios('/api/me');
    return { user: data };
  } catch (e) {
    console.log('client side booting you');
    Router.push('/api/login');
    return {};
  }

  
};

export default AdminPage;


