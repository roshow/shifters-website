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
    const { status } = await fetch('/api/create-index', {
      method: 'POST',
    });
    setDidPublish(true);
    if (status !== 200) {
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

      <h4><Link href="/allpages"><a>Go See All Pages</a></Link></h4>
    </StyledAdmin>
  );
};

export default AdminPage;


