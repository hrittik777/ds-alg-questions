/*
#medium
#three

Find the maximum number of flags that can be set on mountain peaks.

A non-empty array A consisting of N integers is given.

A peak is an array element which is larger than its neighbours. More precisely, it is an index P such that 0 < P < N − 1 and A[P − 1] < A[P] > A[P + 1].

For example, the following array A:
    A[0] = 1
    A[1] = 5
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

has exactly four peaks: elements 1, 3, 5 and 10.

You are going on a trip to a range of mountains whose relative heights are represented by array A, as shown in a figure below. You have to choose how many flags you should take with you. The goal is to set the maximum number of flags on the peaks, according to certain rules.

Figure: https://app.codility.com/programmers/lessons/10-prime_and_composite_numbers/flags/

Flags can only be set on peaks. What's more, if you take K flags, then the distance between any two flags should be greater than or equal to K. The distance between indices P and Q is the absolute value |P − Q|.

For example, given the mountain range represented by array A, above, with N = 12, if you take:
    two flags, you can set them on peaks 1 and 5;
    three flags, you can set them on peaks 1, 5 and 10;
    four flags, you can set only three flags, on peaks 1, 5 and 10.

You can therefore set a maximum of three flags in this case.

Write a function:

function solution(A);

that, given a non-empty array A of N integers, returns the maximum number of flags that can be set on the peaks of the array.

For example, the following array A:
    A[0] = 1
    A[1] = 5
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
function flags(A) {
  // edge case
  if (A.length < 3) return 0;

  let peaks = [];
  for (let i = 1; i < A.length - 1; i++) {
    if (A[i - 1] < A[i] && A[i] > A[i + 1]) peaks.push(i);
  }

  // the max number of flags is limited by the sqrt of the no. of elements in the array
  // cus, if we wanna place i flags, distance between each flag should be at least i
  // we need (i - 1) distances of i
  // so, (i - 1) * i should be less than or equal to N, i.e. the no. of elements in the array
  // or, i ^ 2 should be less than or equal to N
  // or, i should be less than or equal to sqrt of N
  // also, i should always be less than or equal to the no. of peaks

  // so,
  // condition 1: the max flags we can have should be less than or equal to "peaks"
  // condition 2: the max flags we can have should be less than or equal to sqrt(N)
  // so we set "limit" as the minimum of the two  
  // limit: max hypothetically possible no. of flags based on conditions 1 & 2
  let N = A.length;
  let limit = Math.min(peaks.length, Math.floor(Math.sqrt(N)));

  // edge cases
  if (peaks.length === 0) return 0;
  else if (peaks.length === 1) return 1;

  let res = 0;

  // so we can start at the "limit" (+ 1 for redundancy) and keep testing, and keep decrementing the value of i
  // checking each time, against the decremented value of "limit"
  // i.e. the max hypothetically possible no. of flags
  for (let i = limit + 1; i >= 0; i--) {

    // if both our conditions (1 and 2) are satisfied, 
    // then we can proceed to check if the condition specified in the question is being satisfied
    // i.e. if the distance between 2 flags <= no. of flags
    if (i <= Math.floor(Math.sqrt(N)) && i <= peaks.length) {

      // since none of the edge cases passed, 
      // then there should be at least 1 flag, at the first peak i.e. at peaks[0]
      let flags = 1;
      let lastFlagPos = 0;

      for (let j = 1; j < peaks.length; j++) {
        // remember: i = the max hypothetically possible no. of flags
        if (peaks[j] - peaks[lastFlagPos] >= i && flags < i) {
          flags += 1;
          lastFlagPos = j;
        }
      }

      // if the value of "flags" for this iteration is less than the last iteration
      // then return the value we found in the last iteration i.e. res
      // else set res = flags
      if (flags < res) return res;
      else if (flags > res) res = flags;
    }
  }

  return res;
}

flags([1, 5, 3, 4, 3, 4, 1, 2, 3, 4, 6, 2]);
flags([1, 3, 2]);
flags([0, 0, 0, 0, 0, 1, 0, 1, 0, 1]);
