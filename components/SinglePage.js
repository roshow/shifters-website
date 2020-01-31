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
  .hidden {
    height: 0px;
    width: 0px;
    overflow: hidden;
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

const SinglePage = ({ chapterData, pageIndex, prevPage = {}, nextPage = {} }) => {
  const { title, number, pages } = chapterData;
  const imgSrc = pages[pageIndex];
  return (
    <PageContainer>
      <h2>Chapter {number}: {title}</h2>
      
      <PageNavContainer>
        <div>
          {prevPage.readUrl && (
            <Link href="/read/[chapter]/[page]" as={prevPage.readUrl}>
              <a>prev</a>
            </Link>
          )}
        </div>
        
        <h3>{ pageIndex > 0 ? `page ${pageIndex}` : 'cover' }</h3>
        
        <div>
         {nextPage.readUrl && (
            <Link href="/read/[chapter]/[page]" as={nextPage.readUrl}>
              <a>next</a>
            </Link>
          )}

        </div>
      
      </PageNavContainer>
      
      <PageImg key={imgSrc} src={imgSrc} />
      <PageImg key={prevPage.src} src={prevPage.src} className="hidden"/>
      <PageImg key={nextPage.src} src={nextPage.src} className="hidden"/>
      
    </PageContainer>
  );
}

export default SinglePage;