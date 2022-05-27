/*
#medium
#three

Find the minimal average of any slice containing at least two elements.

A non-empty array A consisting of N integers is given. A pair of integers (P, Q), such that 0 ≤ P < Q < N, is called a slice of array A (notice that the slice contains at least two elements). The average of a slice (P, Q) is the sum of A[P] + A[P + 1] + ... + A[Q] divided by the length of the slice. To be precise, the average equals (A[P] + A[P + 1] + ... + A[Q]) / (Q − P + 1).

For example, array A such that:
    A[0] = 4
    A[1] = 2
    A[2] = 2
    A[3] = 5
    A[4] = 1
    A[5] = 5
    A[6] = 8

contains the following example slices:

slice (1, 2), whose average is (2 + 2) / 2 = 2;
slice (3, 4), whose average is (5 + 1) / 2 = 3;
slice (1, 4), whose average is (2 + 2 + 5 + 1) / 4 = 2.5.

The goal is to find the starting position of a slice whose average is minimal.

Write a function:

function solution(A);

that, given a non-empty array A consisting of N integers, returns the starting position of the slice with the minimal average. If there is more than one slice with a minimal average, you should return the smallest starting position of such a slice.

For example, given array A such that:
    A[0] = 4
    A[1] = 2
    A[2] = 2
    A[3] = 5
    A[4] = 1
    A[5] = 5
    A[6] = 8
    
the function should return 1, as explained above.
*/

/* HINT: 
slices of 4 or more numbers always contain a sub-slice with a lower average
therefore, only slices with 2 or 3 elements need to be tested in our algorithm

so,for each element in the array, A[i]:
  - find average of A[i], A[i + 1]
  - find average of A[i], A[i + 1], A[i + 2]
  - save the minimum and start index

see: https://www.youtube.com/watch?v=Xu_hTjFAauk
*/
function minAvgTwoSlice(A) {
  // initializing minSlice to a number that is definitely larger than the entire array's average
  let minSlice = A.reduce((i, a) => i + a) / (A.length - 1) + 999;
  let minIndex = 0;

  for (let i = 0; i < A.length - 2; i += 1) {
    let avgTwo = (A[i] + A[i + 1]) / 2;
    let avgThree = (A[i] + A[i + 1] + A[i + 2]) / 3;
    let avgMin = Math.min(avgTwo, avgThree);

    if (avgMin < minSlice) {
      minSlice = avgMin;
      minIndex = i;
    }
  }

  // edge case: last 2 elements
  let lastTwo = A.slice(A.length - 2);
  let lastTwoAvg = (lastTwo[0] + lastTwo[1]) / 2;

  if (lastTwoAvg < minSlice) return A.length - 2;

  return minIndex;
}

minAvgTwoSlice([4, 2, 2, 5, 1, 5, 8]);