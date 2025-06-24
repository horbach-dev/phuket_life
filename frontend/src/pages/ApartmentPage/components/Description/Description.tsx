import { useEffect, useRef, useState } from "react";
import { Button } from '@telegram-apps/telegram-ui';

import './Description.scss';

interface IProps {
    description: string
}

const Description = ({ description }: IProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [shouldShowExpandButton, setShouldShowExpandButton] = useState(false);
    const descriptionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (descriptionRef.current) {
            const height = descriptionRef.current.scrollHeight;
            setShouldShowExpandButton(height > 300);
        }
    }, [description]);

    return (
        <>
        <p className='section-title'>{'Описание'}</p>
        <div className="apartment-page-description">
            <div 
                ref={descriptionRef}
                className={`apartment-page-description__content ${(shouldShowExpandButton && !isExpanded) ? 'apartment-page-description__content--collapsed' : ''}`}
                dangerouslySetInnerHTML={{
                    __html: description
                }}
            />
            {shouldShowExpandButton && (
                <Button
                    mode="plain"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="apartment-page-description__expand-button"
                >
                    {isExpanded ? 'Свернуть' : 'Показать ещё'}
                </Button>
            )}
        </div>
        </>
    )
}

export default Description;