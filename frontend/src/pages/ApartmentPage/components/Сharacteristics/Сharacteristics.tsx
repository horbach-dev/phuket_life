import { Fragment } from 'react';
import { IApartment } from "@/types/apartment";
import { getBedroomsText, getTypeText } from "./heplers";

interface IProps {
    apartment: IApartment;
}

const Characteristics = ({ apartment }: IProps) => {
    const characteristics = [
        {
            title: 'Тип',
            value: getTypeText(apartment.type),
        },
        {
            title: 'Спален',
            value: getBedroomsText(apartment.bedrooms),
        },
        {
            title: 'Сан. узлов',
            value: apartment.bathrooms,
        },
        apartment.monthlyRent ? {
            title: 'Период аренды',
            value: 'от месяца',
        } : {},
        apartment.area ? {
            title: 'Площадь',
            value: apartment.area,
            type: 'area',
        } : {},
        apartment.livingArea ? {
            title: 'Жилая площадь',
            value: apartment.livingArea,
            type: 'area',
        } : {},
        apartment.category === 'resale' ? {
          title: 'Наличие мебели',
          value: apartment.furniture ? 'Есть' : 'Нет',
        } : {},
        apartment.quarter && apartment.yearOfDelivery ? {
            title: 'Сдача объекта',
            value: `${apartment.quarter} квартал, ${apartment.yearOfDelivery} г.`
        } : {},
    ]

    const list = characteristics.filter(i => !!i.title) as { title?: string, value?: string, type?: string }[]

    return (
        <>
        <p className='section-title'>{'Характеристики'}</p>
            <div className="apartment-page__chars">
                {list.map((item, index) => {
                    return (
                        <Fragment key={item.title}>
                        <div className="apartment-page__chars-item">
                            <p className='apartment-page__chars-item-type'>{item.title}</p>
                            {item.type === 'area' ? (
                              <p className='apartment-page__chars-item-value'>{item.value} м<sup>2</sup></p>
                            ):(
                              <p className='apartment-page__chars-item-value'>{item.value}</p>
                            )}
                        </div>
                        {index < list.length - 1 && <div className="divider divider_white"/>}
                        </Fragment>
                    )
                })}
            </div>
        </>
    )
}

export default Characteristics;
