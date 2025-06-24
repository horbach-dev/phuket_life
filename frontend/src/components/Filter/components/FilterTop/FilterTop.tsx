import {Button} from "@telegram-apps/telegram-ui";
import {ClearOutlined} from "@ant-design/icons";

interface IProps {
  onClearFilter: () => void
  disabled: boolean
}

const FilterTop = ({ onClearFilter, disabled }: IProps) => {
  return (
    <div className='filter-top'>
      <h3 className='section-title'>
        {'Параметры поиска'}
      </h3>
      <Button
        mode='bezeled'
        size='s'
        disabled={disabled}
        after={<ClearOutlined/>}
        onClick={onClearFilter}
      >
        <span>{'Очистить'}</span>
      </Button>
    </div>
  )
}

export default FilterTop
