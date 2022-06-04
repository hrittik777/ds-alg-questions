/*
#easy

Find an index of an array such that its value occurs at more than half of indices in the array.

An array A consisting of N integers is given. The dominator of array A is the value that occurs in more than half of the elements of A.

For example, consider array A such that
 A[0] = 3    A[1] = 4    A[2] =  3
 A[3] = 2    A[4] = 3    A[5] = -1
 A[6] = 3    A[7] = 3

The dominator of A is 3 because it occurs in 5 out of 8 elements of A (namely in those with indices 0, 2, 4, 6 and 7) and 5 is more than a half of 8.

Write a function

function solution(A);

that, given an array A consisting of N integers, returns index of any element of array A in which the dominator of A occurs. The function should return −1 if array A does not have a dominator.

For example, given array A such that
 A[0] = 3    A[1] = 4    A[2] =  3
 A[3] = 2    A[4] = 3    A[5] = -1
 A[6] = 3    A[7] = 3

the function may return 0, 2, 4, 6 or 7, as explained above.
*/

/* EFFICIENT SOLUTION */
function dominator(A) {
  let count = {};
  let maxCount = 0;
  let maxElem = A[0];

  for (let i = 0; i < A.length; i++) {
    count[A[i]] = count[A[i]] + 1 || 1;

    if (count[A[i]] > maxCount) {
      maxCount = count[A[i]];
      maxElem = A[i];
    }
  }

  if (maxCount <= A.length / 2) return -1;

  for (let i = 0; i < A.length; i++) {
    if (A[i] === maxElem) return i;
  }
}

dominator([3, 4, 3, 2, 3, -1, 3, 3]);

/* ANOTHER EFFICIENT SOLUTION */
function dominator(A) {
  let B = [...A].sort((a, b) => a - b);
  let c = 1;
  let dom;

  // edge case: if A is empty, return -1
  if (!A.length) return -1;

  // edge case: if A has only one element, return 0
  if (A.length === 1) return 0;

  for (let i = 1; i < B.length; i++) {
    if (B[i] !== B[i - 1]) c = 1;
    else c += 1;

    if (c > parseInt(B.length / 2)) dom = B[i];
  }

  // edge case: if there is no dominator, return -1
  if (!dom) return -1;

  for (let i = 0; i < A.length; i++) {
    if (A[i] === dom) return i;
  }
}

dominator([2, 1, 1, 3]);
