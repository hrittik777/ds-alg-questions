/*
#medium
#two

Find the smallest positive integer that does not occur in a given sequence.

Write a function:

function solution(A);

that, given an array A of N integers, returns the smallest positive integer (greater than 0) that does not occur in A.

For example, given A = [1, 3, 6, 4, 1, 2], the function should return 5.

Given A = [1, 2, 3], the function should return 4.

Given A = [−1, −3], the function should return 1.
*/

function missingInteger(A) {
  let arr = A.sort((a, b) => a - b);
  let res;

  // edge case: if all negative elements
  if (arr[arr.length - 1] <= 0) return 1;

  // edge case: if array doesn't have 1, then it would be the smallest missing positive integer
  let isOne = false;

  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i] === 1) isOne = true;
  }

  if (!isOne) return 1;

  // all other regular cases
  for (let i = 0; i < arr.length - 1; i += 1) {
    if (arr[i + 1] - arr[i] > 1) return arr[i] + 1;
  }

  // edge case: all in sequence and no missing elements, return the last element + 1
  return arr[arr.length - 1] + 1;
}