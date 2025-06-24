import { ReactNode } from 'react'
import classnames from 'classnames'
import emptyImg from './images/page-lost.svg'
import './Empty.scss'

const Empty = ({ title, action, isFull }: { title: string, action?: ReactNode, isFull?: boolean }) => {
  return (
    <div className={classnames('empty-element', isFull && 'empty-element_full')}>
      <p className='empty-element__title'>
        {title}
      </p>
      <img src={emptyImg} alt={title} />
      {action && (
        <div className="empty-element__action">
          {action}
        </div>
      )}
    </div>
  )
}

export default Empty
