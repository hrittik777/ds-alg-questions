/*
#medium
#three

You have to climb up a ladder. The ladder has exactly N rungs, numbered from 1 to N. With each step, you can ascend by one or two rungs. More precisely:

with your first step you can stand on rung 1 or 2,
if you are on rung K, you can move to rungs K + 1 or K + 2,
finally you have to stand on rung N.
Your task is to count the number of different ways of climbing to the top of the ladder.

For example, given N = 4, you have five different ways of climbing, ascending by:
    1, 1, 1 and 1 rung,
    1, 1 and 2 rungs,
    1, 2 and 1 rung,
    2, 1 and 1 rungs, and
    2 and 2 rungs.

Given N = 5, you have eight different ways of climbing, ascending by:
    1, 1, 1, 1 and 1 rung,
    1, 1, 1 and 2 rungs,
    1, 1, 2 and 1 rung,
    1, 2, 1 and 1 rung,
    1, 2 and 2 rungs,
    2, 1, 1 and 1 rungs,
    2, 1 and 2 rungs, and
    2, 2 and 1 rung.

The number of different ways can be very large, so it is sufficient to return the result modulo 2P, for a given integer P.

Write a function:

function solution(A, B);

that, given two non-empty arrays A and B of L integers, returns an array consisting of L integers specifying the consecutive answers; position I should contain the number of different ways of climbing the ladder with A[I] rungs modulo 2B[I].

For example, given L = 5 and:
    A[0] = 4   B[0] = 3
    A[1] = 4   B[1] = 2
    A[2] = 5   B[2] = 4
    A[3] = 5   B[3] = 3
    A[4] = 1   B[4] = 1

the function should return the sequence [5, 1, 8, 0, 1], as explained above.
*/

/* CORRECT BUT INEFFICIENT SOLUTION */
/* using algorithm to find all possible combinations */
/* https://github.com/hrittik777/wikis/blob/main/javascript/utils.md#find-all-possible-combinations-of-a-given-array-of-numbers-summing-up-to-a-given-target */
function ladder(A, B) {
  let final = [];
  let items = [1, 2];

  for (let idx = 0; idx < A.length; idx++) {
    let result = A[idx];
    let res = [];

    (function combination(numbers, target, partial = []) {
      let s = partial.length ? partial.reduce((i, a) => i + a) : 0;

      if (s === target) res.push(partial);
      if (s >= target) return;

      for (let i = 0; i < numbers.length; i++) {
        let n = numbers[i];

        // if we don't wanna allow repetition of numbers
        // let remaining = numbers.slice(i + 1); 

        // if we wanna allow repetition of numbers
        let remaining = numbers;

        combination(remaining, target, partial.concat([n]));
      }
    })(items, result);

    final.push(res.length % Math.pow(2, B[idx]));
  }

  return final;
}

ladder([4, 4, 5, 5, 1], [3, 2, 4, 3, 1]);

/* EFFICIENT SOLUTION */