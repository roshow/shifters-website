import Img from 'react-image';

const PageImg = ({src, alt = '', ...props}) => (
  <Img
    {...props}
    src={`https://drive.google.com/uc?id=${src}`}
    alt={alt}
    loader={<h4>Loading...</h4>}
  />
);

export default PageImg;
