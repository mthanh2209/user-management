import {
  useEffect,
  RefObject
} from 'react';

interface IBackDropProps {
  /**
   * Reference to the HTMLElement used to determine clicks outside of its boundaries.
   */
  ref: RefObject<HTMLElement>
  /**
   * Callback function invoked when a click occurs outside the referenced element.
   */
  callback: () => void
}

/**
 * Hook that handles click events outside a specified element.
 * @param param0 - Object containing ref and callback properties.
 */
export const useBackDrop = ({
  ref,
  callback
}: IBackDropProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, callback]);
};
