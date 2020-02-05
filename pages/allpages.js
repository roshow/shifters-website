import ChapterView from './../components/ChapterView';
import withChapters from '../components/withChapters';

const AllPages = ({ chapters }) => {

  return (
    <div>
      {chapters.map(ChapterView)}
    </div>
  );
};

export default withChapters(AllPages);
