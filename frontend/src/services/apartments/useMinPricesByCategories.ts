import { useQueries, UseQueryResult } from '@tanstack/react-query';
import { getMinPriceByCategory } from "@/api/apartments/getMinPriceByCategory";
import { toCategoryPriceModel } from "@/api/apartments/dto";
import { TApartmentCategory } from "@/types/apartment";
import { categories } from "@/constants";

type CategoryQueryResult = ReturnType<typeof toCategoryPriceModel>;
type TItem = {
  title: string;
  category: string;
  value: number;
};
type TPreparedData = {
  category: TApartmentCategory
  title: string,
  type: 'price' | 'priceFrom'
}

const preparedData = categories.map(({ category, title}) => {
  return [
    { category, title, type: 'price' },
    { category, title, type: 'priceFrom' },
  ]
}).flat() as TPreparedData[]

export const useMinPricesByCategories = () => {
  const queries = useQueries({
    queries: preparedData.map(({ category, type, title }) => ({
      queryKey: ['minPrice', category, type],
      queryFn: () => getMinPriceByCategory(category, type),
      select: (data: any) => toCategoryPriceModel(data.data[0], category, title),
    })),
  }) as UseQueryResult<CategoryQueryResult, unknown>[];

  const isLoading = queries.some(q => q.isLoading);
  const isError = queries.some(q => q.isError);
  const isSuccess = queries.every(q => q.isSuccess);

  // Собираем результаты в массив, если все успешно
  const data = isSuccess ? queries.map(q => q.data) : [];

  return {
    isLoading,
    isError,
    isSuccess,
    data: getUniqueMinValues(data),
  };
};

// Жесточайший код, лучше не разбираться
function getUniqueMinValues(items: any) {
  const map = new Map<string, { hasNonZero: boolean; candidates: TItem[] }>();

  for (const item of items) {
    const key = `${item.category}__${item.title}`;
    const entry = map.get(key);

    if (!entry) {
      map.set(key, {
        hasNonZero: item.value !== 0,
        candidates: [item],
      });
    } else {
      // Добавляем в кандидаты
      entry.candidates.push(item);
      // Обновляем флаг, если появился ненулевой value
      if (item.value !== 0) {
        entry.hasNonZero = true;
      }
    }
  }

  const result: TItem[] = [];

  for (const [_, { hasNonZero, candidates }] of map.entries()) {
    if (hasNonZero) {
      // Фильтруем кандидатов, оставляем только value > 0 и берём минимальный
      const filtered = candidates.filter(c => c.value > 0);
      const minItem = filtered.reduce((min, cur) => cur.value < min.value ? cur : min);
      result.push(minItem);
    } else {
      // Все value == 0, просто берем первый
      result.push(candidates[0]);
    }
  }

  return result;
}
