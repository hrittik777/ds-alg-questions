// difficulty: #easy
// stars: #one
// link: https://leetcode.com/problems/contains-duplicate/
// topic: #array #hashing

var containsDuplicate = function (nums) {
  let map = {};

  for (let i = 0; i < nums.length; i++) {
    if (map[nums[i]]) {
      return true;
    }

    map[nums[i]] = "found";
  }

  return false;
};