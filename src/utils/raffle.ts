const generateNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;


export const fisherYatesShuffle = (array: string[]): string[] => {
    // if it's 1 or 0 items, just return
    if (array.length <= 1) return array;
    // For each index in array
    for (let i = 0; i < array.length; i++) {
      // choose a random not-yet-placed item to place there
      // must be an item AFTER the current item, because the stuff
      // before has all already been placed
      const randomChoiceIndex = generateNumber(i, array.length - 1);
      // place our random choice in the spot by swapping
      [array[i], array[randomChoiceIndex]] = [array[randomChoiceIndex] as string, array[i] as string];
    }
    return array;
  }