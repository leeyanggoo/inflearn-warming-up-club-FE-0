import { BASE_URL, TARGET_CARTEGORY } from './api.js';

export async function getFoodList(strCategory) {
  const response = await fetch(`${BASE_URL}/filter.php?c=${strCategory}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${strCategory} food list`);
  }

  const data = await response.json();
  const { meals } = data;
  const sliceMeals = meals.slice(0, 6);

  return sliceMeals;
}

function getFoodElement(id, str, src, ins) {
  const element = document.createElement('div');
  element.classList.add(`food-list-item`);
  element.innerHTML = `
      <figure>
        <img src="${src}" />
      </figure>
      <div class="food-list-item-desc">
        <p>${str}</P>
        <hr />
        <div>${ins}</div>
      </div>
  `;
  return element;
}

export async function setFoodList(strCategory) {
  const foodList = await getFoodList(strCategory);

  const foodListElement = document.getElementById('food-list');
  const foodListItem = document.querySelectorAll('.food-list-item');
  // foodListItem.forEach((item) => item.remove());
  // foodListElement.innerHTML = '';

  // replaceChildren() provides a very convenient mechanism for emptying a node of all its children.
  // https://stackoverflow.com/questions/13798796/what-is-the-best-way-to-empty-a-node-in-javascript
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/replaceChildren#emptying_a_node
  foodListElement.replaceChildren();

  foodList.map(async (food) => {
    const { idMeal, strMeal, strMealThumb } = food;
    const response = await fetch(`${BASE_URL}/lookup.php?i=${idMeal}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${strMeal} lookup`);
    }

    const data = await response.json();
    const { strInstructions } = data.meals[0];
    // const formattedInstructions = strInstructions.replace(/\r?\n/g, '<br>');

    const foodElement = getFoodElement(
      idMeal,
      strMeal,
      strMealThumb,
      strInstructions
    );
    foodListElement.appendChild(foodElement);
  });
}
