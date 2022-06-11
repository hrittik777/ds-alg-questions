/*
#medium
#three

Divide an array into the maximum number of same-sized blocks, each of which should contain an index P such that A[P - 1] < A[P] > A[P + 1].

A non-empty array A consisting of N integers is given.

A peak is an array element which is larger than its neighbors. More precisely, it is an index P such that 0 < P < N − 1,  A[P − 1] < A[P] and A[P] > A[P + 1].

For example, the following array A:
    A[0] = 1
    A[1] = 2
    A[2] = 3
    A[3] = 4
    A[4] = 3
    A[5] = 4
    A[6] = 1
    A[7] = 2
    A[8] = 3
    A[9] = 4
    A[10] = 6
    A[11] = 2

has exactly three peaks: 3, 5, 10.

We want to divide this array into blocks containing the same number of elements.
What's more, every block should contain at least one peak. Notice that extreme elements of the blocks (for example A[K − 1] or A[K]) can also be peaks, but only if they have both neighbors (including one in an adjacent blocks).

The goal is to find the maximum number of blocks into which the array A can be divided.

Array A can be divided into blocks as follows:
    one block (1, 2, 3, 4, 3, 4, 1, 2, 3, 4, 6, 2). This block contains three peaks.
    two blocks (1, 2, 3, 4, 3, 4) and (1, 2, 3, 4, 6, 2). Every block has a peak.
    three blocks (1, 2, 3, 4), (3, 4, 1, 2), (3, 4, 6, 2). Every block has a peak. Notice in particular that the first block (1, 2, 3, 4) has a peak at A[3], because A[2] < A[3] > A[4], even though A[4] is in the adjacent block.

However, array A cannot be divided into four blocks, (1, 2, 3), (4, 3, 4), (1, 2, 3) and (4, 6, 2), because the (1, 2, 3) blocks do not contain a peak. Notice in particular that the (4, 3, 4) block contains two peaks: A[3] and A[5].

The maximum number of blocks that array A can be divided into is three.

Write a function:

function solution(A);

that, given a non-empty array A consisting of N integers, returns the maximum number of blocks into which A can be divided.

If A cannot be divided into some number of blocks, the function should return 0.

For example, given:
    A[0] = 1
    A[1] = 2
    A[2] = 3
    A[3] = 4
    A[4] = 3
    A[5] = 4
    A[6] = 1
    A[7] = 2
    A[8] = 3
    A[9] = 4
    A[10] = 6
    A[11] = 2

the function should return 3, as explained above.
*/

/* WRONG SOLUTION */
/* 66% accuracy, following the logic of the previous "flags" problem */
function splitPeaks(A) {
  // edge case
  if (A.length < 3) return 0;

  let peaks = [];
  for (let i = 1; i < A.length - 1; i++) {
    if (A[i - 1] < A[i] && A[i] > A[i + 1]) peaks.push(i);
  }

  // the max number of splits (i) is limited by the sqrt of the no. of elements (N) in the array
  // cus only factors of N, will be able to split it perfectly
  // and we are familiar with the sqrt rule for factors
  // also, i should always be less than or equal to the no. of peaks, since each split should have at least one peak

  // so,
  // condition 1: the max splits we can have should be less than or equal to "peaks"
  // condition 2: the max splits we can have should be less than or equal to sqrt(N)
  // so we set "limit" as the minimum of the two  
  // limit: max hypothetically possible no. of splits based on conditions 1 & 2
  let N = A.length;
  let limit = Math.min(peaks.length, Math.floor(Math.sqrt(N)));

  // edge cases
  if (peaks.length === 0) return 0;
  else if (peaks.length === 1) return 1;

  let res = 0;

  // so we can start at the "limit" (+ 1 for redundancy) and keep testing, and keep decrementing the value of i
  // checking each time, against the decremented value of "limit"
  // i.e. the max hypothetically possible no. of splits
  for (let i = limit + 1; i >= 0; i--) {

    // if both our conditions (1 and 2) are satisfied
    // and i is a factor of N (only then can it perfectly split the array)
    // then we can proceed to check if each split has a peak
    if (i <= Math.floor(Math.sqrt(N)) && i <= peaks.length && N % i === 0) {

      // first split ends at index 0 + (N / i) - 1
      // we'll increment this for each peak we encounter
      let splitEndIdx = 0 + (N / i) - 1;

      // checks if for each peak, it's index is lesser or equal to the corresponding "splitEndIdx" for that iteration
      // i.e. to see if the peak falls withing the split
      let condition = true;

      for (let j = 0; j < peaks.length; j++) {
        if (peaks[j] <= splitEndIdx) {
          splitEndIdx += (N / i) - 1;
        } else {
          condition = false;
          break;
        }

        // if the value of i for this iteration is less than the last iteration
        // then return the value we found in the last iteration i.e. res
        // else set res = i
        if (condition && i < res) return res;
        else if (condition && i > res) res = i;
      }
    }
  }

  return res;
}

splitPeaks([1, 2, 3, 4, 3, 4, 1, 2, 3, 4, 6, 2]);
splitPeaks([1, 3, 2, 1]);

/* BETTER SOLUTION */
/* 83% accuracy */
function splitPeaks(A) {
  // edge case
  if (A.length < 3) return 0;

  let peaks = [];
  for (let i = 1; i < A.length - 1; i++) {
    if (A[i - 1] < A[i] && A[i] > A[i + 1]) peaks.push(i);
  }

  let N = A.length;

  // P: an array initialized with zeros
  // P.length === A.length
  // each position of a peak has 1 and other elements are zeros
  let P = Array(N).fill(0);
  for (let i = 0; i < peaks.length; i++) P[peaks[i]] = 1;

  // the max no. of splits we can have would be equal to the no. of peaks
  // i.e. in the best case scenario, each split has only one peak, 
  // so that we can have max no. of splits, each with one peak
  // so, limit: max hypothetically possible no. of splits
  let limit = peaks.length;

  let res = 0;

  // edge cases
  if (peaks.length === 0) return 0;
  else if (peaks.length === 1) return 1;

  for (let i = limit + 1; i >= 0; i--) {

    // the no. of aplits should be a factor of N
    // only then we can perfectly split A into equal slices
    if (N % i === 0) {

      // ss: an array initialized with zeros
      // ss.length === P.length
      // if we split P into a certain no. of slices, each split should have at east 1 peak
      // if so, then for the remaining indexes of that particular split of P, we set the corresponding remaining indices of ss to 1
      // e.g. when splitting into 3 slices:
      // A:  [1, 2, 3, 4,   3, 4, 1, 2,   3, 4, 6, 2];
      // P:  [0, 0, 0, 1,   0, 1, 0, 0,   0, 0, 1, 0];
      // ss: [0, 0, 0, 1,   0, 1, 1, 1,   0, 0, 1, 1];
      let ss = Array(N).fill(0);
      let encounteredPeak = false;
      let splitEndIdx = 0 + (N / i) - 1;

      // condition: gets set to false the moment the last element of any slice of "ss" is still 0, 
      // and breaks out of the loop cus this means one of the splits does not have a peak
      let condition = true;

      for (let j = 0; j < N; j++) {
        if (j <= splitEndIdx) {
          if (P[j] === 1) encounteredPeak = true;
          if (encounteredPeak) ss[j] = 1;
        } else {
          encounteredPeak = false;
          splitEndIdx = j + (N / i) - 1;
        }

        if (j === splitEndIdx && ss[j] === 0) {
          condition = false;
          break;
        }
      }

      if (condition && i < res) return res;
      else if (condition && i > res) res = i;

      condition = true;
    }
  }

  return res;
}

splitPeaks([1, 2, 3, 4, 3, 4, 1, 2, 3, 4, 6, 2]);

