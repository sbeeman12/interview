function reverseString(s) {
  return s.split('').reverse().join('');
}

function longestPalindrome(s) {
  let letters = {}
  s.split('').forEach((letter) => {
    if (!letters[letter]) {
      letters[letter] = 1;
    } else {
      letters[letter] += 1;
    }
  });

  let beg = ''
  let mid = ''
  Object.keys(letters).forEach((letter) => {
    freq = letters[letter]
    if (freq % 2 != 0) {
      mid = letter;
      freq = freq - 1
    }
    for (let i = 0; i < freq/2; i++) {
      beg += letter;
    }
  })
  let end = reverseString(beg);
  return beg + mid + end;
}

example = 'aabbccd'
example = longestPalindrome(example)
console.log(example)
