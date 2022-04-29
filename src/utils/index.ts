export function equalsArray(
  firstArray: Array<number>,
  secondArray: Array<number>,
): boolean {
  /**
   * @description Check whether an array is equal to another array.
   *
   * @param {array} firstarray - The first array.
   * @param {array} secondarray - The second array.
   * @return {boolean} - true if the two arrays are equals.
   */
  return (
    firstArray.length === secondArray.length &&
    firstArray.every((value, index) => value === secondArray[index])
  );
}

export function arrayIncludes(
  parentArray: Array<any>,
  childArray: Array<number>,
): boolean {
  /**
   * @description Checks whether an array includes another child array among its entries,
   * returning true or false as appropriate.
   *
   * @param {array} parentarray - The parent array.
   * @param {array} childarray - The child array.
   * @return {boolean} - true if the parent array includes the child array.
   */
  return (
    // parentArray.find(childArray => childArray.length < parentArray.length);
    JSON.stringify(parentArray) == JSON.stringify(childArray)
    // parentArray.some((item) => equalsArray(item, childArray))
  );
}

export function removeItemFromArray(
  array: Array<any>,
  value: Array<number>,
): Array<any> {
  /**
   * @description Removes an item from an array using a value.
   *
   * @param {array} array - The array.
   * @param {array} value - The value to be removed.
   * @return {array} - The filtered array.
   */
  return array.filter((item) => !equalsArray(item, value));
}

export function removeArrayDuplicates(array: Array<any>) {
  /**
   * @description Remove duplicate elements from an array.
   *
   * @param {array} array - The array.
   * @return {array} - The filtered array.
   */
  return array.filter((item, index) => {
    const firstItemPosition = array.indexOf(item);
    return firstItemPosition === index;
  });
}

export const isTouchDevice = () => {
  /**
   * @description Check if the device is a touch device.
   *
   * @return {boolean} - True or false
   */
  return (
    'ontouchstart' in window || // works on most browsers
    'onmsgesturechange' in window // works on ie10
  );
};

export const getRandomInt = (max: number) => {
  /**
   * @description Return a random positive integer.
   *
   * @param {number} - max - the maximum number to return
   * @return {number} - The random number
   */
  return Math.floor(Math.random() * max);
};

export const generateRandomColors = (threshold: number) => {
  /**
   * @description Return a random color combination.
   *
   * @param {number} threshold - The diffrence between the background and foreground colors.
   * @return {object} - An object containing the randomly generated color combination.
   */
  const randomColorComibination = (max: number) => {
    return [getRandomInt(max), getRandomInt(max), getRandomInt(max)];
  };

  if (threshold - 255 >= 0 || 255 - threshold <= 10) threshold = 240;

  let foreground = randomColorComibination(255);
  let background = randomColorComibination(255 - threshold);

  while (
    Math.abs(foreground[0] - background[0]) < threshold ||
    Math.abs(foreground[1] - background[1]) < threshold ||
    Math.abs(foreground[2] - background[2]) < threshold
  ) {
    foreground = randomColorComibination(255);
    background = randomColorComibination(255 - threshold);
  }

  return {
    foreground,
    background,
  };
};
