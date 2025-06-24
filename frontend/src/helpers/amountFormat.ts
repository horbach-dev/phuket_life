export const amountFormat = (value: number) => {
  const result = new Intl.NumberFormat('th-TH', {
    style: 'decimal',
    currency: 'THB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    currencyDisplay: 'code',
  }).format(value).replace(/,/g, '.');

  return `${result} THB`
}
