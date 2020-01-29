import styled from 'styled-components';
import withChapters from '../components/withChapters';

export const ChapterDisplay = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-family: Arial, Helvetica, sans-serif;
  }
  img {
    width: 100%;
    max-width: 200px;
    margin: 10px;
  }
`

export const ChapterView = ({number, title, pages}) => (
  <ChapterDisplay key={number} className="chapter">
    <h1>Chapter {number}: {title}</h1>
    {pages.map(pageId => <img key={pageId} src={`https://drive.google.com/uc?id=${pageId}`}/>)}
  </ChapterDisplay>
);

const Home = ({ chapters } ) => {

  return (
    <div>
      {chapters.map(ChapterView)}
    </div>
  );
};

export default withChapters(Home);
