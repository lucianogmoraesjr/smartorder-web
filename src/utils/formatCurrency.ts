export function formatCurrency(valueInCents: number | null) {
  console.log(valueInCents);

  if (valueInCents === null || isNaN(valueInCents)) {
    return '';
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valueInCents / 100);
}
