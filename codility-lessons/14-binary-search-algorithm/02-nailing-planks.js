/*
#medium

You are given two non-empty arrays A and B consisting of N integers. These arrays represent N planks. More precisely, A[K] is the start and B[K] the end of the K−th plank.

Next, you are given a non-empty array C consisting of M integers. This array represents M nails. More precisely, C[I] is the position where you can hammer in the I−th nail.

We say that a plank (A[K], B[K]) is nailed if there exists a nail C[I] such that A[K] ≤ C[I] ≤ B[K].

The goal is to find the minimum number of nails that must be used until all the planks are nailed. In other words, you should find a value J such that all planks will be nailed after using only the first J nails. More precisely, for every plank (A[K], B[K]) such that 0 ≤ K < N, there should exist a nail C[I] such that I < J and A[K] ≤ C[I] ≤ B[K].

For example, given arrays A, B such that:
    A[0] = 1    B[0] = 4
    A[1] = 4    B[1] = 5
    A[2] = 5    B[2] = 9
    A[3] = 8    B[3] = 10

four planks are represented: [1, 4], [4, 5], [5, 9] and [8, 10].

Given array C such that:
    C[0] = 4
    C[1] = 6
    C[2] = 7
    C[3] = 10
    C[4] = 2

if we use the following nails:
    0, then planks [1, 4] and [4, 5] will both be nailed.
    0, 1, then planks [1, 4], [4, 5] and [5, 9] will be nailed.
    0, 1, 2, then planks [1, 4], [4, 5] and [5, 9] will be nailed.
    0, 1, 2, 3, then all the planks will be nailed.

Thus, four is the minimum number of nails that, used sequentially, allow all the planks to be nailed.

Write a function:

function solution(A, B, C);

that, given two non-empty arrays A and B consisting of N integers and a non-empty array C consisting of M integers, returns the minimum number of nails that, used sequentially, allow all the planks to be nailed.

If it is not possible to nail all the planks, the function should return −1.

For example, given arrays A, B, C such that:
    A[0] = 1    B[0] = 4
    A[1] = 4    B[1] = 5
    A[2] = 5    B[2] = 9
    A[3] = 8    B[3] = 10

    C[0] = 4
    C[1] = 6
    C[2] = 7
    C[3] = 10
    C[4] = 2

the function should return 4, as explained above.
*/

/* KINDA CORRECT BUT AND INEFFICIENT SOLUTION */
/* 50% accuracy, 0% performance */
function nailingPlanks(A, B, C) {
  let planks = [];

  for (let i = 0; i < A.length; i++) {
    planks.push([A[i], B[i]]);
  }

  // sorting planks in inreasing order of startIdx
  let sortedPlanks = [...planks].sort((a, b) => a[0] - b[0]);

  // if a plank is completely wrapped by another plank
  // e.g. for planks i and j, if endIdx[i] > endIdx[j]
  // then we don't need to consider plank i, cus any nail that hits plank j will also hit plank i
  // see: http://draganbozanovic.blogspot.com/2016/04/codility-nailingplanks-linear-complexity.html

  // so, for each plank, we'll loop back through all the previous planks
  // and remove all the planks that wrap the current plank

  for (let j = 0; j < sortedPlanks.length; j++) {
    for (let i = j; i >= 0; i--) {

      // i.e. if the previous plank (i) wraps the current plank (j)
      // i.e. if endIdx[i] > endIdx[j], remove plank i
      if (sortedPlanks[i][1] > sortedPlanks[j][1]) {
        sortedPlanks.splice(i, 1);
      }
    }
  }

  let N = sortedPlanks[sortedPlanks.length - 1][1];

  // creating an array of indexes 
  // we'll store the plank no.(s) that occur(s) at a specific index
  let plankIdx = new Array(N + 1).fill(0);

  let plankTotal = 0;

  for (let i = 0; i < sortedPlanks.length; i++) {
    let plankNumber = i + 1;

    // the last plank number is the total number of planks
    plankTotal = plankNumber;

    for (let j = sortedPlanks[i][0]; j <= sortedPlanks[i][1]; j++) {
      plankIdx[j] += `${plankNumber}`;
      plankIdx[j] = parseInt(plankIdx[j]);
    }
  }

  let nails = 0;
  let plankNos = 0;

  // sorting and removing duplicate nails
  let sortedNails = C.sort((a, b) => a - b);
  let sortedNailsSet = new Set(sortedNails);
  let sortedNailsArr = Array.from(sortedNailsSet);

  for (let i = 0; i < sortedNailsArr.length; i++) {
    let values = `${plankIdx[C[i]]}`;

    // values: all planks that the current nail can hit
    // value: one of the planks that the current nail can hit

    for (let j = 0; j < values.length; j++) {
      let value = values[j];

      // we're considering planks in ascending order
      // so plankNos starts at 0, and if we come across planks 1, then 2, etc. 
      // then plankNos will become 1, then 2, etc.
      // and increment nails used, by one
      // if plankNos = plankTotal i.e. the last plank, return

      if (plankNos < value) {
        plankNos = parseInt(value);
        nails += 1;
      }

      if (plankNos === plankTotal) return nails;
    }
  }

  return -1;
}

/* CORRECT AND EFFICIENT SOLUTION */
function getMinNailIdx(plank, nails) {
  let start = 0;
  let end = nails.length - 1;
  let res = -1;

  while (start <= end) {
    let mid = Math.floor((start + end) / 2);

    if (nails[mid].value < plank[0]) start = mid + 1;
    else if (nails[mid].value > plank[1]) end = mid - 1;
    else {
      // if nails[mid] falls between plank[0] and plank[1] i.e the startIdx and endIdx of the plank
      // then that means it hits the plank
      // but we need the minimum idx of the nail that hits the plank and there may be multiple nails that hit the plank
      // so we might be able to decrease the mid a bit more
      res = mid;
      end = mid - 1;
    }
  }

  if (res === -1) return res;

  // now we found the minimum idx (i.e. nail.value) of nail that hits the plank
  // but since we sorted the array, this may not be the first nail that hits the plank
  // so we gotta loop through all the other nails that hit the plank 
  // and find the first idx (i.e. nail.index) of the nail that hits the plank
  let first = nails[res].index;

  for (let i = res + 1; i < nails.length; i++) {
    if (nails[i].value <= plank[1]) {
      first = Math.min(first, nails[i].index)
    }
  }

  return first;
}

function nailingPlanks(A, B, C) {
  let planks = [];

  for (let i = 0; i < A.length; i++) {
    planks.push([A[i], B[i]]);
  }

  // sorting planks in inreasing order of startIdx
  let sortedPlanks = [...planks].sort((a, b) => a[0] - b[0]);

  // if a plank is completely wrapped by another plank
  // e.g. for planks i and j, if endIdx[i] > endIdx[j]
  // then we don't need to consider plank i, cus any nail that hits plank j will also hit plank i
  // see: http://draganbozanovic.blogspot.com/2016/04/codility-nailingplanks-linear-complexity.html

  // so, for each plank, we'll loop back through all the previous planks
  // and remove all the planks that wrap the current plank

  for (let j = 0; j < sortedPlanks.length; j++) {
    for (let i = j; i >= 0; i--) {

      // i.e. if the previous plank (i) wraps the current plank (j)
      // i.e. if endIdx[i] > endIdx[j], remove plank i
      // NOTE: this can be done more efficiently using a queue
      if (sortedPlanks[i] && sortedPlanks[j] && sortedPlanks[i][1] > sortedPlanks[j][1]) {
        sortedPlanks.splice(i, 1);
      }
    }
  }

  // creating an array of objects, where each element has original index and value of nail
  let nailsArr = C.map((val, idx) => { return { value: val, index: idx } });

  // sorting nails in increasing order 
  let sortedNailsArr = nailsArr.sort((a, b) => a.val - b.val);

  let res = 0;

  for (let i = 0; i < sortedPlanks.length; i++) {
    let plank = sortedPlanks[i];

    // for a given plank, get the first nail that hits it
    let minNailIdx = getMinNailIdx(plank, sortedNailsArr);

    if (minNailIdx === -1) return -1;

    // Math.max because the planks are in ascending order
    // so if plank j occurs after plank i, 
    // and idx of first nail that hits j is lower than idx of first nail that hits i
    // then we should consider only the nail that hits i
    res = Math.max(res, minNailIdx);
  }

  // the last nail, that hits the last plank would be our answer
  // we added + 1 because res started from 0, but that'd be 1 nail
  return res + 1;
}

nailingPlanks([1, 4, 5, 8], [4, 5, 9, 10], [4, 6, 7, 10, 2]);
