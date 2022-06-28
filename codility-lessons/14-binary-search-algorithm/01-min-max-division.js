/*
#medium
#three

You are given integers K, M and a non-empty array A consisting of N integers. Every element of the array is not greater than M.

You should divide this array into K blocks of consecutive elements. The size of the block is any integer between 0 and N. Every element of the array should belong to some block.

The sum of the block from X to Y equals A[X] + A[X + 1] + ... + A[Y]. The sum of empty block equals 0.

The large sum is the maximal sum of any block.

For example, you are given integers K = 3, M = 5 and array A such that:
  A[0] = 2
  A[1] = 1
  A[2] = 5
  A[3] = 1
  A[4] = 2
  A[5] = 2
  A[6] = 2

The array can be divided, for example, into the following blocks:
  [2, 1, 5, 1, 2, 2, 2], [], [] with a large sum of 15;
  [2], [1, 5, 1, 2], [2, 2] with a large sum of 9;
  [2, 1, 5], [], [1, 2, 2, 2] with a large sum of 8;
  [2, 1], [5, 1], [2, 2, 2] with a large sum of 6.

The goal is to minimize the large sum. In the above example, 6 is the minimal large sum.

Write a function:

function solution(K, M, A);

that, given integers K, M and a non-empty array A consisting of N integers, returns the minimal large sum.

For example, given K = 3, M = 5 and array A such that:
  A[0] = 2
  A[1] = 1
  A[2] = 5
  A[3] = 1
  A[4] = 2
  A[5] = 2
  A[6] = 2

the function should return 6, as explained above.
*/

function binarySearch(A, N) {
  let min = 0;
  let max = A.length - 1;

  while (min <= max) {
    let mid = Math.floor((max + min) / 2);

    if (N > A[mid]) min = mid + 1;
    else if (N < A[mid]) max = mid - 1;
    else if (N === A[mid]) return mid;
  }
}

binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17], 11);

// this function checks the number of blocks that we can get for each "mid" (or "guess") i.e. a possible value of minimum large sum
function checkBlocks(A, guess) {
  let blockSum = 0;
  let blocks = 1;

  // here, we're iterating through the array, for a given "guess"
  // each time the blockSum exceeds guess, we'd start a new block from the current element onwards
  // so reset blockSum to the current element (so we can add subsequent elements to this) for calculating next blockSum
  // and increment no. of blocks by 1

  for (let i = 0; i < A.length; i++) {
    blockSum += A[i];

    if (blockSum > guess) {
      blockSum = A[i];
      blocks += 1;
    }
  }

  return blocks;
}

function minMaxDivision(K, M, A) {
  // the minimum possible large sum = the largest element of the array
  // since this element will be in at least one of the blocks, either alone or with other elements
  let min = Math.max(...A);

  // the maximum possible large sum = sum of elements of the array
  // in case all elements are in the same blocks
  let max = A.reduce((i, a) => i + a);

  // we'll keep decrementing res down from max and the answer will be the max possible large sum
  let res = max;

  // edge cases
  if (K === 1) return max;
  if (K >= A.length) return min;

  // what we're doing is,
  // for each "mid", where mid is a possible value of minimum large sum
  // we're checking how many blocks we can get
  // we could simply decrement res by 1 at each iteration and check, but 
  // we'll do binary search instead of linear search cus of better time complexity

  while (min <= max) {
    let mid = Math.floor((min + max) / 2);

    let blocks = checkBlocks(A, mid);

    // if the no. of blocks > K, 
    // then it means our mid is too low, so we're getting too many blocks
    // so, we gotta increase the sample space range i.e. bring min to mid + 1

    // if the no. of blocks < K, 
    // then it means our mid is too high, so we're getting too little blocks
    // so, we gotta decrease the sample space range i.e. bring max to mid - 1
    // and since our max is decreasing, our res will also decrease
    // so set res to the currrent value of "mid" i.e. the current possible min large sum that we're checking

    // if the no. of blocks === K, 
    // then it means our mid is almost correct
    // but we might be able to decrease the mid a bit more and get the same no. of blocks
    // remember, we need to find MINIMUM large sum, and our "mid" here is a possible value of large sum
    // so, we gotta decrease the sample space range i.e. bring max to mid - 1
    // and since our max is decreasing, our res will also decrease
    // so set res to the currrent value of "mid" i.e. the current possible min large sum that we're checking

    if (blocks > K) {
      min = mid + 1;
    } else if (blocks <= K) {
      max = mid - 1;
      if (mid < res) res = mid;
    }
  }

  return res;
}

minMaxDivision(3, 5, [2, 1, 5, 1, 2, 2, 2]);