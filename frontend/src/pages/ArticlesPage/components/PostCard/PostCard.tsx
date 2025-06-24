import { Link } from 'react-router-dom';
import {useState} from "react";
import classnames from "classnames";
import { TArticle } from "@/api/articles/types";

import './PostCard.scss'

const PostCard = ({ id, poster, title, createdAt, description }: Omit<TArticle, 'page'>) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    return (
        <div className="post-card">
            <Link to={`/articles/${id}`} />
          <figure className={classnames("post-card__image", isImageLoaded && 'post-card__image_loaded')}>
            <img
              src={poster}
              alt={title}
              onLoad={() => setIsImageLoaded(true)}
            />
          </figure>
          <div className="post-card__info">
            <p className='post-card__date'>{createdAt}</p>
            <p className='post-card__title'>{title}</p>
            <p className='post-card__description'>{description}</p>
            </div>
        </div>
    )
}

export default PostCard
