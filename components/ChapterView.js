import styled from 'styled-components';
import PageImg from './PageImg';

const PageImgStyled = styled(PageImg)`
  width: 100%;
  max-width: 200px;
  margin: 10px;
`

export const ChapterDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ChapterView = ({number, title, pages}) => (
  <ChapterDisplay key={number} className="chapter">
    <h2>Chapter {number}: {title}</h2>
    {pages.map(pageId => <PageImgStyled key={pageId} src={pageId} />)}
  </ChapterDisplay>
);

export default ChapterView;