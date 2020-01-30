import Link from 'next/link';
import styled from 'styled-components';
import PageImg from './PageImg';

const PageContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    max-width: 600px;
  }
`;

const PageNavContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  max-width: 600px;
  h3 {
    margin: 0;
  }
  a, h3 {
    text-transform: uppercase;
  }
  div, h3 {
    flex: 1;
    text-align: center;
  }
`;

const ReadLink = ({readUrl, children}) => {
  if (!readUrl) {
    return null;
  }
  return (
    <Link href="/read/[chapter]/[page]" as={readUrl}>
      <a>{children}</a>
    </Link>
  );
};

const SinglePage = ({ chapter, pageIndex, prevPage = {}, nextPage = {} }) => {
  return (
    <PageContainer>
      <h2>Chapter {chapter.number}: {chapter.title}</h2>
      <PageNavContainer>
        <div>
          <ReadLink readUrl={prevPage.readUrl}>prev</ReadLink>
        </div>
        <h3>{ pageIndex > 0 ? `page ${pageIndex}` : 'cover' }</h3>
        <div>
          <ReadLink readUrl={nextPage.readUrl}>next</ReadLink>
        </div>
      </PageNavContainer>     
      <PageImg src={chapter.pages[pageIndex]}/>
    </PageContainer>
  );
}

export default SinglePage;