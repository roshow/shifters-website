import Link from 'next/link';
import styled from 'styled-components';

const StyledWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

const ModeLink = ({ mode, chapter, type }) => {
  if (mode === type) {
    return mode === 'page' ? 'Single Page' : 'Full Chapter';
  }
  if (type === 'page') {
    return (
      <Link
        href='/read/[chapter]/[page]' 
        as={`/read/${chapter}/0`}
      >
        <a>Single Page</a>
      </Link>
    );
  }
  return (
    <Link
      href='/read/[chapter]' 
      as={`/read/${chapter}`}
    >
      <a>Full Chapter</a>
    </Link>
  );
}

const ReadModeToggle = (props) => (
  <StyledWrapper>
    Reading Mode: <ModeLink {...props} type="page" /> | <ModeLink {...props} type="chapter" />       
  </StyledWrapper>
);

export default ReadModeToggle;