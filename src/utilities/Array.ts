export function includesTwice(values: Array<number | string>, search: number | string): boolean {
  const valuesCount = values.length;
  let hits = 0;

  for (let i = 0; i < valuesCount; i++) {
    const value = values[i];

    if (value === search) {
      hits += 1;
    }
    if (hits === 2) {
      return true;
    }
  }

  return false;
}
