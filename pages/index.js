import styled from 'styled-components';
import withChapters from './../hoc/withChapters';

const ChapterDisplay = styled.section`
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

const Home = ({ chapters }) => {

  if (!chapters) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {chapters.map(({number, title, pages}) => {
        return (
          <ChapterDisplay key={number} className="chapter">
            <h1>Chapter {number}: {title}</h1>
            {pages.map(pageId => <img key={pageId} src={`https://drive.google.com/uc?id=${pageId}`}/>)}
          </ChapterDisplay>
        );
      })}
    </div>
  );
};

export default withChapters(Home);
