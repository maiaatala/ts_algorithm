export const fizzBuzz = (N: number): (string | number)[] => {
  const resultArr = [];

  for (let i = 1; i <= N; i++) {
    let currStrResult = '';
    if (i % 3 === 0) {
      currStrResult = 'Fizz';
    }
    if (i % 5 === 0) {
      currStrResult += 'Buzz';
    }
    resultArr.push(currStrResult || i);
  }

  return resultArr;
};
