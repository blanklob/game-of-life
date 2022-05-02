// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from 'jest-extended';
expect.extend(matchers);

describe('Test the creation of the first cells', function () {
  it('Should pass', function () {
    const dimensions: [number, number] = [1000, 1000];
    // Check if rendom cell coords are outside the grid.

    expect(dimensions.length).toEqual(100);
    // Create a loop that verifies the randomly generated cells coordinants
  });
});
