export const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
export const TARGET_CARTEGORY = ['Beef', 'Chicken', 'Pork', 'Seafood', 'Side'];

/**
 * @param {EventTarget} startElement
 * @param {string} selector
 * @returns
 */
export function findElement(startElement, selector) {
  let currentElement = startElement;
  while (currentElement) {
    if (currentElement.matches(selector)) {
      return currentElement;
    }
    currentElement = currentElement.parentElement;
  }
  return null;
}
