import { state, loadRecipe, loadSearchResults, getSearchResultsPage, updateServings, addBookmark, deleteBookmark } from './model.js';
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

    resultsView.update(getSearchResultsPage());

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

const controlServings = (newServings) => {
  updateServings(newServings);

  recipeView.update(state.recipe);
}

const controlPagination = (goToPage) => {
  resultsView.render(getSearchResultsPage(goToPage));
  paginationView.render(state.search);
}

const controlAddBookmark = () => {
  state.recipe.bookmarked
    ? deleteBookmark(state.recipe.id)
    : addBookmark(state.recipe);

  recipeView.update(state.recipe);
}

recipeView.addHandlerRender(controlRecipes);
recipeView.addHandlerUpdateServings(controlServings);
recipeView.addHandlerAddBookmark(controlAddBookmark);
searchView.addHandlerSearch(controlSearchResults);
paginationView.addHandlerClick(controlPagination);
// controlServings();