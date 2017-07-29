import { expect } from 'chai'
import bomToJSON from '../bomToJSON.js'

const SAMPLE_INPUT = `2
Wintermute Systems -- CASE-19201:A2,A3
AXXX-1000:Panasonic:D1,D8,D9
Z1,Z3;40001;Keystone
Z1,Z3,Z8;40001;Keystone`;

const SAMPLE_OUTPUT = JSON.stringify([
{
    "MPN": "40001",
    "Manufacturer": "Keystone",
    "ReferenceDesignators": [
        "Z1",
        "Z3",
        "Z8",
    ],
    "NumOccurrences": 2,
  },
  {
    "MPN": "AXXX-1000",
    "Manufacturer": "Panasonic",
    "ReferenceDesignators": [
        "D1",
        "D8",
        "D9",
    ],
    "NumOccurrences": 1,
  }
]);

describe('bomToJSON', () => {
  it('correctly translates the sample input into the sample output', () => {
    let output = JSON.stringify(bomToJSON(SAMPLE_INPUT));
    expect(output).to.equal(SAMPLE_OUTPUT);
  })
})
