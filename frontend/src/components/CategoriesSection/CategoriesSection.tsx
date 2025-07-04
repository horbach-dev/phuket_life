import { forwardRef, ReactNode } from 'react';
import classNames from 'classnames';
import {hapticFeedback, isMiniAppDark, useSignal} from "@telegram-apps/sdk-react";
import { TApartmentCategory } from "@/types/apartment";
import { useMinPricesByCategories } from "@/services/apartments/useMinPricesByCategories";
import useScrollToActiveElement from "@/hooks/useScrollToActiveElement";
import SectionHeader from "@/components/SectionHeader";
import { amountFormat } from "@/helpers/amountFormat";
import { categories } from "@/constants";

import './CategoriesSection.scss';

const loadingData = categories.map(({ title, category }) => ({
  title,
  category,
  value: 0
}))

interface IProps {
  button?: ReactNode
  activeCategory?: TApartmentCategory
  onChangeCategory?: (value: TApartmentCategory) => void
}

const CategoriesSection = forwardRef<HTMLDivElement, IProps>(({ button, onChangeCategory, activeCategory }, ref) => {
  const isDark = useSignal(isMiniAppDark);
  const { data, isError, isLoading } = useMinPricesByCategories();
  const itemRefs = useScrollToActiveElement({ active: activeCategory })

  const handleClick = (category: TApartmentCategory) => {
    hapticFeedback.impactOccurred('light')
    onChangeCategory?.(category)
  }

  const loading = isError || isLoading
  const currentList = loading ? loadingData : data

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
            ref={(el) => {
              itemRefs.current[item.category] = el
            }}
            onClick={() => handleClick(item.category as TApartmentCategory)}
            className={
              classNames(
                'categories-section__item',
                isDark ? 'categories-section__item_dark' : 'categories-section__item_light',
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
