import {useEffect, useState} from 'react';
import { Page } from '@/components/Page';
import ApartmentsList from "@/components/ApartmentsList";
import { useLocation } from "react-router-dom";
import Categories from './components/Categories';
import Filter from '@/components/Filter';
import {useApartmentsFilter} from "@/context/ApartmentsContext.tsx";

const ApartmentsPage = () => {
  const { state } = useLocation()
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)
  const { filter, setFilter, isFilterClear, clearFilter } = useApartmentsFilter()

  useEffect(() => {
    if (state) {
      setFilter(state)
    }
  }, [state]);

  return (
    <Page back={true}>
      <div style={{ marginTop: '1rem' }} />
      <Categories
        onFilterClick={() => setIsFilterOpen(true)}
        activeCategory={filter.category}
        onChangeCategory={category => {
          setFilter(prev => ({ ...prev, category }))
        }}
      />
      <ApartmentsList
        filter={filter}
        isFilterClear={isFilterClear}
        clearFilter={clearFilter}
      />
      <Filter
        isOpen={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        isFilterClear={isFilterClear}
        clearFilter={clearFilter}
        filter={filter}
        setFilter={setFilter}
      />
    </Page>
  )
}

export default ApartmentsPage
