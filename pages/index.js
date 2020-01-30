import SinglePage from './../components/SinglePage';
import ReadModeToggle from './../components/ReadModeToggle';
import withChapters from './../components/withChapters';

const Home = ({ chapters } ) => {
  const [ chapter ] = chapters;
  const nextPage = {
    readUrl: '/read/1/1',
  };
  return (
    <>
      <ReadModeToggle chapter="1" mode="page" />
      <SinglePage
        chapter={chapter}
        pageIndex={0}
        nextPage={nextPage}
      />
    </>
  );  
}

export default withChapters(Home);
