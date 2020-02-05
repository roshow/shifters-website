import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { AppPageContainer } from './StyledApp';
import PageImg from './PageImg';


const StyledTitle = styled.h2`
  width: 100%;
  text-align: center;
  margin: 10px 0;
`;

const StyledPageNav = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  button, h3 {
    margin: 0;
    text-transform: uppercase;
  }
  div, button, h3 {
    flex: 1;
    text-align: center;
  }
`;

const StyledPageDisplay = styled.div`
  width: 100%;
  overflow: hidden;
  > div {
    display: flex;
    flex-direction: row;
    width: 300%;

    transform: translateX(-33.333%);
    .page-current {
      opacity: 1;
    }
    .page-prev, .page-next {
      opacity: 0;
    }

    &.animate {
      transition: transform 0.7s;
      .page-img {
        transition: opacity 0.7s;
      }
      .page-current {
        opacity: 0;
      }
      &.anim-prev {
        transform: translateX(0%);
        .page-prev {
          opacity: 1;
        }
      }
      &.anim-next {
        transform: translateX(-66.666%);
        .page-next {
          opacity: 1;
        }
      }
    }
    > div {
      flex: 1;
    }
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
      const { readUrl } = pageToAnimate === 'anim-prev' ? prevPage : nextPage;
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

  const animClass = !imgSrcChangedThisRender && pageToAnimate.length ? 'animate ' + pageToAnimate : '';
  
  return (
    <AppPageContainer>
      <StyledTitle>Chapter {number}: {title}</StyledTitle>
      
      <StyledPageNav>
        {prevPage.readUrl && <button onClick={() => setPageToAnimate('anim-prev')}>prev</button> || <div />}     
        <h3>{ pageIndex > 0 ? `page ${pageIndex}` : 'cover' }</h3>
        {nextPage.readUrl && <button onClick={() => setPageToAnimate('anim-next')}>next</button> || <div />}
      </StyledPageNav>
      
      <StyledPageDisplay>
        <div ref={animElRef} className={animClass}>
          <PageImg key={prevPage.src} src={prevPage.src} className="page-img page-prev" />
          <PageImg key={imgSrc} src={imgSrc} className="page-img page-current"/>
          <PageImg key={nextPage.src} src={nextPage.src}  className="page-img page-next" />
        </div>
      </StyledPageDisplay>
      
    </AppPageContainer>
  );
}

export default PageView;