import styled from 'styled-components';
import PageImg from './../components/PageImg';
import withChapters from '../components/withChapters';

const PageImgStyled = styled(PageImg)`
  width: 100%;
  max-width: 200px;
  margin: 10px;
`;

export const ChapterDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const AllPages = ({ chapters }) => {

  return (
    <div>
      {chapters.map(({number, title, pages}) => (
        <ChapterDisplay key={number} className="chapter">
          <h2>Chapter {number}: {title}</h2>
          {pages.map(pageId => <PageImgStyled key={pageId} src={pageId} />)}
        </ChapterDisplay>
      ))}
    </div>
  );
};

export default withChapters(AllPages);
