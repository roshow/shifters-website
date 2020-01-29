import SinglePage from './../components/SinglePage';
import withChapters from '../components/withChapters';

const Read = ({ chapters } ) => {
  return (
    <SinglePage
      chapter={chapters[0]}
      pageIndex={0}
      nextPage={[0,1]}
    />
  );  
}

export default withChapters(Read);