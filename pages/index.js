import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';
import absoluteUrl from 'next-absolute-url';
import useChapters from './../hooks/useChapters';

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

const Home = (props) => {

  const chapters = useChapters(props.chapters);

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

Home.getInitialProps = async ({ req }) => {
  
  if (req) {
    let { origin } = absoluteUrl(req, 'localhost:3000');
    const res = await fetch(`${origin}/api/chapters`);
    const chapters = await res.json();

    return { chapters };
  }
  return {};
};

export default Home;
