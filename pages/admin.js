import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const StyledAdmin = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;

  button {
    font-size: 20px;
    cursor: pointer;
  }
`

const AdminPage = () => {

  const [didPublish, setDidPublish] = useState(false);

  const [isPublishing, setIsPublishing] = useState(false);

  const [isErrorPublishing, setIsErrorPublishing] = useState(false);

  const publishChapters = async () => {
    setIsPublishing(true);
    setDidPublish(false);
    try {
      await fetch('https://kind-sinoussi-a45d2a.netlify.com/.netlify/functions/create-shifters-index', {
        method: 'POST',
      });
      setDidPublish(true);
    } catch(e) {
      setIsErrorPublishing(true);
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

      <h4><Link href="/"><a>Return to main site.</a></Link></h4>
    </StyledAdmin>
  );
};

export default AdminPage;


