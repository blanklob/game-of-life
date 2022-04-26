// @ts-ignore see https://github.com/jest-community/jest-extended#setup
import * as matchers from 'jest-extended';
expect.extend(matchers);
import { createLife } from './index';

describe('Test the creation of the first cells', function () {
  it('Should pass', function () {
    const dimensions: [number, number] = [1000, 1000];
    // Check if rendom cell coords are outside the grid.
    const livingCellsGeneration = createLife(dimensions, 100);

    expect(livingCellsGeneration.length).toEqual(100);
    // Create a loop that verifies the randomly generated cells coordinants
  });
});
