const getRandomNumberWithinRange = (min: number, max: number) => Math.floor(min + Math.random() * (max + 1 - min));

export default getRandomNumberWithinRange;