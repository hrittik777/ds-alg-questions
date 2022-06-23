/* 
#medium
#three

Count the minimum number of jumps required for a frog to get to the other side of a river.

The Fibonacci sequence is defined using the following recursive formula:
    F(0) = 0
    F(1) = 1
    F(M) = F(M - 1) + F(M - 2) if M >= 2

A small frog wants to get to the other side of a river. The frog is initially located at one bank of the river (the position "−1") 
And wants to get to the other bank (the position "N"). The frog can jump over any distance F(K), where F(K) is the K-th Fibonacci number. Luckily, there are many leaves on the river, and the frog can jump between the leaves, but only in the direction of the bank at position N.

The leaves on the river are represented in an array A consisting of N integers. Consecutive elements of array A represent consecutive positions from 0 to N − 1 on the river. Array A contains only 0s and/or 1s:

0 represents a position without a leaf;
1 represents a position containing a leaf.
The goal is to count the minimum number of jumps in which the frog can get to the other side of the river (from position "−1" to position "N"). The frog can jump between positions −1 and N (the banks of the river) and every position containing a leaf.

For example, consider array A such that:
    A[0] = 0
    A[1] = 0
    A[2] = 0
    A[3] = 1
    A[4] = 1
    A[5] = 0
    A[6] = 1
    A[7] = 0
    A[8] = 0
    A[9] = 0
    A[10] = 0

The frog can make three jumps of length F(5) = 5, F(3) = 2 and F(5) = 5.

Write a function:

function solution(A);

that, given an array A consisting of N integers, returns the minimum number of jumps by which the frog can get to the other side of the river. If the frog cannot reach the other side of the river, the function should return −1.

For example, given:
    A[0] = 0
    A[1] = 0
    A[2] = 0
    A[3] = 1
    A[4] = 1
    A[5] = 0
    A[6] = 1
    A[7] = 0
    A[8] = 0
    A[9] = 0
    A[10] = 0
    
the function should return 3, as explained above.
*/

/* MOSTLY CORRECT BUT INEFFICIENT SOLUTION */
/* 83% accuracy, 16% performance */
// fibonacci by recursion
function fibRec(N) {
  if (N <= 1) return N;
  else return fibRec(N - 1) + fibRec(N - 2);
}

// fibonacci by DP
function fibDyn(N) {
  let res = Array(N + 1).fill(0);
  res[1] = 1;

  for (let i = 2; i <= N; i++) {
    res[i] = res[i - 1] + res[i - 2];
  }

  return res;
}

function fibFrog(A) {
  // edge case: empty array
  if (A.length === 0) return 1;

  // initial index of frog: -1
  // indices of river: 0 to N
  // final index of frog: N + 1
  // so we'll pad the array on both sides with two 1's
  A.unshift(1);
  A.push(1);

  let N = A.length;

  // constructing an object containing fib no.s to decrease complexity
  let fib = {};
  let fibArr = fibDyn(N);
  fibArr.forEach(i => fib[i] = true);

  // stops: array containing index of each 1 that occurs
  let stops = [];
  for (let i = 0; i < N; i++) {
    if (A[i] === 1) stops.push(i);
  }

  // edge case: length of river + 1 is a fib no. then river can be crossed in 1 jump e.g. [0, 0, 0, 0]
  if (fib[(N - 2) + 1]) return 1;

  // edge case: only zeros AND length of river + 1 is NOT a fib no. 
  // (cus if it was, it would've been caught in the above conditional)
  if (stops.length === 2) return -1;

  // minJumps:
  // an array where we'll store the minimum fib jumps needed to reach each stop (i.e. 1's position)
  let minJumps = new Array(N).fill(0);

  for (let i = 1; i < stops.length; i++) {
    let currStopIdx = stops[i];

    for (let j = i - 1; j >= 0; j--) {
      let prevStopIdx = stops[j];
      let diff = currStopIdx - prevStopIdx;

      // if distance between currStopIdx and prevStopIdx is a fibonacci
      if (fib[diff]) {
        // if the prevStopIdx was reachable OR if the prevStopIdx we're currently checking is the first stop
        // then min jumps needed to reach currStopIdx = min jumps needed to reach prevStopIdx + 1
        if (minJumps[prevStopIdx] !== 0 || prevStopIdx === 0) {
          minJumps[currStopIdx] = minJumps[prevStopIdx] + 1;
        }
      }
    }
  }

  // if min jumps needed to reach the end = 0 that means we couldn't reach
  let finalJumps = minJumps[minJumps.length - 1];
  if (finalJumps !== 0) return finalJumps;
  else return - 1;
}

fibFrog([0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0]);
fibFrog([0, 0, 0, 0]);
fibFrog([1, 1, 0, 0, 0]);
fibFrog([0, 0, 0]);
fibFrog([0, 0, 0, 1, 0]);

/* BETTER, MORE CORRECT AND EFFICIENT SOLUTION */
// ...