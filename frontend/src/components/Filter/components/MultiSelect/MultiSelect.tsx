import classnames from 'classnames';
import { TFilter } from "@/types/apartment";

interface IProps {
  isDark: boolean
  title: string
  type: 'bedrooms' | 'bathrooms' | 'tags' | 'type'
  activeItems: (string | number)[]
  isLoading?: boolean
  items: { title: string; value: string | number }[]
  setFilter: (a: TFilter | ((b: TFilter) => TFilter)) => void
}

const loadingData = [
  { title: 'загрузка 1', value: '' },
  { title: 'загрузка 22', value: '' },
  { title: 'загрузка 333', value: '' },
  { title: 'загрузка 444', value: '' },
]

const MultiSelect = ({
  type,
  title,
  items,
  isDark,
  isLoading,
  activeItems,
  setFilter
}: IProps) => {
  const handleTypeClick = (item: any) => {
    setFilter(prevState => (
      {
        ...prevState,
        [type]:
          prevState[type]?.find(value => value === item.value) ?
          prevState[type].filter(value => value !== item.value) :
          [...prevState[type], item.value]
      }
    ))
  }

    const chipStyle = isDark ? { color: '#fff', borderColor: 'rgba(255,255,255,0.25)' } : {}

    const currentData = isLoading ? loadingData : items

    return (
      <div className="filter__select">
        <p className="filter__subtitle">
          {title}
        </p>
        <div className={classnames('filter__select-list', `filter__select-list_${type}`)}>
          {currentData.map(item => {
            const active = activeItems?.includes?.(item.value)

              return (
                <button
                  style={chipStyle}
                  key={item.title}
                  disabled={isLoading}
                  className={
                  classnames(
                    'filter__select-list-item',
                    active && 'filter__select-list-item_active',
                    isLoading && 'filter__select-list-item_loading'
                  )}
                  onClick={() => handleTypeClick(item)}
                >
                  {item.title}
                </button>
              )
          })}
      </div>
      </div>
    )
}

export default MultiSelect
