import { useEffect, useState } from 'react';

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

export default useImgDecode;