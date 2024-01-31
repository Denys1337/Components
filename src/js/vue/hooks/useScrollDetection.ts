const useScrollDetection = (
  onThersholdHandler: (distance: number) => void,
  thershold: number = 20
) => {
  /* @ts-ignore-next-line */
  const scrollHandler = (e: ScrollEvent) => {
    const elem: HTMLElement = e.currentTarget as HTMLElement;
    const scrolledBottom = elem.scrollTop + elem.getBoundingClientRect().height;
    const distanceToBottom = elem.scrollHeight - scrolledBottom;
    if (distanceToBottom < thershold) {
      onThersholdHandler && onThersholdHandler(distanceToBottom);
    }
  };

  return {
    scrollHandler,
  };
};

export default useScrollDetection;
