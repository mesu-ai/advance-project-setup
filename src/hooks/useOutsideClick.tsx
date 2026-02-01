import { useEffect, type RefObject } from 'react';

const useOutsideClick = (ref: RefObject<HTMLDivElement | null>, onClickOutside: () => void) => {
  useEffect(() => {
    const clickOutside = (e: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) {
        return;
      }
      onClickOutside();
    };

    document.addEventListener('mousedown', clickOutside);
    document.addEventListener('touchstart', clickOutside);

    return () => {
      document.removeEventListener('mousedown', clickOutside);
      document.removeEventListener('touchstart', clickOutside);
    };
  }, [onClickOutside, ref]);
};

export default useOutsideClick;
