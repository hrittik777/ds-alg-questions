/*
#medium
#two

Compute the number of intersections in a sequence of discs.

We draw N discs on a plane. The discs are numbered from 0 to N − 1. An array A of N non-negative integers, specifying the radiuses of the discs, is given. The J-th disc is drawn with its center at (J, 0) and radius A[J].

We say that the J-th disc and K-th disc intersect if J ≠ K and the J-th and K-th discs have at least one common point (assuming that the discs contain their borders).

The figure below shows discs drawn for N = 6 and A as follows:
  A[0] = 1
  A[1] = 5
  A[2] = 2
  A[3] = 1
  A[4] = 4
  A[5] = 0

Figure: https://app.codility.com/programmers/lessons/6-sorting/number_of_disc_intersections/

There are eleven (unordered) pairs of discs that intersect, namely:
  discs 1 and 4 intersect, and both intersect with all the other discs;
  disc 2 also intersects with discs 0 and 3.

Write a function:

function solution(A);

that, given an array A describing N discs as explained above, returns the number of (unordered) pairs of intersecting discs. The function should return −1 if the number of intersecting pairs exceeds 10,000,000.

Given array A shown above, the function should return 11, as explained above.
*/

/* SOMEWHAT EFFICIENT SOLUTION */
function numberOfDiscIntersections(A) {
  let pairs = 0;

  for (let i = 0; i < A.length - 1; i += 1) {
    for (let j = i + 1; j < A.length; j += 1) {
      // when 2 discs cut each other, check condition: center1 + radius1 >= center2 - radius2
      let cutting = (i + A[i]) > (j - A[j]);

      // when 1 disc falls inside the other, check condition: center1 + radius1 >= center2 + radius2
      let fallingIn = (i + A[i]) >= (j + A[j]);

      if (cutting || fallingIn) pairs += 1;
    }
  }

  if (pairs > 10000000) return -1;
  else return pairs;
}

/* MORE EFFICIENT "INSANE" SOLUTION */
// https://www.youtube.com/watch?v=pd_bd5SmkW0
// come back to write this up later

numberOfDiscIntersections([1, 5, 2, 1, 4, 0]);