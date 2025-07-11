import {useEffect, memo, useRef} from "react";
import ApartmentCard, { ApartmentCardSkeleton } from "@/components/ApartmentCard";
import { useGetParameters } from "@/services/useGetParameters";
import { useIntersectionObserver } from "@/hooks/useInterserctionObserver";
import { useApartmentsQuery } from "@/services/apartments/useApartmentsQuery";
import Empty from "@/components/Empty";
import { ClearOutlined } from "@ant-design/icons";
import { Button } from "@telegram-apps/telegram-ui";
import {TFilter} from "@/types/apartment.ts";

interface IProps {
  filter: TFilter
  isFilterClear: boolean
  clearFilter: () => void
}

const ApartmentsList = ({ filter, isFilterClear, clearFilter }: IProps) => {
  const { data: linkData } = useGetParameters()
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
  } = useApartmentsQuery({ filter })

  const lockLoadingRef = useRef(false);
  const { ref, isIntersecting } = useIntersectionObserver({
    rootMargin: '100px',
    triggerOnce: false,
  })

  useEffect(() => {
    const loadMore = async () => {
      if (lockLoadingRef.current || isFetchingNextPage || !hasNextPage) return;
      lockLoadingRef.current = true;

      await fetchNextPage();
      lockLoadingRef.current = false;
    };

    if (isIntersecting) {
      loadMore();
    }
  }, [isIntersecting, fetchNextPage, isFetchingNextPage, hasNextPage]);

  if (
    !data?.apartments.length &&
    !isLoading &&
    !isFetchingNextPage
  ) {
    return (
      <Empty
        title='Объектов не найдено'
        action={!isFilterClear && (
          <Button
            mode='bezeled'
            size='s'
            after={<ClearOutlined/>}
            onClick={clearFilter}
          >
            Очистить фильтр
          </Button>
        )}
      />
    )
  }

  return (
    <div className='container'>
      {data?.apartments.map((item) => (
        <ApartmentCard
          key={item.id}
          {...item}
          managerLink={linkData?.manager_link}
        />
      ))}
      {isLoading && (
        <>
          <ApartmentCardSkeleton />
          <ApartmentCardSkeleton />
          <ApartmentCardSkeleton />
        </>
      )}
      {isFetchingNextPage && (
        <ApartmentCardSkeleton />
      )}
      {hasNextPage && (
        <div
          ref={ref}
          key={data?.apartments.length}
          style={{height: 1}}
        />
      )}
    </div>
  )
}

export default memo(ApartmentsList);
