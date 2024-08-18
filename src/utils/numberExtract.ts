export const numberExtract = (value: string) =>
  value.match(/\d*/g)?.filter(Boolean).join('');
