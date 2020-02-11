import { useEffect, useState } from 'react';
import styled from 'styled-components';

const ImgWrapper = styled.div`
  img {
    width: 100%;
  }
`;

const StyledLoader = styled.div`
  width: 100%;
  text-align: center;
`;

const questionableCache = [];

const useImgDecode = (src) => {
  const [{ isLoading, error }, setLoadingState] = useState({
    isLoading: !questionableCache.includes(src),
    error: null,
  });
  
  useEffect(() => {
    if (questionableCache.includes(src)) {
      setLoadingState({ isLoading: false, error: null });
      return;
    }
    if (isLoading === false) {
      setLoadingState({ isLoading: true, error: null });
    }
    const image = new Image();
    image.src = src;
    image.decode()
      .then(() => {
    questionableCache.push(src);
        setLoadingState({ isLoading: false, error: null });
      })
      .catch(e => setLoadingState({ isLoading: false, error: e }));
  }, [src]);

  return [isLoading, error];
};

const PageImg = ({src, alt = '', className, style, ...props}) => {
  const fullSrcUrl = `https://drive.google.com/uc?id=${src}`;

  const [ isImgLoading, imgError ] = useImgDecode(fullSrcUrl);
  
  return (
    <ImgWrapper className={className} style={style}>
      {!isImgLoading && !imgError && <img src={fullSrcUrl} alt={alt} {...props} />}
      {!isImgLoading && imgError && <h4>Error: {imgError}</h4>}
      {isImgLoading && <StyledLoader><h4>Loading...</h4></StyledLoader>}
    </ImgWrapper>
  );
}

export default PageImg;
