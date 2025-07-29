export const throttle = (func: () => void, delay: number) => {
  let timeout: NodeJS.Timeout | null = null;
  return () => {
    if (!timeout) {
      timeout = setTimeout(() => {
        func();
        timeout = null;
      }, delay);
    }
  };
};
