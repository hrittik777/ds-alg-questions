/*
#easy
#one

Determine whether a given string of parentheses (multiple types) is properly nested.

A string S consisting of N characters is considered to be properly nested if any of the following conditions is true:
S is empty;
S has the form "(U)" or "[U]" or "{U}" where U is a properly nested string;
S has the form "VW" where V and W are properly nested strings.

For example, the string "{[()()]}" is properly nested but "([)()]" is not.

Write a function:

function solution(S);

that, given a string S consisting of N characters, returns 1 if S is properly nested and 0 otherwise.

For example, given S = "{[()()]}", the function should return 1 and given S = "([)()]", the function should return 0, as explained above.
*/
function brackets(S) {
  let brackets = {
    '[': 3, ']': -3,
    '{': 2, '}': -2,
    '(': 1, ')': -1
  };
  let stack = [];

  // edge case: empty string
  if (S.length === 0) return 1;

  for (let i = 0; i < S.length; i++) {
    if (S[i] === '[' || S[i] === ']' ||
      S[i] === '{' || S[i] === '}' ||
      S[i] === '(' || S[i] === ')') {

      // edge case: starting bracket is a closing brace or there is an extra closing brace at the end
      if (stack.lengh === 0 && brackets[S[i]] < 0) return 0;

      if (brackets[S[i]] > 0) {
        stack.push(brackets[S[i]]);
      } else {
        if (stack[stack.length - 1] + brackets[S[i]] !== 0) return 0;
        else stack.pop();
      }
    }
  }

  if (stack.length) return 0;
  else return 1;
}


brackets("{{{{"); 