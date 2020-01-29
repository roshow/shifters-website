import { useState, useEffect } from 'react';

const useChapters = (initialChapters) => {
  const [chapters, setChapters] = useState(initialChapters);

  const fetchChapters = async () => {
    const res = await fetch('/api/chapters');
    const newChapters = await res.json();
    setChapters(newChapters);
  };

  useEffect(
    () => {
      if (!chapters) {
        fetchChapters();
      }
    },
    [],
  );

  return chapters;
};

export default useChapters