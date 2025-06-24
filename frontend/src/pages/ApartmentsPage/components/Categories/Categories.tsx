import { useEffect, useState} from "react";
import CategoriesSection from "@/components/CategoriesSection";
import StickyCategories from "@/pages/ApartmentsPage/components/StickyCategories";
import { TApartmentCategory } from "@/types/apartment";
import {useIntersectionObserver} from "@/hooks/useInterserctionObserver.ts";
import {Button} from "@telegram-apps/telegram-ui";
import {FilterOutlined} from "@ant-design/icons";
import {hapticFeedback} from "@telegram-apps/sdk-react";

interface IProps {
  activeCategory?: TApartmentCategory
  onChangeCategory: (value: TApartmentCategory) => void
  onFilterClick: () => void
}

const Categories = ({ onChangeCategory, activeCategory, onFilterClick }: IProps) => {
  const [isStickyVisible, setIsStickyVisible] = useState<boolean>(false)
  const { ref, isIntersecting } = useIntersectionObserver()

  useEffect(() => {
    setIsStickyVisible(!isIntersecting)
  }, [isIntersecting])

  const filterButton = (
    <Button
      mode='bezeled'
      size='s'
      after={<FilterOutlined />}
      style={{ minWidth: 120 }}
      onClick={() => {
        hapticFeedback.impactOccurred('light')
        onFilterClick()
      }}
    >
      <span>{'Фильтр'}</span>
    </Button>
  )

  return (
    <>
      <CategoriesSection
        ref={ref}
        button={filterButton}
        activeCategory={activeCategory}
        onChangeCategory={onChangeCategory}
      />
      <StickyCategories
        isVisible={isStickyVisible}
        button={filterButton}
        activeCategory={activeCategory}
        onChangeCategory={onChangeCategory}
      />
    </>
  )
}

export default Categories;
