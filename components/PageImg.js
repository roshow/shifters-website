import Img from 'react-image';
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

const PageImg = ({src, alt = '', className, ...props}) => (
  <Img
    {...props}
    src={`https://drive.google.com/uc?id=${src}`}
    alt={alt}
    loader={<StyledLoader><h4>Loading...</h4></StyledLoader>}
    unloader={<div/>}
    container={children => <ImgWrapper className={className}>{children}</ImgWrapper>}
  />
);

export default PageImg;
