import {createContext, useContext, useState, ReactNode, useMemo} from 'react';
import { TFilter } from "@/types/apartment";
import { defaultFilterValues } from "@/constants";

type ApartmentsContextType = {
  filter: TFilter;
  setFilter: (a: TFilter | ((b: TFilter) => TFilter)) => void
  isFilterClear: boolean
  clearFilter: () => void
};

const ApartmentsContext = createContext<ApartmentsContextType | null>(null);

export const ApartmentsProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState<TFilter>(defaultFilterValues);

  const isFilterClear = useMemo(() => {
    return Object.values(filter).every(v => v.length === 0)
  }, [filter])

  const clearFilter = () => {
    setFilter(defaultFilterValues)
  }

  return (
    <ApartmentsContext.Provider value={{
      filter,
      setFilter,
      isFilterClear,
      clearFilter,
    }}>
      {children}
    </ApartmentsContext.Provider>
  );
};

export const useApartmentsFilter = () => {
  const ctx = useContext(ApartmentsContext);
  if (!ctx) throw new Error('useApartmentsContext must be used inside ApartmentsProvider');
  return {
    filter: ctx.filter,
    setFilter: ctx.setFilter,
    isFilterClear: ctx.isFilterClear,
    clearFilter: ctx.clearFilter,
  };
};
