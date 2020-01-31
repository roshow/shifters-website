import PageView from '../components/PageView';
import ReadModeToggle from './../components/ReadModeToggle';
import withChapters from './../components/withChapters';

const Home = ({ chapters } ) => {
  const [ chapterData ] = chapters;
  const nextPage = {
    readUrl: '/read/1/1',
    src: chapters[0].pages[1],
  };
  return (
    <>
      <ReadModeToggle chapter="1" mode="page" />
      <PageView
        chapterData={chapterData}
        pageIndex={0}
        nextPage={nextPage}
      />
    </>
  );  
}

export default withChapters(Home);
