import Img from 'react-image';

const PageImg = ({src, alt = '', className, style, ...props}) => (
  <Img
    {...props}
    src={`https://drive.google.com/uc?id=${src}`}
    alt={alt}
    loader={<h4>Loading...</h4>}
    container={children => <div className={className} style={style}>{children}</div>}
  />
);

export default PageImg;
