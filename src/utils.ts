export const shuffleArray = (array: any[]): any[] => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[r]] = [newArr[r], newArr[i]];
  }
  return newArr;
};
