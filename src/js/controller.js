import { state, loadRecipe, loadSearchResults, getSearchResultsPage } from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

// if (module.hot) {
//   module.hot.accept();
// }

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

    resultsView.renderSpinner();

    await loadSearchResults(query);

    resultsView.render(getSearchResultsPage());
    paginationView.render(state.search);
  } catch (error) {
    throw error;
  }
}

const controlPagination = (goToPage) => {
  resultsView.render(getSearchResultsPage(goToPage));
  paginationView.render(state.search);
}

recipeView.addHandlerRender(controlRecipes);
searchView.addHandlerSearch(controlSearchResults);
paginationView.addHandlerClick(controlPagination);