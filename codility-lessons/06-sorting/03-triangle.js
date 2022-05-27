/*
#easy

Determine whether a triangle can be built from a given set of edges.

An array A consisting of N integers is given. A triplet (P, Q, R) is triangular if 0 ≤ P < Q < R < N and:
A[P] + A[Q] > A[R],
A[Q] + A[R] > A[P],
A[R] + A[P] > A[Q].

For example, consider array A such that:
  A[0] = 10    A[1] = 2    A[2] = 5
  A[3] = 1     A[4] = 8    A[5] = 20

Triplet (0, 2, 4) is triangular.

Write a function:

function solution(A);

that, given an array A consisting of N integers, returns 1 if there exists a triangular triplet for this array and returns 0 otherwise.

For example, given array A such that:
  A[0] = 10    A[1] = 2    A[2] = 5
  A[3] = 1     A[4] = 8    A[5] = 20

the function should return 1, as explained above. Given array A such that:
  A[0] = 10    A[1] = 50    A[2] = 5
  A[3] = 1

the function should return 0.
*/
function triangle(A) {
  let arr = A.sort((a, b) => a - b);
  let existsTriangle = 0;

  for (let i = 0; i <= arr.length - 3; i += 1) {
    let isTriangle = arr[i] + arr[i + 1] > arr[i + 2] &&
      arr[i + 1] + arr[i + 2] > arr[i] &&
      arr[i] + arr[i + 2] > arr[i + 1];

    if (isTriangle) {
      existsTriangle = 1;
      break;
    }
  }

  return existsTriangle;
}

triangle([10, 2, 5, 1, 8, 20]);