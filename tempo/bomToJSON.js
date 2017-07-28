function parseFormatSemi(str) {
  str = str.split(';');
  return {
    man: str[2],
    mpn: str[1],
    rds: str[0].split(',')
  }
}

function parseFormatDashes(str) {
  str = str.split(' -- ');
  let man = str[0];
  str = str[1].split(':');
  return {
    man: man,
    mpn: str[0],
    rds: str[1].split(',')
  };
}

function parseFormatColons(str) {
  str = str.split(':');
  return {
    man: str[1],
    mpn: str[0],
    rds: str[2].split(',')
  };
}

function parseMPN(str) {
  if (str.indexOf(';') > -1) {
    return parseFormatSemi(str);
  }
  else if (str.indexOf('--') > -1) {
    return parseFormatDashes(str);
  }
  else {
    return parseFormatColons(str);
  }
}

function bomToJSON(input) {
  input = input.split('\n');

  // The first line will always be an integer telling us how many MPNs to
  // return later on.
  let n = parseInt(input.shift());

  let inter = {};
  let mpns = input.map(parseMPN);

  return mpns;
}

export default bomToJSON
