import { useState, useEffect } from 'react';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';
// import Head from 'next/head'
// import Nav from '../components/nav'

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

  const { chapters } = props;

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
}

Home.getInitialProps = async ({ req }) => {
  const referer = req?.headers?.referer;
  const url = referer ? `${referer}api/chapters` : '/api/chapters';
  const res = await fetch(url);
  const chapters = await res.json();

  return { chapters }
}

export default Home
