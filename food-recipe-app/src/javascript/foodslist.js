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
  foodListItem.forEach((item) => item.remove());
  // foodListElement.innerHTML = '';

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
