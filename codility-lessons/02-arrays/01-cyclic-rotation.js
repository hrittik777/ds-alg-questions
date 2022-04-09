/* 
#easy

Rotate an array to the right by a given number of steps.

An array A consisting of N integers is given. Rotation of the array means that each element is shifted right by one index, and the last element of the array is moved to the first place. For example, the rotation of array A = [3, 8, 9, 7, 6] is [6, 3, 8, 9, 7] (elements are shifted right by one index and 6 is moved to the first place).

The goal is to rotate array A K times; that is, each element of A will be shifted to the right K times.

Write a function:

function solution(A, K);

that, given an array A consisting of N integers and an integer K, returns the array A rotated K times.

For example, given
    A = [3, 8, 9, 7, 6]
    K = 3

the function should return [9, 7, 6, 3, 8]. Three rotations were made:
    [3, 8, 9, 7, 6] -> [6, 3, 8, 9, 7]
    [6, 3, 8, 9, 7] -> [7, 6, 3, 8, 9]
    [7, 6, 3, 8, 9] -> [9, 7, 6, 3, 8]

For another example, given
    A = [0, 0, 0]
    K = 1

the function should return [0, 0, 0]

Given
    A = [1, 2, 3, 4]
    K = 4

the function should return [1, 2, 3, 4]
*/

function mul(a, b) {
  let i = 1;

  while (a * i < b) {
    i += 1;
  }

  if (i !== 1) return i - 1;
  else return i;
}

function cyclicRotation(A, K) {
  let newArr = [], prevPos = 0;

  for (let i = 0; i < A.length; i += 1) {
    let multiplier = mul(A.length, K);
    let newIdx;

    if (K < A.length) {
      newIdx = i + K;
    } else {
      newIdx = i + (K - multiplier * A.length);
    }

    if (newIdx >= A.length) {
      newIdx = newIdx - A.length;
    }

    newArr[newIdx] = A[i];
  }

  return newArr;
}

cyclicRotation([3, 8, 9, 7, 6], 3);