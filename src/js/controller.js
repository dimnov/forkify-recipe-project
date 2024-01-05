import { state, loadRecipe } from './model.js';
import recipeView from './views/recipeView.js';



// https://forkify-api.herokuapp.com/v2

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    await loadRecipe(id);

    recipeView.render(state.recipe);
  } catch (error) {
    alert(error);
  }
}

window.addEventListener('hashchange', controlRecipes);
window.addEventListener('load', controlRecipes);