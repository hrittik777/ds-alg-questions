/*
#easy
#two

Find the missing element in a given permutation.

An array A consisting of N different integers is given. The array contains integers in the range [1..(N + 1)], which means that exactly one element is missing.

Your goal is to find that missing element.

Write a function:

function solution(A);

that, given an array A, returns the value of the missing element.

For example, given array A such that:
  A[0] = 2
  A[1] = 3
  A[2] = 1
  A[3] = 5

the function should return 4, as it is the missing element.
*/
function permMissingElem(A) {
  if (A.length) {
    // sum of consecutive integers from 1 to n is equal to n(n+1)/2
    let expectedSum = ((A.length + 1) * ((A.length + 1) + 1)) / 2;
    let realSum = A.reduce((i, a) => i + a);

    return expectedSum - realSum;
  } else {
    return null;
  }
}

permMissingElem([2, 3, 1, 5]);