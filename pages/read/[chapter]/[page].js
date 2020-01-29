import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';
import absoluteUrl from 'next-absolute-url';

const PageContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PageImage = styled.img`
  width: 100%;
  max-width: 600px;
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

const ChapterPage = props => {
  const [chapters] = useState(props.chapters);

  const router = useRouter();

  const { chapter, page } = router.query;

  const chapterIndex = parseInt(chapter, 10) - 1;
  const pageIndex = parseInt(page, 10);

  const pageId = chapters[chapterIndex].pages[pageIndex];

  let prevChapterIndex = chapterIndex;
  let prevPageIndex = pageIndex - 1;
  if (prevPageIndex < 0) {
    prevChapterIndex = chapterIndex - 1;
    if (prevChapterIndex > -1) {
      prevPageIndex = chapters[prevChapterIndex].pages.length - 1;
    }
  }
  
  let nextChapterIndex = chapterIndex;
  let nextPageIndex = pageIndex + 1;
  if (!chapters[chapterIndex].pages[nextPageIndex]) {
    nextChapterIndex = chapterIndex + 1;
    if (chapters[nextChapterIndex]) {
      nextPageIndex = 0;
    } else {
      nextPageIndex = -1;
    }
  }

  
  return (
    <PageContainer>
      <h2>Chapter {chapterIndex + 1}: {chapters[chapterIndex].title}</h2>
      <PageNavContainer>
        <div>
          {
            (prevPageIndex > -1) && (
              <Link href="/read/[chapter]/[page]" as={`/read/${prevChapterIndex + 1}/${prevPageIndex}`}>
                <a>prev</a>
              </Link>
            )
          }
        </div>
        <h3>{ pageIndex > 0 ? `page ${pageIndex}` : 'cover' }</h3>
        <div>
          {
            (nextPageIndex > -1) && (
              <Link href="/read/[chapter]/[page]" as={`/read/${nextChapterIndex + 1}/${nextPageIndex}`}>
                <a>next</a>
              </Link>
            )
          }
        </div>
      </PageNavContainer>     
      <PageImage src={`https://drive.google.com/uc?id=${pageId}`} alt=""/>
      
    </PageContainer>
  );

}

ChapterPage.getInitialProps = async ({ req }) => {
  
  if (req) {
    let { origin } = absoluteUrl(req, 'localhost:3000');
    const res = await fetch(`${origin}/api/chapters`);
    const chapters = await res.json();

    return { chapters };
  }

  return {}
};

export default ChapterPage;