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
      // JSON.stringify(parentArray) == JSON.stringify(childArray)
      parentArray.some((item) => equalsArray(item, childArray))
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
  