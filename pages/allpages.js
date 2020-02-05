import styled from 'styled-components';
import PageImg from './../components/PageImg';
import withChapters from '../components/withChapters';

const StyledAllPages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 300px;
  > div, h3 {
    margin: 5px;
  }
`;

const AllPages = ({ chapters }) => (
  <StyledAllPages>
    {chapters.map(({ title, number, pages}) => (
      <>
        <h3>CHAPTER {number}: {title}</h3>
        {pages.map((pageId, i) => (
          <>
            <h3>chapter {number}, page {i}</h3>
            <PageImg key={'allpages-' + pageId} src={pageId} />
          </>
        ))}
      </>
    ))}
  </StyledAllPages>
);

export default withChapters(AllPages);
