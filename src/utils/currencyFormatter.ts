interface CurrencyFormatterConfig {
  locale?: string;
  currency?: string;
}

export function currencyFormatter(
  { currency, locale }: CurrencyFormatterConfig = {
    currency: 'BRL',
    locale: 'pt-BR',
  },
) {
  const numberFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  });

  return {
    format: (value: number) => {
      if (value === null || isNaN(value)) {
        return '';
      }

      return numberFormatter.format(value / 100);
    },
    parse: (value: string) => {
      const rawValue = parseFloat(value.replace(/[^\d]/g, ''));

      return rawValue;
    },
  };
}
