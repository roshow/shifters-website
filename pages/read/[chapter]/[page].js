import { useRouter } from 'next/router';
import SinglePage from './../../../components/SinglePage';
import ReadModeToggle from './../../../components/ReadModeToggle';
import withChapters from '../../../components/withChapters';

const ChapterPage = ({ chapters }) => {

  const router = useRouter();

  const { chapter, page } = router.query;

  const chapterIndex = parseInt(chapter, 10) - 1;
  const pageIndex = parseInt(page, 10);

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
  
  const nextPage = {};
  
  if (nextPageIndex >= 0) {
    nextPage.readUrl = `/read/${nextChapterIndex}/${nextPageIndex}`;
    console.log({nextPage});
    nextPage.src = chapters[nextChapterIndex].pages[nextPageIndex];
  }
  
  const prevPage = {};
  
  if (prevPageIndex >= 0) {
    console.log({ prevPageIndex });
    prevPage.readUrl = `/read/${prevChapterIndex}/${prevPageIndex}`;
    prevPage.src = chapters[prevChapterIndex].pages[prevPageIndex];
  }
  
  return (
    <>
      <ReadModeToggle chapter={chapter} mode="page" />
      <SinglePage
        chapter={chapters[chapterIndex]}
        pageIndex={pageIndex}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </>
  );

}

export default withChapters(ChapterPage);