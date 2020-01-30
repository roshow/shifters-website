import styled from 'styled-components';
import Img from 'react-image';

export const ChapterDisplay = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 100%;
    max-width: 200px;
    margin: 10px;
  }
`

const ChapterView = ({number, title, pages}) => (
  <ChapterDisplay key={number} className="chapter">
    <h1>Chapter {number}: {title}</h1>
    {pages.map(pageId => 
      <Img key={pageId} src={`https://drive.google.com/uc?id=${pageId}`} loader={<h4>Loading...</h4>}/>)
    }
  </ChapterDisplay>
);

export default ChapterView;