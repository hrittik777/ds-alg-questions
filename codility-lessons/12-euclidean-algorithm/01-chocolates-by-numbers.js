/*
#easy

There are N chocolates in a circle. Count the number of chocolates you will eat.

Two positive integers N and M are given. Integer N represents the number of chocolates arranged in a circle, numbered from 0 to N − 1.

You start to eat the chocolates. After eating a chocolate you leave only a wrapper.

You begin with eating chocolate number 0. Then you omit the next M − 1 chocolates or wrappers on the circle, and eat the following one.

More precisely, if you ate chocolate number X, then you will next eat the chocolate with number (X + M) modulo N (remainder of division).

You stop eating when you encounter an empty wrapper.

For example, given integers N = 10 and M = 4. You will eat the following chocolates: 0, 4, 8, 2, 6.

The goal is to count the number of chocolates that you will eat, following the above rules.

Write a function:

function solution(N, M);

that, given two positive integers N and M, returns the number of chocolates that you will eat.

For example, given integers N = 10 and M = 4. the function should return 5, as explained above.
*/

/* SOMEWHAT EFFICIENT SOLUTION */
/* 50% performance, 100% accuracy */
function chocolatesByNumbers(N, M) {
  // write your code in JavaScript (Node.js 8.9.4)
  let eaten = [];
  let visited = {};

  for (let i = 0; !visited[i]; i = (i + M) % N) {
    eaten.push(i);
    visited[i] = true;
  }

  return eaten.length;
}

chocolatesByNumbers(10, 4);

/* EFFICIENT SOLUTION */
// Euclidean Algorithm by division to find GCD
function findGCD(A, B) {
  if (A % B === 0) return B;
  else return findGCD(B, A % B);
}

function chocolatesByNumbers(N, M) {
  let GCD = findGCD(N, M);
  let LCM = (N * M) / GCD;

  // as a mathematical rule, as we keep going around the circle, 
  // we must arrive back at where we started from i.e. the 0th index at some point

  // for 10 and 4, LCM = 20
  // this means, with a omit step of 4, we will cover 20 elements, before we arrive at the 0th index
  // and since we eat a chocolate at the end of each step, we eat 20 / 4 chocolates

  return LCM / M;
}

chocolatesByNumbers(10, 4);