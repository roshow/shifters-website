import styled from 'styled-components';
import useImgDecode from './../hooks/useImgDecode';

const ImgWrapper = styled.div`
  img {
    width: 100%;
  }
`;

const StyledLoader = styled.div`
  width: 100%;
  text-align: center;
`;

const PageImg = ({src, alt = '', className, style, ...props}) => {
  const fullSrcUrl = `https://drive.google.com/uc?id=${src}`;

  const [ isImgLoading, imgError ] = useImgDecode(fullSrcUrl);
  
  return (
    <ImgWrapper className={className} style={style}>
      {!isImgLoading && !imgError && <img src={fullSrcUrl} alt={alt} {...props} />}
      {isImgLoading && <StyledLoader><h4>Loading...</h4></StyledLoader>}
    </ImgWrapper>
  );
};

export default PageImg;
