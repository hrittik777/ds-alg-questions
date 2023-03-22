// difficulty: #easy
// stars: #two
// link: https://leetcode.com/problems/remove-duplicates-from-sorted-array/
// topic: #array

var removeDuplicates = function (nums) {
  let i = 0;

  while (i < nums.length) {
    let j = i;

    while (nums[j + 1] === nums[i]) {
      j++;
    }

    nums.splice(i + 1, j - i);
    i++;
  }
};