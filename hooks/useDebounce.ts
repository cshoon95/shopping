import { useState, useEffect } from 'react';

const useDebounce = <T = any>(value: string, delay = 600) => {	
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    }
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
