/*
#medium
#two

Count the semiprime numbers in the given range [a..b]

A prime is a positive integer X that has exactly two distinct divisors: 1 and X. The first few prime integers are 2, 3, 5, 7, 11 and 13.

A semiprime is a natural number that is the product of two (not necessarily distinct) prime numbers. The first few semiprimes are 4, 6, 9, 10, 14, 15, 21, 22, 25, 26.

You are given two non-empty arrays P and Q, each consisting of M integers. These arrays represent queries about the number of semiprimes within specified ranges.

Query K requires you to find the number of semiprimes within the range (P[K], Q[K]), where 1 ≤ P[K] ≤ Q[K] ≤ N.

For example, consider an integer N = 26 and arrays P, Q such that:
    P[0] = 1    Q[0] = 26
    P[1] = 4    Q[1] = 10
    P[2] = 16   Q[2] = 20

The number of semiprimes within each of these ranges is as follows:
    (1, 26) is 10,
    (4, 10) is 4,
    (16, 20) is 0.

Write a function:

function solution(N, P, Q);

that, given an integer N and two non-empty arrays P and Q consisting of M integers, returns an array consisting of M elements specifying the consecutive answers to all the queries.

For example, given an integer N = 26 and arrays P, Q such that:
    P[0] = 1    Q[0] = 26
    P[1] = 4    Q[1] = 10
    P[2] = 16   Q[2] = 20

the function should return the values [10, 4, 0], as explained above.
*/

// Sieve of Eratosthenes: to find prime no.s up till a given range
function findPrimes(N) {

  // isPrime: array storing info about whether a number (the index of the array) is prime
  // if isPrime[i] === 1 then i ia a prime no.
  // if isPrime[i] === 0 then i ia not a prime no.
  // we initialize all elements of isPrime as 1 and then iterate to find the non-primes
  let isPrime = Array(N + 1).fill(1);

  // 0 and 1 are not prime no.s
  isPrime[0] = 0, isPrime[1] = 0;

  // sieve of eratosthenes method:
  // we iterate over range 0 to N, take the smallest value, and set all it's multiples as primes
  // e.g. 
  // if we're at i = 2, then 4, 6, 8, 10... are non primes
  // if we're at i = 3, then 3, 6, 9, 12... are non primes
  // and so on.

  // this algorithm can be improved
  // note that, for each value of i
  // we needn't check to eliminate elements that are lesser than i ^ 2
  // because these elements would've already been eliminated by some other prime divisor's multiples
  // so we can proceed to elimiate elements that fall after i ^ 2 up till N
  // e.g.
  // if we're at i = 3, then we don't need to check to elimiate anything under 9
  // because 6 (and also 4 and 8) has already been eliminated by 2's multiples

  // we start at 2 cus 0 and 1 are not prime no.s
  for (let i = 2; i <= N; i++) {

    // i.e. if the value of i in isPrimes === 1
    if (isPrime[i]) {
      let limit = i ** 2;

      // we start from i ^ 2 and proceed to check and eliminate all multiples of i occuring thereafter, up till N
      for (let j = limit; j <= N; j += i) {
        isPrime[j] = 0;
      }
    }
  }

  return isPrime;
}

function findSemiPrimes(N) {
  let primes = findPrimes(N);

  // isSemiPrime: array storing info about whether a number (the index of the array) is a semi-prime
  // if isSemiPrime[i] === 1 then i ia a semi-prime no.
  // if isSemiPrime[i] === 0 then i ia not a semi-prime no.
  // we initialize all elements of isSemiPrime as 0 and then iterate to find the semi-primes
  let isSemiPrime = Array(N + 1).fill(0);

  for (let i = 0; i <= N; i++) {
    for (let j = 0; j <= N; j++) {

      // if i and j are prime no.s, then i * j is a semi-prime (and here, i * j should be within N)
      if (primes[i] && primes[j] && i * j <= N) {
        isSemiPrime[i * j] = 1;
      }

      if (i * j > N) break;
    }
  }

  return isSemiPrime;
}

function countSemiPrimes(N, P, Q) {
  let semiPrimes = findSemiPrimes(N);

  // finding the number of semi-primes found up till the current index
  let sum = 0;
  let cumSemiPrimes = [];
  for (let i = 0; i < semiPrimes.length; i++) {
    sum += semiPrimes[i];
    cumSemiPrimes[i] = sum;
  }

  let res = [];

  for (let i = 0; i < P.length; i++) {
    res.push(cumSemiPrimes[Q[i]] - cumSemiPrimes[P[i] - 1]);
  }

  return res;
}

countSemiPrimes(26, [1, 4, 16], [26, 10, 20]);