// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from 'jest-extended';
expect.extend(matchers);
import { equalsArray } from '../utils';
import { arrayIncludes } from '../utils';
import { removeItemFromArray } from '../utils';
import { RGBAToHexA } from '../utils';

describe('Test error the equalsArray utility function that check if two arrays are equals.', function () {
  it('Should pass', function () {
    // Check if rendom cell coords are outside the grid.
    const firstTestArray = [1, 0];

    expect(equalsArray(firstTestArray, [1, 1])).toEqual(false);
    // Create a loop that verifies the randomly generated cells coordinants
  });
});

describe('Test the equalsArray utility function that check if two arrays are equals.', function () {
  it('Should pass', function () {
    const firstTestArray = [1, 0];

    expect(equalsArray(firstTestArray, [1, 0])).toEqual(true);
  });
});

describe('Test error if array is include in a other array.', function () {
  it('Should pass', function () {
    const firstTestArray = [1, 0, 0, 1, 0];
    const secondTestArray = [1, 0, 0, 0, 0];

    expect(arrayIncludes(firstTestArray, secondTestArray)).toEqual(false);
  });
});

describe('Test if array is include in a other array.', function () {
  it('Should pass', function () {
    const firstTestArray = [1, 0, 1, 0, 1];
    const secondTestArray = [1, 0, 1, 0, 1];

    expect(arrayIncludes(firstTestArray, secondTestArray)).toEqual(true);
  });
});

describe('Test (large array) if array is include in a other array.', function () {
  it('Should pass', function () {
    const firstTestArray = [
      1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1,
      1, 0, 1, 0, 1,
    ];
    const secondTestArray = [
      1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1,
      1, 0, 1, 0, 1,
    ];

    expect(arrayIncludes(firstTestArray, secondTestArray)).toEqual(true);
  });
});

describe('Test error to remove an item from array.', function () {
  it('Should pass', function () {
    const testArray = [1, 0, 0];
    const removeItem = [1, 1, 0];

    expect(removeItemFromArray(testArray, removeItem)).toEqual([1, 0, 0]);
  });
});

describe('Test to remove an item from array.', function () {
  it('Should pass', function () {
    const testArray = [1, 1, 0];
    const removeItem = [1, 1, 0];

    expect(removeItemFromArray(testArray, removeItem)).toEqual([1, 1, 0]);
  });
});

describe('Test convert RGBA to Hex.', function () {
  it('Should pass', function () {
    const r = 255;
    const g = 0;
    const b = 0;

    expect(RGBAToHexA(r, g, b)).toEqual('ff0000');
  });
});

describe('Test convert RGBA to Hex.', function () {
  it('Should pass', function () {
    const r = 156;
    const g = 187;
    const b = 60;

    expect(RGBAToHexA(r, g, b)).toEqual('9cbb3c');
  });
});
