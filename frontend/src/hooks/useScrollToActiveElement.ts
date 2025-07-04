import {useEffect, useRef} from "react";

interface IProps {
  active: any
}

const useScrollToActiveElement = ({ active }: IProps) => {
  const itemRefs = useRef<{ [key: string]: any }>({});

  useEffect(() => {
    if (active) {
      const activeEl = itemRefs.current?.[active];

      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'end',
        });
      }
    }

  }, [active])

  return itemRefs
}

export default useScrollToActiveElement;
