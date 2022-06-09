/*
#easy
#one

Count factors of given number n.

A positive integer D is a factor of a positive integer N if there exists an integer M such that N = D * M.

For example, 6 is a factor of 24, because M = 4 satisfies the above condition (24 = 6 * 4).

Write a function:

function solution(N);

that, given a positive integer N, returns the number of its factors.

For example, given N = 24, the function should return 8, because 24 has 8 factors, namely 1, 2, 3, 4, 6, 8, 12, 24. There are no other factors of 24.
*/

/* EFFICIENT SOLUTION */
function countFactors(N) {
  // limit:
  // the rounded down number which is closest to the square root of the input
  let limit = Math.floor(Math.sqrt(N));
  let factors = [];

  // we'll just find the number of factors of the input, up till the "limit"
  // and multiply the number of factors obtained, by 2, to get the answer
  for (let i = 1; i <= limit; i++) {
    if (N % i === 0) factors.push(i);
  }

  // edge case: if the input is a perfect square, decrement the result by one
  if (Math.sqrt(N) % 1 === 0) return factors.length * 2 - 1;
  else return factors.length * 2;
}

countFactors(24);