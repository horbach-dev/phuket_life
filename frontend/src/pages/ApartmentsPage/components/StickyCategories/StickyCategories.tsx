import {FC, ReactNode } from 'react';
import { Button } from '@telegram-apps/telegram-ui';
import {hapticFeedback} from "@telegram-apps/sdk-react";
import { categories } from '@/constants'
import { TApartmentCategory } from "@/types/apartment";
import useScrollToActiveElement from "@/hooks/useScrollToActiveElement";

import './StickyCategories.scss';

interface IProps {
  isVisible: boolean;
  button: ReactNode;
  activeCategory?: TApartmentCategory
  onChangeCategory: (value: TApartmentCategory) => void
}

const StickyCategories: FC<IProps> = ({
  isVisible,
  button,
  activeCategory,
  onChangeCategory,
}) => {
  const itemRefs = useScrollToActiveElement({ active: activeCategory })

  const handleClick = (category: TApartmentCategory) => {
    hapticFeedback.impactOccurred('light')
    onChangeCategory?.(category)
  }

  return (
    <div className={`sticky-categories ${isVisible ? 'sticky-categories--visible' : ''}`}>
      <div className="sticky-categories__container">
        <div className="sticky-categories__list">
          {categories.map((item) => (
            <Button
                key={item.category}
                size='s'
                ref={(el) => itemRefs.current[item.category] = el}
                onClick={() => handleClick(item.category as TApartmentCategory)}
                mode={item.category === activeCategory ? 'bezeled' : 'plain'}
                className="sticky-categories__list-item"
            >
              <p>{item.title}</p>
            </Button>
          ))}
        </div>
      </div>
      {button}
    </div>
  );
};

export default StickyCategories;
