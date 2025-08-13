import { Fragment } from 'react';
import { IApartment } from "@/types/apartment";
import { getRoomsText, getTypeText } from "./heplers";

interface IProps {
    apartment: IApartment;
}

type TListItem = any

const Characteristics = ({ apartment }: IProps) => {
    const characteristics = [
        {
            title: 'Тип',
            value: getTypeText(apartment.type),
        },
        {
            title: 'Спален',
            value: getRoomsText(apartment.bedrooms),
        },
        {
            title: 'Сан. узлов',
            value: getRoomsText(apartment.bathrooms, true),
        },
        apartment.monthlyRent ? {
            title: 'Период аренды',
            value: 'от месяца',
        } : {},
        apartment.area ? {
            title: 'Размер общей площади',
            value: apartment.area,
            type: 'area',
        } : {},
        apartment.plotArea ? {
            title: 'Размер площади участка',
            value: apartment.plotArea,
            type: 'area',
        } : {},
        apartment.livingArea ? {
            title: 'Размер жилой площади',
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

    const list: TListItem[] = characteristics.filter(i => !!i.title)

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
