import { Button } from '@telegram-apps/telegram-ui';
import { DownCircleOutlined } from "@ant-design/icons";
import { NavigateFunction } from "react-router-dom";
import { useGetParameters } from "@/services/useGetParameters";
import { useApartmentsQuery } from "@/services/apartments/useApartmentsQuery";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import ApartmentCard, { ApartmentCardSkeleton } from "@/components/ApartmentCard";

import './HotOffers.scss'

interface IProps {
  navigate: NavigateFunction;
}

const HotOffers = ({ navigate }: IProps) => {
  const {
    data,
    isLoading: isLoadingApartments,
    isError,
  } = useApartmentsQuery({ limit: 5, filter: { category: 'resale' } })
  const { data: linkData } = useGetParameters()

  const isLoading = isLoadingApartments || isError || data?.apartments?.length === 0

  return (
    <div className='hot-offers'>
      <SectionHeader
        title='Горячие предложения'
        action={(
          <Button
            mode='bezeled'
            size='s'
            onClick={() => navigate('/apartments', { state: { category: 'resale' } })}
            after={<DownCircleOutlined />}
            disabled={isLoading}
            loading={isLoading}
          >
            Resale
          </Button>
        )}
      />

      <div className="hot-offers__list">
        {isLoading ? (
          <>
            <ApartmentCardSkeleton />
            <ApartmentCardSkeleton />
            <ApartmentCardSkeleton />
            <ApartmentCardSkeleton />
            <ApartmentCardSkeleton />
          </>
        ) : (
          data?.apartments?.map(apartment => (
            <ApartmentCard
              key={apartment.id}
              {...apartment}
              managerLink={linkData?.manager_link}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default HotOffers;
