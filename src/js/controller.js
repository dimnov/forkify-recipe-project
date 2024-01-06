import { state, loadRecipe, loadSearchResults } from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

if (module.hot) {
  module.hot.accept();
}

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
    resultsView.renderSpinner();

    const query = searchView.getQuery();
    if (!query) return;

    await loadSearchResults(query);

    resultsView.render(state.search.results)
  } catch (error) {
    throw error;
  }
}

recipeView.addHandlerRender(controlRecipes);
searchView.addHandlerSearch(controlSearchResults);