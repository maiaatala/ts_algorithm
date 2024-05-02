export const fizzBuzz = (N: number): (string | number)[] => {
  const resultArr = [];

  for (let i = 1; i <= N; i++) {
    let currResult: string | number = i;
    if (i % 3 === 0) {
      currResult = 'Fizz';
    }
    resultArr.push(currResult);
  }

  return resultArr;
};
