import _ from 'lodash'

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

  // Parse te MPNs into an intermediate format that's useful for figuring
  // out how many of each on there is and getting an accurate tally of all
  // of the RDs associated with each MPN.
  let inter = {};
  let mpns = input.map(parseMPN);
  mpns.forEach((obj) => {
    let man = obj.man;
    let mpn = obj.mpn;
    let rds = obj.rds;

    if (!inter[man]) {
      inter[man] = {};
    }

    if (!inter[man][mpn]) {
      inter[man][mpn] = {
        count: 1,
        rds: rds
      };
    }
    else {
      inter[man][mpn].count += 1;
      inter[man][mpn].rds = _.union(inter[man][mpn].rds, rds);
    }
  })

  // Now we translate the intermediate format into the final format.
  let final = []
  _.keys(inter).forEach((man) => {
    _.keys(inter[man]).forEach((mpn) => {
      let obj = inter[man][mpn];
      final.push({
        MPN: mpn,
        Manufacturer: man,
        ReferenceDesignators: obj.rds,
        NumOccurrences: obj.count
      });
    })
  })

  // Lastly we need to sort the final JSON objects first by NumOccurances and
  // then by number of ReferenceDesignators.
  final = _.sortBy(final, (obj) => {
    // This is a quick and dirty way to sort on both criteria.
    return (obj.NumOccurrences * -1000) - obj.ReferenceDesignators.length;
  })

  // Now we return the first N elements of the array.
  return _.take(final, n);
}

export default bomToJSON
