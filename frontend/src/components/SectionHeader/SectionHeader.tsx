import { ReactNode } from "react";
import classnames from "classnames";
import './SectionHeader.scss'

interface IProps {
  title: string
  action?: ReactNode
  className?: string
}

const SectionHeader = ({ title, action, className }: IProps) => {
  return (
    <div className={classnames('section-header', className)}>
      <h3>{title}</h3>
      {action}
    </div>
  )
}

export default SectionHeader
