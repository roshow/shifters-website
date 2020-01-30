import SinglePage from './../components/SinglePage';
import ReadModeToggle from './../components/ReadModeToggle';
import withChapters from './../components/withChapters';

const Home = ({ chapters } ) => {
  return (
    <>
      <ReadModeToggle chapter="1" mode="page" />
      <SinglePage
        chapter={chapters[0]}
        pageIndex={0}
        nextPage={[0,1]}
      />
    </>
  );  
}

export default withChapters(Home);
