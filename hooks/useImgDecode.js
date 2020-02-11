import { useEffect, useState, useRef } from 'react';

const questionableCache = [];

const useImgDecode = (src) => {
  const imgRef = useRef();
  
  const [{ isLoading, error }, setLoadingState] = useState({
    isLoading: !questionableCache.includes(src),
    error: null,
  });

  useEffect(() => {
    if (questionableCache.includes(src)) {
      setLoadingState({ isLoading: false, error: null });
      return;
    }
    setLoadingState({ isLoading: true, error: null });
    imgRef.current = new Image();
    imgRef.current.src = src;
    imgRef.current.decode()
      .then(() => {
        questionableCache.push(src);
        setLoadingState({ isLoading: false, error: null });
      })
      .catch(e => setLoadingState({ isLoading: false, error: e }));
  
    return () => {
      imgRef.current = null;
    };
    
  }, [src, setLoadingState, imgRef]);
  
  return [isLoading, error];
};

export default useImgDecode;