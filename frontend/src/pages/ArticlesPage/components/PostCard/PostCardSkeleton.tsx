import './PostCard.scss'

export const PоstCardSkeleton = () => {
    return (
        <div className="post-card post-card_skeleton">
            <div className='post-card__image post-card__image_skeleton' />
            <div className="post-card__info">
                <p className='post-card__date post-card__date_skeleton'><span>{'_'}</span></p>
                <p className='post-card__title post-card__title_skeleton'><span>{'_'}</span></p>
                <p className='post-card__description post-card__description_skeleton'><span>{'_'}</span></p>
                <p className='post-card__description post-card__description_skeleton'><span>{'_'}</span></p>
                <p className='post-card__description post-card__description_skeleton'><span>{'_'}</span></p>
            </div>
        </div>
    )
}