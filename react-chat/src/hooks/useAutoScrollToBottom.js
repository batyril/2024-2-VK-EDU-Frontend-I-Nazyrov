import { useEffect, useRef } from 'react';

function useAutoScrollToBottom(dependencies) {
  const endRef = useRef(null);
  const isInitialRender = useRef(true);

  useEffect(() => {
    const scrollToBottom = (smooth = true) => {
      endRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
    };

    if (isInitialRender.current) {
      scrollToBottom(false);
      isInitialRender.current = false;
    } else {
      scrollToBottom();
    }

    const observer = new MutationObserver(() => scrollToBottom());
    if (endRef.current) {
      observer.observe(endRef.current.parentNode, { childList: true });
    }

    return () => observer.disconnect();
  }, dependencies);

  return endRef;
}

export default useAutoScrollToBottom;
