import { state, loadRecipe, loadSearchResults, getSearchResultsPage, updateServings, addBookmark, deleteBookmark, uploadRecipe } from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

const controlRecipes = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();

    resultsView.update(getSearchResultsPage());

    bookmarksView.update(state.bookmarks);

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

  bookmarksView.render(state.bookmarks);
}

const controlBookmarks = () => {
  bookmarksView.render(state.bookmarks);
}

const controlAddRecipe = async (newRecipe) => {
  try {
    addRecipeView.renderSpinner();

    await uploadRecipe(newRecipe);

    recipeView.render(state.recipe);

    addRecipeView.renderMessage();

    setTimeout(() => {
      addRecipeView.toggleWindow()
    }, MODAL_CLOSE_SEC * 1000);
  } catch (error) {
    addRecipeView.renderError(error.message);
  }
}

bookmarksView.addHandlerRender(controlBookmarks);
recipeView.addHandlerRender(controlRecipes);
recipeView.addHandlerUpdateServings(controlServings);
recipeView.addHandlerAddBookmark(controlAddBookmark);
searchView.addHandlerSearch(controlSearchResults);
paginationView.addHandlerClick(controlPagination);
addRecipeView.addHandlerUpload(controlAddRecipe);