export function shuffle<T>(array: T[], startIndex: number = 0): T[] {
  const result = [...array];

  if (startIndex < 0 || startIndex >= result.length) {
    return result;
  }

  let currentIndex = result.length;

  while (currentIndex > startIndex + 1) {
    const randomIndex =
      startIndex + Math.floor(Math.random() * (currentIndex - startIndex));

    currentIndex--;

    [result[currentIndex], result[randomIndex]] = [
      result[randomIndex],
      result[currentIndex],
    ];
  }

  return result;
}

export function pickRandom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
