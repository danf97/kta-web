/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useRef } from "react";

export const useDebouncedCallback = (
  action: any,
  dependencies: any[],
  delay: number
) => {
  const timerId = useRef<any>(null);

  return useCallback(
    (...args: any) => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
      timerId.current = setTimeout(() => {
        action(...args);
      }, delay);
    },
    [action, delay]
  );
};
