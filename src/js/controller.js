import { state, loadRecipe } from './model.js';
import recipeView from './views/recipeView.js';

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    await loadRecipe(id);

    recipeView.render(state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
}

(init = () => {
  recipeView.addHandlerRender(controlRecipes);
})()