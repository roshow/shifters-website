import { useState } from 'react';
import Link from 'next/link';
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
    const res = await fetch('/api/create-index', {
      method: 'POST',
    });
    setDidPublish(true);
    if (res.status !== 200) {
      setIsErrorPublishing(true);
    } else {
      const newChapters = await res.json();
      setChapters(newChapters);
    }
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
  return {};
};

export default AdminPage;


