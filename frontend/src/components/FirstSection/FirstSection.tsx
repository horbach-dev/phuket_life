import { Button } from '@telegram-apps/telegram-ui';
import { useNavigate } from 'react-router-dom';

import './FirstSection.scss'

const FirstSection = () => {
  const navigate = useNavigate()

  return (
    <section className='main-page__first-section'>
        <div className='main-page__first-section__content'>
            <p className='main-page__first-section__content__text'>
                {'Resale: виллы и апартаменты'} <br />
                {'Виллы на этапе строительства'} <br />
                {'Апартаменты на этапе строительства'}
            </p>
            <Button
              onClick={() => navigate('/apartments')}
              mode='white'
              className='main-page__first-section__content__button'
            >
              {'В каталог'}
            </Button>
        </div>
    </section>
  )
}

export default FirstSection