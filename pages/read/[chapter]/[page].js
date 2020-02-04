import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import PageView from './../../../components/PageView';
import ReadModeToggle from './../../../components/ReadModeToggle';
import withChapters from '../../../components/withChapters';

const ChapterPage = ({ chapters }) => {

  const router = useRouter();

  const { query: { chapter, page } } = router;

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
    nextPage.readUrl = `/read/${nextChapterIndex + 1}/${nextPageIndex}`;
    nextPage.src = chapters[nextChapterIndex].pages[nextPageIndex];
  }
  
  const prevPage = {};
  
  if (prevPageIndex >= 0) {
    prevPage.readUrl = `/read/${prevChapterIndex + 1}/${prevPageIndex}`;
    prevPage.src = chapters[prevChapterIndex].pages[prevPageIndex];
  }
  
  const openGraphTitle = `Shifters, Chapter ${chapter}, ${pageIndex === 0 ? 'Cover' : `Page ${page}`}`;    
  const imgSrc = `https://drive.google.com/uc?id=${chapters[chapterIndex].pages[pageIndex]}`;
  
  const seoProps = {
    openGraph: {
      title: openGraphTitle,
      images: [
        { url: imgSrc },
      ]
    } 
  }
  
  return (
    <>
      <NextSeo {...seoProps} />
      <ReadModeToggle chapter={chapter} mode="page" />
      <PageView
        chapterData={chapters[chapterIndex]}
        pageIndex={pageIndex}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </>
  );

}

export default withChapters(ChapterPage);