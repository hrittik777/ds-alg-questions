// difficulty: #easy
// stars: #two
// link: https://leetcode.com/problems/two-sum/
// topic: #array #hashing

// slower solution
let twoSum1 = function (nums, target) {
  let numsIdx = nums.map((el, idx) => ({ el, idx }));

  let sorted = numsIdx.sort((a, b) => a.el - b.el);

  let first = 0, last = sorted.length - 1;
  let sum;

  while (sum !== target) {
    sum = sorted[first].el + sorted[last].el;

    if (sum > target) {
      last -= 1;
    } else if (sum < target) {
      first += 1;
    } else {
      break;
    }
  }

  return [sorted[first].idx, sorted[last].idx];
};

// faster solution
var twoSum2 = function (nums, target) {
  let map = new Map();

  for (let index = 0; index < nums.length; index++) {
    let num = nums[index];
    let diff = (target - num);

    if (map.has(diff)) {
      return [index, map.get(diff)];
    } else {
      map.set(num, index);
    }
  }

  return [-1, -1];
};