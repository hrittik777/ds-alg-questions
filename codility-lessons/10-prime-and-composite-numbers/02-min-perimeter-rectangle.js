/*
#easy
#one

Find the minimal perimeter of any rectangle whose area equals N.

An integer N is given, representing the area of some rectangle.

The area of a rectangle whose sides are of length A and B is A * B, and the perimeter is 2 * (A + B).

The goal is to find the minimal perimeter of any rectangle whose area equals N. The sides of this rectangle should be only integers.

For example, given integer N = 30, rectangles of area 30 are:
  (1, 30), with a perimeter of 62,
  (2, 15), with a perimeter of 34,
  (3, 10), with a perimeter of 26,
  (5, 6), with a perimeter of 22.

Write a function:

function solution(N);

that, given an integer N, returns the minimal perimeter of any rectangle whose area is exactly equal to N.

For example, given an integer N = 30, the function should return 22, as explained above.
*/

/* INEFFICIENT SOLUTION */
function minPerimeterRectangle(N) {
  let factors = [];
  let minPerimiter = 2 * (N + 1);

  for (let i = 1; i <= N; i++) {
    if (N % i === 0) factors.push(i);
  }

  for (let i = 0; i < factors.length; i++) {
    if (factors[i] * factors[factors.length - i - 1] === N) {
      let perimiter = 2 * (factors[i] + factors[factors.length - i - 1]);
      if (perimiter < minPerimiter) minPerimiter = perimiter;
    }
  }

  return minPerimiter;
}

minPerimeterRectangle(30);

/* EFFICIENT SOLUTION */
function minPerimeterRectangle(N) {
  let limit = Math.floor(Math.sqrt(N));
  let min = 2 * (N + 1);

  // each of N's factor * (N / factor) = N
  // similar to the previous problem, only iterate till "limit"
  // after "limit", all computations will repeat themselves
  // e.g. if N = 30, limit = 5, 5 * 6 = 30
  // next iteration: 6 * 5 = 30 but we've already seen this one i.e. 5
  for (let i = 1; i <= limit; i++) {
    if (N % i === 0) {
      let perimeter = 2 * (i + (N / i));

      if (perimeter < min) min = perimeter;
    }
  }

  return min;
}

minPerimeterRectangle(30);