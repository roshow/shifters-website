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

const PreLoadingDiv = styled.div`
  height: 0px;
  width: 0px;
  overflow: hidden;
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
      
      <PageImg src={imgSrc} />
      
      <PreLoadingDiv>
        <PageImg src={prevPage.src} />
        <PageImg src={nextPage.src} />
      </PreLoadingDiv>
      
    </PageContainer>
  );
}

export default SinglePage;