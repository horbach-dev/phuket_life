import { Spinner as Spin } from '@telegram-apps/telegram-ui'
import classnames from 'classnames'
import { useEffect, useState } from 'react'

import './Spinner.scss'

interface IProps {
    global?: boolean
    className?: string
}

const Spinner = ({ global, className }: IProps) => {
    const [hide, setHide] = useState(false)

    useEffect(() => {
        let timeout = null

        if (className === 'hide') {
            setTimeout(() => setHide(true), 400)
        }

        return () => {
            timeout && clearTimeout(timeout)
        }
    }, [className])

    if (hide) return null

    return (
        <div className={classnames("spinner", global && "spinner_global", className)}>
            <Spin size='l' />
        </div>
    )
}

export default Spinner