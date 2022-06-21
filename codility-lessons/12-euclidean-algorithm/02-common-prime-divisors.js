/*
#medium
#three

Check whether two numbers have the same prime divisors.

A prime is a positive integer X that has exactly two distinct divisors: 1 and X. The first few prime integers are 2, 3, 5, 7, 11 and 13.

A prime D is called a prime divisor of a positive integer P if there exists a positive integer K such that D * K = P. For example, 2 and 5 are prime divisors of 20.

You are given two positive integers N and M. The goal is to check whether the sets of prime divisors of integers N and M are exactly the same.

For example, given:
    N = 15 and M = 75, the prime divisors are the same: {3, 5};
    N = 10 and M = 30, the prime divisors aren't the same: {2, 5} is not equal to {2, 3, 5};
    N = 9 and M = 5, the prime divisors aren't the same: {3} is not equal to {5}.

Write a function:

function solution(A, B);

that, given two non-empty arrays A and B of Z integers, returns the number of positions K for which the prime divisors of A[K] and B[K] are exactly the same.

For example, given:
    A[0] = 15   B[0] = 75
    A[1] = 10   B[1] = 30
    A[2] = 3    B[2] = 5

the function should return 1, because only one pair (15, 75) has the same set of prime divisors.
*/

// Euclidean Algorithm by division to find GCD
function findGCD(A, B) {
  if (A % B === 0) return B;
  else return findGCD(B, A % B);
}

/* HINT:
any number can be written into prime factors
e.g.
10 = 2 * 5
112 = 2 * 2 * 2 * 2 * 7 = 2 ^ 4 * 7
so the only difference is the exponent of the prime factors

the GCD of two numbers is also made of the common prime factors
e.g.
10 = 2 * 5
112 = 2 * 2 * 2 * 2 * 7 = 2 ^ 4 * 7
2 is the common prime factor, so GCD = 2

now then,
consider two numbers:
M = 2 * 3 ^ 2 * 5 ^ 3
N = 2 * 3 ^ 3 * 5
so GCD(M, N) = 2 * 3 ^ 2 * 5

we wanna find the prime factor that is NOT COMMON to both numbers
cus then, we'll know that they don't have the same prime divisors

the way we do this is as follows:

1.
divide M by GCD of M and N
divide the result by the GCD of the result and N
keep doing this

if you reach 1 then it means that all the prime factors of M
are present in GCD

e.g.
taking the given example,
M'   = M   / GCD(M, N)   = 5 ^ 2
M''  = M'  / GCD(M', N)  = 5
M''' = M'' / GCD(M'', N) = 1

2.
do the same for the other number i.e.
divide N by GCD of N and M
divide the result by the GCD of the result and M
keep doing this

if you reach 1 then it means that all the prime factors of N
are present in GCD

e.g.
taking the given example,
N'   = N   / GCD(N, M)   = 3
N''  = N'  / GCD(N', M)  = 1

if you reach 1 then it means that all the prime factors of N
are present in GCD

thus, M and N have the same prime divisors

but taking another example, say we have
M = 2 * 3 ^ 2 * 5 ^ 3
N = 2 * 3 ^ 3 * 5 * 7

here
N'   = N   / GCD(N, M)   = 3 * 7
N''  = N'  / GCD(N', M)  = 7
N''' = N'' / GCD(N'', M) = 7

so we didn't reach 1
and this means M and N do not have the same prime factors 
*/

function commonPrimeDivisors(A, B) {
  let res = 0;

  let M, N;
  let GCD;
  let condition1;
  let condition2;

  for (let i = 0; i < A.length; i++) {
    M = A[i], N = B[i];
    GCD = findGCD(M, N);
    condition1 = false;

    // edge case: if the two no.s are same
    if (M === N) {
      res += 1;
      continue;
    }

    for (let j = GCD; j !== 1; j = findGCD(M, N)) {
      M = M / j;

      if (M === 1) {
        condition1 = true;
        break;
      }
    }


    M = A[i], N = B[i];
    GCD = findGCD(M, N);
    condition2 = false;

    for (let j = GCD; j !== 1; j = findGCD(M, N)) {
      N = N / j;

      if (N === 1) {
        condition2 = true;
        break;
      }
    }

    if (condition1 && condition2) res += 1;
  }

  return res;
}

commonPrimeDivisors([15, 10, 9], [75, 30, 5]);
commonPrimeDivisors([1], [1]);