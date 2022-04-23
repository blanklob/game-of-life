// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from 'jest-extended';
expect.extend(matchers);
import { equalsArray } from '../utils';

describe('Test the equalsArray utility function that check if two arrays are equals.', function () {
  it('Should pass', function () {
    // Check if rendom cell coords are outside the grid.
    const firstTestArray = [1, 0];

    expect(equalsArray(firstTestArray, [1, 0])).toEqual(true);
    // Create a loop that verifies the randomly generated cells coordinants
  });
});
