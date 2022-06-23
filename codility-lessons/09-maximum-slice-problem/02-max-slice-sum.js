/*
#easy
#three

Kadane's Algorithm: Find a maximum sum of a compact subsequence of array elements.

A non-empty array A consisting of N integers is given. A pair of integers (P, Q), such that 0 ≤ P ≤ Q < N, is called a slice of array A. The sum of a slice (P, Q) is the total of A[P] + A[P+1] + ... + A[Q].

Write a function:

function solution(A);

that, given an array A consisting of N integers, returns the maximum sum of any slice of A.

For example, given array A such that:
A[0] = 3  A[1] = 2  A[2] = -6
A[3] = 4  A[4] = 0

the function should return 5 because:
(3, 4) is a slice of A that has sum 4,
(2, 2) is a slice of A that has sum −6,
(0, 1) is a slice of A that has sum 5

no other slice of A has sum greater than (0, 1).
*/

function maxSliceSum(A) {
  let sumGrEqElem = [A[0]];
  let max = A[0];

  // sumGrEqElem:
  // find the sum of the elements in the array so far i.e. up till the current element
  // if this sum is greater than or equal to the current element, store it in sumGrEqElem
  // else store the current element in sumGrEqElem

  // max:
  // stores the max element in sumGrEqElem

  for (let i = 1; i < A.length; i++) {
    let item = sumGrEqElem[sumGrEqElem.length - 1] + A[i];

    if (item >= A[i]) sumGrEqElem.push(item);
    else sumGrEqElem.push(A[i]);

    let lastSumGrEqElem = sumGrEqElem[sumGrEqElem.length - 1];
    if (lastSumGrEqElem > max) max = lastSumGrEqElem;
  }

  return max;
}

maxSliceSum([3, 2, -6, 4, 0]);

