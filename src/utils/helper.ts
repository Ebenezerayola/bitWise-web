export const formatNumberWithCommas = (value: string) => {
    const cleanValue = value.replace(/[^\d.]/g, '');

    return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const removeCommas = (value: string) => {
  return value.replace(/,/g, '');
};
