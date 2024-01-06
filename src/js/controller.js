import { state, loadRecipe, loadSearchResults } from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

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

const controlSearchResults = async () => {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    await loadSearchResults(query);
  } catch (error) {
    throw error;
  }
}


// (init => {
recipeView.addHandlerRender(controlRecipes);
searchView.addHandlerSearch(controlSearchResults);
// })()