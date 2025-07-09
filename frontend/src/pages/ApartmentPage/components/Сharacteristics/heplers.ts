export const getRoomsText = (bedrooms: number | null, isOne?: boolean) => {
  switch (bedrooms) {
    case 1:
      return isOne ? 'от 1-го' : 'от 1-й'
    case 2:
      return 'от 2-х'
    case 3:
      return 'от 3-х'
    case 4:
      return 'от 4-х'
    case 5:
      return 'от 5-и'
    default:
      return 'не указано'
  }
}

export const getTypeText = (type: string) => {
  switch (type) {
    case 'home':
      return 'Дом';
    case 'apartment':
      return 'Апартаменты';
    case 'villa':
      return 'Вилла';
    case 'townhouse':
      return 'Таунхаус';
    default:
      return 'не указано';
  }
}
