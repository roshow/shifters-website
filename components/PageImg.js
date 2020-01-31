import Img from 'react-image';

<<<<<<< HEAD
const PageImg = ({src, alt = '', className, style, ...props}) => (
=======
const PageImg = ({src, alt = '', ...props}) => (
>>>>>>> master
  <Img
    {...props}
    src={`https://drive.google.com/uc?id=${src}`}
    alt={alt}
    loader={<h4>Loading...</h4>}
<<<<<<< HEAD
    container={children => <div className={className} style={style}>{children}</div>}
=======
>>>>>>> master
  />
);

export default PageImg;
