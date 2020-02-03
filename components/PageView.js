import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import PageImg from './PageImg';

const ViewContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .page-window {
    max-width: 600px;
    overflow: hidden;
    .page-container {
      display: flex;
      flex-direction: row;
      width: 300%;
      max-width: 1800px;
      transform: translateX(-33.333%);
      &.prev-page {
        transition: transform 0.7s;
        transform: translateX(0%);
      }
      &.next-page {
        transition: transform 0.7s;
        transform: translateX(-66.666%);
      }
      .page-img {
        flex: 1;
        img {
          width: 100%;
        }
      }
    }
  }
  
`;

const PageNav = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  max-width: 600px;
  button, h3 {
    margin: 0;
    text-transform: uppercase;
  }
  div, button, h3 {
    flex: 1;
    text-align: center;
  }
`;

const PageView = ({ chapterData, pageIndex, prevPage = {}, nextPage = {} }) => {
  const { title, number, pages } = chapterData;
  
  const imgSrc = pages[pageIndex];
  const imgSrcRef = useRef(imgSrc);
  const imgSrcChangedThisRender = imgSrc !== imgSrcRef.current;
  imgSrcRef.current = imgSrc;

  const [pageToAnimate, setPageToAnimate] = useState('');

  const router = useRouter();

  const animElRef = useRef();

  useEffect(() => {
    const onAnimationEnd = () => {
      const { readUrl } = pageToAnimate === 'prev-page' ? prevPage : nextPage;
      router.push('/read/[chapter]/[page]', readUrl);
    }
    if (animElRef.current) {
      animElRef.current.addEventListener('transitionend', onAnimationEnd);
    }

    return () => {
      if (animElRef.current) {
        animElRef.current.removeEventListener('transitionend', onAnimationEnd);
      }
    }

  }, [animElRef, pageToAnimate]);


  useEffect(() => {
    if (imgSrcChangedThisRender) {
      setPageToAnimate('');
    }
  }, [imgSrcChangedThisRender]);

  const animClass = !imgSrcChangedThisRender ? pageToAnimate : '';
  
  return (
    <ViewContainer>
      <h2>Chapter {number}: {title}</h2>
      
      <PageNav>
        {prevPage.readUrl && <button onClick={() => setPageToAnimate('prev-page')}>prev</button> || <div />}     
        <h3>{ pageIndex > 0 ? `page ${pageIndex}` : 'cover' }</h3>
        {nextPage.readUrl && <button onClick={() => setPageToAnimate('next-page')}>next</button> || <div />}
      </PageNav>
      
      <div className="page-window">
        <div ref={animElRef} className={`page-container ${animClass}`}>
          <PageImg key={prevPage.src} src={prevPage.src} className={`page-img`}/>
          <PageImg key={imgSrc} src={imgSrc} className={`page-img`}/>
          <PageImg key={nextPage.src} src={nextPage.src} className={`page-img`}/>
        </div>
      </div>
      
    </ViewContainer>
  );
}

export default PageView;