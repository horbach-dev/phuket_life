import { miniApp, useSignal, mainButton, hapticFeedback } from '@telegram-apps/sdk-react';
import { NumericFormat } from 'react-number-format';
import {useEffect, useState, useMemo} from 'react';
import classnames from 'classnames';
import { Modal, Input } from '@telegram-apps/telegram-ui';
import { useApartmentQuery } from "@/services/apartments/useApartmentTagsQuery";
import MultiSelect from './components/MultiSelect';
import FilterTop from "./components/FilterTop";
import { bathrooms, bedrooms, types } from './config';
import { defaultFilterValues } from "@/constants";
import { TFilter } from "@/types/apartment";

import './Filter.scss';

interface IProps {
  isOpen: boolean,
  onOpenChange: (v: boolean) => void
  setFilter: any
  filter: TFilter
  isFilterClear: boolean
  clearFilter: () => void
}

const Filter = ({ isOpen, onOpenChange, filter, setFilter, isFilterClear, clearFilter }: IProps) => {
  const isDark = useSignal(miniApp.isDark) as boolean;
  const { data: tags, isLoading: isTagsLoading } = useApartmentQuery()
  const [filterForm, setFilterForm] = useState(filter)

  const isFormClear = useMemo(() => {
    return Object.values(filterForm).every(v => v.length === 0)
  }, [filterForm])

  // если глобальный фильтр чист, очищаем форму
  useEffect(() => {
    if (isFilterClear) {
      setFilterForm(defaultFilterValues)
    }
  }, [isFilterClear]);

  useEffect(() => {
    mainButton?.mount();

    if (isOpen) {
      mainButton.setParams({ text: 'Поиск', isVisible: true });
    }

    if (!isOpen) {
      mainButton.setParams({ isVisible: false });
    }

    return () => {
      mainButton?.unmount()
    }
  }, [mainButton, isOpen])

  useEffect(() => {
    mainButton?.onClick(handleSearch)
  }, [mainButton, filterForm])

  const handleClear = () => {
    clearFilter()
    setFilterForm(defaultFilterValues)
  }

  const handleSearch = () => {
    hapticFeedback.impactOccurred('light')
    setFilter(filterForm)
    onOpenChange(false)
  }

  const handleInputChange = (values: any, type: string) => {
    setFilterForm((prev) => ({ ...prev, [type]: values.value }))
  }

  return (
    <Modal
      open={isOpen}
      onOpenChange={onOpenChange}
      className='filter-modal'
      style={{ zIndex: 99999 }}
    >
      <FilterTop
        disabled={isFormClear}
        onClearFilter={handleClear}
      />
      <div className="filter">
        <MultiSelect
          title='Тип недвижимости'
          isDark={isDark}
          type='type'
          items={types}
          activeItems={filterForm.type}
          setFilter={setFilterForm}
        />

        <p className="filter__subtitle">
          {'Максимальная цена в месяц'}
        </p>
        <div className="filter__prices">
          <NumericFormat
            customInput={Input}
            className={classnames('filter__prices-input', !isDark && 'filter__prices-input_light')}
            name="minPrice"
            type='tel'
            status="focused"
            value={filterForm.minPrice}
            before={
            <span
              style={{
                fontSize: '0.85rem',
                color: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(51, 51, 51, 0.5)'
            }}>
              От
            </span>
          }
            onValueChange={value => handleInputChange(value, 'minPrice')}
            thousandSeparator="."
            decimalSeparator=","
            allowNegative={false}
            after={'THB'}
          />
          <NumericFormat
            customInput={Input}
            className={classnames('filter__prices-input', !isDark && 'filter__prices-input_light')}
            name="maxPrice"
            type='tel'
            status="focused"
            value={filterForm.maxPrice}
            before={
              <span
                style={{
                  fontSize: '0.85rem',
                  color: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(51, 51, 51, 0.5)'
                }}>
              До
            </span>
            }
            onValueChange={value => handleInputChange(value, 'maxPrice')}
            thousandSeparator="."
            decimalSeparator=","
            allowNegative={false}
            after={'THB'}
          />
        </div>

        <MultiSelect
          title='Спальни'
          isDark={isDark}
          type='bedrooms'
          items={bedrooms}
          activeItems={filterForm.bedrooms}
          setFilter={setFilterForm}
        />

        <MultiSelect
          title='Сан. узлы'
          isDark={isDark}
          type='bathrooms'
          items={bathrooms}
          activeItems={filterForm.bathrooms}
          setFilter={setFilterForm}
        />

        <MultiSelect
          title='Удобства'
          isDark={isDark}
          type='tags'
          items={tags?.map(i => ({ value: i.id, title: i.title })) || []}
          isLoading={isTagsLoading}
          activeItems={filterForm.tags}
          setFilter={setFilterForm}
        />

      </div>

      {/*Кнопка для тестов*/}

      {/*<div className="filter-seacrch">*/}
      {/*  <button onClick={handleSearch}>*/}
      {/*    {'Поиск'}*/}
      {/*  </button>*/}
      {/*</div>*/}
    </Modal>
  )
}

export default Filter
