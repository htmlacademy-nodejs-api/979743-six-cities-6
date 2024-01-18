// преобразование строки в логический тип
export function toBoolean(str: string): boolean {
  if (str === 'true') {
    return true;
  }
  return false;
}
