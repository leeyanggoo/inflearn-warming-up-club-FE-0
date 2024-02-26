import { BASE_URL, TARGET_CARTEGORY } from './api.js';
import { setFoodList } from './foodslist.js';

async function getCategories() {
  const response = await fetch(`${BASE_URL}/categories.php`);

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  const json = await response.json();
  const { categories } = json;

  const filteredCatergories = categories.filter(({ strCategory }) =>
    TARGET_CARTEGORY.includes(strCategory)
  );

  return filteredCatergories;
}

function getNavigationElement(id, src, str) {
  const element = document.createElement('div');
  element.classList.add(`food-navigation-item`);
  element.innerHTML = `
    <button id=${str}>
      <figure>
        <img src="${src}" />
        <figcaption>
          ${str}
        </figcaption>
      </figure>
    </button>
  `;
  return element;
}

/**
 *
 * @param {HTMLElement} container
 */
export async function setCategories(container) {
  const foodNavigation =
    container || document.getElementById('food-navigation');

  const categories = await getCategories();

  categories.map((category) => {
    const {
      idCategory,
      strCategory,
      strCategoryDescription,
      strCategoryThumb,
    } = category;

    const navigationElement = getNavigationElement(
      idCategory,
      strCategoryThumb,
      strCategory
    );
    foodNavigation.appendChild(navigationElement);
  });

  // // Not Event Delegation
  // foodNavigation.querySelectorAll('button').forEach((button) => {
  //   button.addEventListener('click', async () => {
  //     const targetId = button.id;
  //     await setFoodList(targetId);
  //   });
  // });

  // Event Delegation
  foodNavigation.addEventListener('click', async (event) => {
    const targetElement = event.target;

    // closest() 메서드는 주어진 CSS 선택자와 일치하는 요소를 찾을 때까지,
    // 자기 자신을 포함해 위쪽(부모 방향, 문서 루트까지)으로 문서 트리를 순회합니다.
    const targetDiv = targetElement.closest('.food-navigation-item');

    if (!targetDiv) {
      return;
    }

    const targetButton = targetDiv.querySelector('button');
    const targetId = targetButton.id;

    await setFoodList(targetId);
  });
}
