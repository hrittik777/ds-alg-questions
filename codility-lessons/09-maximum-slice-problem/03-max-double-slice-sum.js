/*
#medium
#three

Find the maximal sum of any double slice.

A non-empty array A consisting of N integers is given.

A triplet (X, Y, Z), such that 0 ≤ X < Y < Z < N, is called a double slice.

The sum of double slice (X, Y, Z) is the total of A[X + 1] + A[X + 2] + ... + A[Y − 1] + A[Y + 1] + A[Y + 2] + ... + A[Z − 1].

For example, array A such that:
    A[0] = 3
    A[1] = 2
    A[2] = 6
    A[3] = -1
    A[4] = 4
    A[5] = 5
    A[6] = -1
    A[7] = 2

contains the following example double slices:
    double slice (0, 3, 6), sum is 2 + 6 + 4 + 5 = 17,
    double slice (0, 3, 7), sum is 2 + 6 + 4 + 5 − 1 = 16,
    double slice (3, 4, 5), sum is 0.

The goal is to find the maximal sum of any double slice.

Write a function:

function solution(A);

that, given a non-empty array A consisting of N integers, returns the maximal sum of any double slice.

For example, given:
    A[0] = 3
    A[1] = 2
    A[2] = 6
    A[3] = -1
    A[4] = 4
    A[5] = 5
    A[6] = -1
    A[7] = 2

the function should return 17, because no double slice of array A has a sum of greater than 17.
*/

// NOTE:
// if we have a triplet (X, Y, Z) it will consider: A[X+1] ... A[Y-1] + A[Y+1] + A[Y+2] ... A[Z-1]
// i.e. it will never take A[X], A[Y] and A[Z]
// therefore, the first and last element will always be ignored, also the split point, i.e. a[Y]

// then,
// LR: using Kadane's to find the max sum for any slices so far, starting from left to right
// RL: using Kadane's to find the max sum for any slices so far starting from right to left

// then,
// LRRL:
// for each element of LR and RL
// find the sum of the right slice and the left slice, always discarding one element in the middle
// e.g., LR[0] + RL[2], LR[1] + RL[3] and so on...
// if this sum is greater than or equal to both the elements, store it in LRRL
// else store the bigger of the two elements in LRRL
function maxDoubleSliceSum(A) {
  // since we will always ignore the first and last elements of the array 
  // therefore the first element of LR and and last element of RL will be 0
  let LR = [0];
  let RL = [0];
  let LRRL = [];

  // building LR:
  for (let i = 1; i < A.length - 1; i++) {
    let item = LR[LR.length - 1] + A[i];

    if (item >= A[i]) LR.push(item);
    else LR.push(A[i]);
  }

  // building RL:
  // unshift would work but it increases time complexity
  // hence we push instead, and compare with last element of RL instead of first element and just reverse RL at the end

  // for (let i = A.length - 1 - 1; i > 0; i--) {
  //   let item = RL[0] + A[i];
  //   if (item >= A[i]) RL.unshift(item);
  //   else RL.unshift(A[i]);
  // }

  for (let i = A.length - 1 - 1; i > 0; i--) {
    let item = RL[RL.length - 1] + A[i];

    if (item >= A[i]) RL.push(item);
    else RL.push(A[i]);
  }

  RL = RL.reverse();

  // building LRRL:
  for (let i = 0; i < LR.length - 1; i++) {
    let item = LR[i] + RL[i + 1];

    if (item >= LR[i] && item >= RL[i + 1]) LRRL.push(item);
    else LRRL.push(Math.max(LR[i], RL[i + 1]));
  }

  return Math.max(...LRRL);
}

maxDoubleSliceSum([6, 1, 5, 6, 4, 2, 9, 4]);