/*
#easy
#one

Find the index S such that the leaders of the sequences A[0], A[1], ..., A[S] and A[S + 1], A[S + 2], ..., A[N - 1] are the same.

A non-empty array A consisting of N integers is given.

The leader of this array is the value that occurs in more than half of the elements of A.

An equi leader is an index S such that 0 ≤ S < N − 1 and two sequences A[0], A[1], ..., A[S] and A[S + 1], A[S + 2], ..., A[N − 1] have leaders of the same value.

For example, given array A such that:
    A[0] = 4
    A[1] = 3
    A[2] = 4
    A[3] = 4
    A[4] = 4
    A[5] = 2

we can find two equi leaders:
    0, because sequences: (4) and (3, 4, 4, 4, 2) have the same leader, whose value is 4.
    2, because sequences: (4, 3, 4) and (4, 4, 2) have the same leader, whose value is 4.

The goal is to count the number of equi leaders.

Write a function:

class Solution { public int solution(int[] A); }

that, given a non-empty array A consisting of N integers, returns the number of equi leaders.

For example, given:
    A[0] = 4
    A[1] = 3
    A[2] = 4
    A[3] = 4
    A[4] = 4
    A[5] = 2

the function should return 2, as explained above.
*/

/* INEFFICIENT SOLUTION */
function leader(A) {
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

  if (A.length === 1) return A[0];

  if (maxCount > A.length / 2) {
    for (let i = 0; i < A.length; i++) {
      if (A[i] === maxElem) return maxElem;
    }
  }
}

function equiLeader(A) {
  let slicePos = 1;
  let res = 0;

  while (slicePos < A.length) {
    let arr1 = A.slice(0, slicePos);
    let arr2 = A.slice(slicePos);

    if (typeof leader(arr1) !== "undefined" &&
      typeof leader(arr2) !== "undefined" &&
      leader(arr1) === leader(arr2))
      res += 1;

    slicePos += 1;
  }

  return res;
}

equiLeader([1, 2, 3, 4, 5]);

/* EFFICIENT SOLUTION */
function leader(A) {
  let B = [...A].sort((a, b) => a - b);
  let c = 1;
  let dom;

  if (A.length === 1) return A[0];

  for (let i = 1; i < B.length; i++) {
    if (B[i] !== B[i - 1]) c = 1;
    else c += 1;

    if (c > parseInt(B.length / 2)) dom = B[i];
  }

  return dom;
}

// NOTE: each sub-slice of an array will have the same dominator as the whole array. This is a mathematical fact.

function equiLeader(A) {
  let res = 0;

  // find the dominator
  let dom = leader(A);

  // find number of occurences of dominator
  let count = A.filter(i => i === dom).length;

  // loop over the array and for each iteration:
  // find the no. of occurances of dominator on left and right slices
  // if for both slices, the no. of occurances is greater than half the length of the slice, then increment result by 1
  let leftCount = 0, rightCount = 0;

  for (let i = 0; i < A.length; i++) {
    if (A[i] === dom) leftCount += 1;
    rightCount = count - leftCount;

    if (leftCount > parseInt((i + 1) / 2) && rightCount > parseInt((A.length - i - 1) / 2)) {
      res += 1;
    }
  }

  return res;
}

equiLeader([4, 4, 2, 5, 3, 4, 4, 4]);