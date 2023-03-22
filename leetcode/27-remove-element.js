// difficulty: #easy
// stars: #two
// link: https://leetcode.com/problems/remove-element/
// topic: #array

var removeElement = function (nums, val) {
  let i = 0;

  while (i < nums.length) {
    while (nums[i] === val) {
      nums.splice(i, 1);
    }

    i++;
  }
};