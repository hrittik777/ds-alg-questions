/*
#medium
#very_important

Find the minimal nucleotide from a range of sequence DNA.

A DNA sequence can be represented as a string consisting of the letters A, C, G and T, which correspond to the types of successive nucleotides in the sequence. Each nucleotide has an impact factor, which is an integer. Nucleotides of types A, C, G and T have impact factors of 1, 2, 3 and 4, respectively. You are going to answer several queries of the form: What is the minimal impact factor of nucleotides contained in a particular part of the given DNA sequence?

The DNA sequence is given as a non-empty string S = S[0]S[1]...S[N-1] consisting of N characters. There are M queries, which are given in non-empty arrays P and Q, each consisting of M integers. The K-th query (0 ≤ K < M) requires you to find the minimal impact factor of nucleotides contained in the DNA sequence between positions P[K] and Q[K] (inclusive).

For example, consider string S = CAGCCTA and arrays P, Q such that:
    P[0] = 2    Q[0] = 4
    P[1] = 5    Q[1] = 5
    P[2] = 0    Q[2] = 6

The answers to these M = 3 queries are as follows:

The part of the DNA between positions 2 and 4 contains nucleotides G and C (twice), whose impact factors are 3 and 2 respectively, so the answer is 2.
The part between positions 5 and 5 contains a single nucleotide T, whose impact factor is 4, so the answer is 4.
The part between positions 0 and 6 (the whole string) contains all nucleotides, in particular nucleotide A whose impact factor is 1, so the answer is 1.

Write a function:

that, given a non-empty string S consisting of N characters and two non-empty arrays P and Q consisting of M integers, returns an array consisting of M integers specifying the consecutive answers to all queries.

Result array should be returned as an array of integers.

For example, given the string S = CAGCCTA and arrays P, Q such that:
    P[0] = 2    Q[0] = 4
    P[1] = 5    Q[1] = 5
    P[2] = 0    Q[2] = 6

the function should return the values [2, 4, 1], as explained above.
*/

/* INEFFICIENT SOLUTION: O(N * M) */
function genomicRangeQueryIneff(S, P, Q) {
  let resultArr = [];
  let scores = { A: 1, C: 2, G: 3, T: 4 };

  let sArr = S.split('');
  sArr = sArr.map(item => scores[item])

  for (let i = 0; i < P.length; i++) {
    let start = P[i], end = Q[i];
    let occuring = sArr.slice(start, end + 1);

    let minScore = Math.min(...occuring);
    resultArr.push(minScore);
  }

  return resultArr;
}

/* EFFICIENT SOLUTION: O(N) */
function genomicRangeQueryEff(S, P, Q) {
  let resultArr = [];
  let scores = { A: 1, C: 2, G: 3, T: 4 };

  // initializing array of zeroes for each neucleotide, of the same length as the string
  let occurences = {
    A: new Array(S.length).fill(0),
    C: new Array(S.length).fill(0),
    G: new Array(S.length).fill(0),
    T: new Array(S.length).fill(0)
  };

  // replacing zero with one where the neucleotide occurs
  for (let i = 0; i < S.length; i += 1) {
    let val = S[i];
    occurences[val][i] = 1;
  }

  // summing up values of preceeding elements, for each neucleotide's array
  let a = c = g = t = 0;
  for (let i = 0; i < S.length; i += 1) {
    let val = S[i];

    if (val === 'A') a += 1;
    else if (val === 'C') c += 1;
    else if (val === 'G') g += 1;
    else if (val === 'T') t += 1;

    occurences['A'][i] = a;
    occurences['C'][i] = c;
    occurences['G'][i] = g;
    occurences['T'][i] = t;
  }

  // comparing positions in each neucleotide's array to check for differences i.e. occurences
  for (let i = 0; i < P.length; i += 1) {
    let posP = P[i];
    let posQ = Q[i];

    // edge case: if the position in P and Q are same, then that neucleotide is the only occurance
    if (posP === posQ) {
      if (S[posP] === 'A')
        resultArr.push(scores['A']);
      else if (S[posP] === 'C')
        resultArr.push(scores['C']);
      else if (S[posP] === 'G')
        resultArr.push(scores['G']);
      else if (S[posP] === 'T')
        resultArr.push(scores['T']);
    } else {
      // edge case: this || S[posQ] === ... is to handle an edge case when the neucleotide occurs once at the first letter and never again
      if (occurences['A'][posQ] > occurences['A'][posP] || S[posP] === 'A')
        resultArr.push(scores['A']);
      else if (occurences['C'][posQ] > occurences['C'][posP] || S[posP] === 'C')
        resultArr.push(scores['C']);
      else if (occurences['G'][posQ] > occurences['G'][posP] || S[posP] === 'G')
        resultArr.push(scores['G']);
      else if (occurences['T'][posQ] > occurences['T'][posP] || S[posP] === 'T')
        resultArr.push(scores['T']);
    }
  }

  return resultArr;
}

genomicRangeQueryEff('CAGCCTA', [2, 5, 0], [4, 5, 6]);