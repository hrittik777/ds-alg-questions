/*
#easy
#three

Cover "Manhattan skyline" using the minimum number of rectangles.

You are going to build a stone wall. The wall should be straight and N meters long, and its thickness should be constant; however, it should have different heights in different places. The height of the wall is specified by an array H of N positive integers. H[I] is the height of the wall from I to I+1 meters to the right of its left end. In particular, H[0] is the height of the wall's left end and H[N−1] is the height of the wall's right end.

The wall should be built of cuboid stone blocks (that is, all sides of such blocks are rectangular). Your task is to compute the minimum number of blocks needed to build the wall.

Write a function:

function solution(H);

that, given an array H of N positive integers specifying the height of the wall, returns the minimum number of blocks needed to build it.

For example, given array H containing N = 9 integers:
  H[0] = 8    H[1] = 8    H[2] = 5
  H[3] = 7    H[4] = 9    H[5] = 8
  H[6] = 7    H[7] = 4    H[8] = 8

the function should return 7. The figure shows one possible arrangement of seven blocks.
Figure: https://app.codility.com/programmers/lessons/7-stacks_and_queues/stone_wall/
*/
function stoneWall(H) {
  let count = 0;
  let stack = [];
  let last = H[0];

  for (let i = 1; i < H.length; i++) {
    // when height increases: increment counter
    if (H[i] > last) {
      count += 1;
      stack.push(H[i]);
      last = H[i];
    }
    // when height decreases: increment counter only if this level is new since the last minimum
    else if (H[i] < last) {
      // removing all higher levels from the stack
      for (let j = stack.length - 1; j >= 0; j--) {
        if (stack[j] > H[i]) {
          stack.pop();
        }
      }

      // incrementing counter only if last level in strack is different from current level
      if (stack.length === 0 || stack[stack.length - 1] !== H[i]) {
        count += 1;
        stack.push(H[i])
      }

      last = H[i];
    }
  }

  return count;
}