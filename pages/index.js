import PropTypes from 'prop-types';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';
import { ROOT_URL } from './../constants';

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

const Home = props => {

  const { chapters = [] } = props;

  return (
    <div>
      {chapters.map(({number, title, pages}) => {
        return (
          <ChapterDisplay key={number}>
            <h1>Chapter {number}: {title}</h1>
            {pages.map(pageId => <img key={pageId} src={`https://drive.google.com/uc?id=${pageId}`}/>)}
          </ChapterDisplay>
        );
      })}
    </div>
  );
}

Home.getInitialProps = async () => {
  const res = await fetch(`${ROOT_URL}/.netlify/functions/shifters-content`);
  const chapters = await res.json();

  return {
    chapters,
  };

};

Home.propTypes = {
  chapters: PropTypes.array,
};

export default Home
