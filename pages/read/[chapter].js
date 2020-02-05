import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import PageImg from './../../components/PageImg';
import ReadModeToggle from './../../components/ReadModeToggle';
import withChapters from '../../components/withChapters';

const StyledChapter = styled.div`
  width: 100%;
  max-width: 600px;
  h2 {
    text-align: center;
  }
`;

const StyledNav = styled.div`
  display: flex;
  width: 100%;
  > span {
    flex: 1;
    text-align: center;
  }
  a {
    text-transform: uppercase;
  }
`


const ChapterNav = ({ chapterNumber, isLast}) => (
  <StyledNav>
    <span>
      {chapterNumber > 1  && (
        <Link href="/read/[chapter]" as={`/read/${chapterNumber - 1}`}>
          <a>prev chapter</a>
        </Link>
      )}
    </span>
    <span>
      {!isLast && (
        <Link href="/read/[chapter]" as={`/read/${chapterNumber + 1}`}>
          <a>next chapter</a>
        </Link>
      )}
    </span>
  </StyledNav>
);


const Chapter = ({ chapters }) => {
  
  const router = useRouter();
  
  const { chapter } = router.query;
  
  const chapterIndex = parseInt(chapter, 10) - 1;

  const { title, pages } = chapters[chapterIndex];

  const isLastChapter = !chapters[chapterIndex + 1];
  
  return (
    <StyledChapter>
      <ReadModeToggle chapter={chapter} mode="chapter" />
      <h2>Chapter {chapter}: {title}</h2>
      <ChapterNav isLast={isLastChapter} chapterNumber={chapterIndex + 1} />
      {pages.map(pageId => <PageImg key={pageId} src={pageId} />)}
      <ChapterNav isLast={isLastChapter} chapterNumber={chapterIndex + 1} />
    </StyledChapter>
  );
  
};

export default withChapters(Chapter);