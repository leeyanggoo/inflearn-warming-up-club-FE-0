import { BASE_URL, TARGET_CARTEGORY } from './api.js';
import { setCategories } from './categories.js';
import { setFoodList } from './foodslist.js';

async function main() {
  try {
    await setCategories(document.getElementById('food-navigation'));
    await setFoodList(TARGET_CARTEGORY[0]);
  } catch (error) {
    setErrorElement(error);
  }
}

function setErrorElement(error) {
  console.error('An error occurred::', error);

  const body = document.querySelector('body');
  body.style.display = 'flex';
  body.style.flexDirection = 'column';
  body.style.alignItems = 'center';
  body.style.justifyContent = 'center';
  body.style.height = '100vh';
  body.style.overflow = 'hidden';

  const header = document.querySelector('header');
  const main = document.querySelector('main');

  const errorHeader = `<h1>🙏 Sorry... 😢</h1>`;
  header.innerHTML = errorHeader;

  const errorMain = `
    <p style="font-size: large; text-align: center;">I forgot and left the recipe behind... 😱</p>
    <p style="font-size: large; text-align: center;">Please check your browser console</p>
  `;
  main.innerHTML = errorMain;
}

main();
