import {forwardRef, ReactNode, useEffect, useRef} from 'react';
import classnames from 'classnames';
import { TApartmentCategory } from "@/types/apartment";
import { useMinPricesByCategories } from "@/services/apartments/useMinPricesByCategories";
import SectionHeader from "@/components/SectionHeader";
import { amountFormat } from "@/helpers/amountFormat";

import './CategoriesSection.scss';
import {hapticFeedback} from "@telegram-apps/sdk-react";

const categories = [
  { category: 'resale', title: 'Resale', value: 0 },
  { category: 'villas', title: 'Виллы', value: 0 },
  { category: 'rent', title: 'Аренда', value: 0 },
  { category: 'apartments', title: 'Апартаменты', value: 0 },
] as const;

interface IProps {
  button?: ReactNode
  activeCategory?: TApartmentCategory
  onChangeCategory?: (value: TApartmentCategory) => void
}

const CategoriesSection = forwardRef<HTMLDivElement, IProps>(({ button, onChangeCategory, activeCategory }, ref) => {
  const itemRefs = useRef<{ [key: string]: any | null }>({});
  const { data, isError, isLoading } = useMinPricesByCategories();

  useEffect(() => {
    if (activeCategory) {
      const activeEl = itemRefs.current?.[activeCategory];

      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'end',
        });
      }
    }

  }, [activeCategory])

  const handleClick = (category: TApartmentCategory) => {
    hapticFeedback.impactOccurred('light')
    onChangeCategory?.(category)
  }

  const loading = isError || isLoading
  const currentList = loading ? categories : data

  return (
    <section ref={ref} className='categories-section'>
      <div className="container">
        <SectionHeader
          title='Категории обьектов'
          action={button}
        />
      </div>
      <div
        className='categories-section__list'
        style={{ gridTemplateColumns: `repeat(${data.length || 4}, 1fr)` }}
      >
        {currentList.map(item => (
          <div
            key={item.title}
            ref={(el) => itemRefs.current[item.category] = el}
            onClick={() => handleClick(item.category as TApartmentCategory)}
            className={
              classnames(
                'categories-section__item',
                item.category === activeCategory && 'categories-section__item_active',
              )
            }
          >
            <p className='categories-section__item-title'>{item.title}</p>
            <p className='categories-section__item-price'>
              {item.value ? `от ${amountFormat(item.value)}` : 'цены по запросу'}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
});

CategoriesSection.displayName = 'CategoriesSection';

export default CategoriesSection;
