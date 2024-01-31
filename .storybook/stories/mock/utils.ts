export const randomFromArray = (array: any[], count?: number): any[] | any => {
  if (count !== undefined) {
    const randomArray = [];
    for (let i = 0; i < count; i++) {
      randomArray.push(array[Math.round(Math.random() * (array.length - 1))]);
    }
    return randomArray;
  }
  return array[Math.round(Math.random() * (array.length - 1))];
};

export const randomNumber = ({ min = 0, max }: { min?: number; max: number }) => {
  return min + Math.round(Math.random() * max);
};
