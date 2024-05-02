export const fizzBuzz = (N: number): (string | number)[] => {
  const resultArr = [];

  for (let i = 1; i <= N; i++) {
    if (i % 3 === 0) {
      resultArr.push('Fizz');
      continue;
    }

    if (i % 5 === 0) {
      resultArr.push('Buzz');
      continue;
    }
    resultArr.push(i);
  }

  return resultArr;
};
