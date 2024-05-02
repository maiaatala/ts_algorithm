type FormatNumberAdornments = {
  suffix?: string;
  prefix?: string;
};

function concatenateStringWithAdornments(
  value: string,
  adornments: FormatNumberAdornments,
): string {
  const { suffix, prefix } = adornments;
  const array = [prefix, value, suffix].filter(Boolean);
  return array.join('');
}

type FormatNumberWithOptionsParams = {
  value: number | undefined | null;
  formatStyle: 'currency' | 'decimal' | 'percent';
  defaultText?: string;
  locale?: Intl.LocalesArgument;
  options?: Intl.NumberFormatOptions;
  adornments?: FormatNumberAdornments;
};

/**
 * @Description use this function to format a number to currency, decimal or percent
 * @param {number} value - the number to be formatted
 * @param {"currency"|"decimal"|"percent"} formatStyle - the format style to be used
 * @param {string} [defaultText= "-"] - the text to be returned if the value is undefined, null or NaN
 * @param {string} [locale = "pt-br"] - the locale of the toLocaleString method
 * @param {object} options - Optional override for the option param of toLocaleString method
 * @param {Object} [adornments={}] - An object containing optional `prefix` and `suffix` strings to be added around the formatted number.
 *
 * @example
 * ```js
 * formatNumberWithOptions({ value: 1234.56, formatStyle: "currency" }) // R$ 1.234,56
 * formatNumberWithOptions({ value: 1234.56, formatStyle: "currency", adornments: { prefix: "Valor: " } }) // Valor: R$ 1.234,56
 * formatNumberWithOptions({ value: 0.5, formatStyle: "percent") // 0.5%
 * formatNumberWithOptions({ value: 0.5, formatStyle: "percent", adornments: { suffix: " de desconto" }) // 0.5% de desconto
 * formatNumberWithOptions({ value: 1234.56, formatStyle: "decimal" }) // 1.234,56
 * ```
 */
export function formatNumberWithOptions(
  params: FormatNumberWithOptionsParams,
): string {
  const {
    value,
    formatStyle,
    adornments = {},
    defaultText = '-',
    locale = 'pt-br',
    options: optionsOverride = {},
  } = params;
  if (value === undefined || value === null || Number.isNaN(value))
    return defaultText;

  if (formatStyle === 'currency') {
    const options = {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      ...optionsOverride,
    };
    const formattedMoney = value.toLocaleString(locale, options);
    return concatenateStringWithAdornments(formattedMoney, adornments);
  }

  if (formatStyle === 'decimal') {
    const options = {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      ...optionsOverride,
    };
    const formattedDecimal = value.toLocaleString(locale, options);
    return concatenateStringWithAdornments(formattedDecimal, adornments);
  }

  if (formatStyle === 'percent') {
    const options = {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      ...optionsOverride,
    };
    const formattedDecimal = value.toLocaleString(locale, options);
    return concatenateStringWithAdornments(`${formattedDecimal}%`, adornments);
  }

  // didn't find the formatStyle wanted
  return defaultText;
}
