// difficulty: #easy
// stars: #one
// link: https://leetcode.com/problems/valid-anagram/
// topic: #array #hashing

var isAnagram = function (s, t) {
  let map1 = {}, map2 = {};

  if (s.length !== t.length) return false;

  for (let i = 0; i < s.length; i++) {
    map1[s[i]] = map1[s[i]] ? map1[s[i]] + 1 : 1;
  }

  for (let i = 0; i < s.length; i++) {
    map2[t[i]] = map2[t[i]] ? map2[t[i]] + 1 : 1;
  }

  let keys = Object.keys(map1);

  for (let i = 0; i < keys.length; i++) {
    if (map1[keys[i]] !== map2[keys[i]]) return false;
  }

  return true;
};