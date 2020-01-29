import { useRouter } from 'next/router';
import { ChapterView } from './../index';
import SinglePage from './../../components/SinglePage';
import ReadModeToggle from './../../components/ReadModeToggle';
import withChapters from '../../components/withChapters';

const Chapter = ({ chapters }) => {
  
  const router = useRouter();
  
  const { chapter } = router.query;
  
  const chapterIndex = parseInt(chapter, 10) - 1;
  
  return (
    <>
      <ReadModeToggle chapter={chapter} mode="chapter" />
      <ChapterView {...chapters[chapterIndex]} />
    </>
  );
  
};

export default withChapters(Chapter);