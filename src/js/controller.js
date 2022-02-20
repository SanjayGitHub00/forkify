// import { icons } from '../img/icons.svg';
// console.log(icons);
// let icons = import('../img/icons.svg');
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import { MODEL_CLOSE_SEC } from './config.js';
import PaginationView from './views/paginationView.js';
import recipeView from './views/recipeView.js';
import ResultView from './views/resultView.js';
import searchView from './views/searchView.js';
import bookmarkView from './views/bookmarkView.js';
import AddRecipeView from './views/addRecipeView.js';
if (module.hot) {
  module.hot.accept();
}

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    //Update Result Views
    ResultView.update(model.getSearchResultsPage());
    bookmarkView.update(model.state.bookmarks);
    // 5ed6604591c37cdc054bc886
    // Loading Recipes
    await model.loadRecipe(id);

    const { recipe } = model.state;

    // Render Recipes

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};
const controlSearchResults = async function () {
  try {
    ResultView.renderSpinner();

    // Get search query
    const query = searchView.getQuery();
    if (!query) {
      return;
    }
    // Load Search results
    await model.loadSearchResult(query);

    // Render the results
    // ResultView.render(model.state.search.results);
    ResultView.render(model.getSearchResultsPage(1));

    // Initial Pagination Buttons
    PaginationView.render(model.state.search);
  } catch (error) {
    console.error(error);
  }
};

const controlPagination = function (goToPage) {
  // Render New the results
  ResultView.render(model.getSearchResultsPage(goToPage));

  // New Pagination Buttons
  PaginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Updating the recipe serving in state
  model.updateServing(newServings);
  // Updating the recipeView
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.removeBookmark(model.state.recipe.id);
  }

  recipeView.update(model.state.recipe);

  // Render Bookmark
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // render spinner
    AddRecipeView.renderSpinner();
    // Upload new recipe data
    await model.uploadRecipe(newRecipe);

    // Render Recipe
    recipeView.render(model.state.recipe);

    // Render Success message
    AddRecipeView.renderMessage();

    //Change id in url
    window.history.pushState(null, '', `${model.state.recipe.id}`);

    // Render Bookmark Views
    bookmarkView.render(model.state.bookmarks);
    // Close Modal
    setTimeout(function () {
      AddRecipeView.toggleWindow();
    }, MODEL_CLOSE_SEC * 1000);
  } catch (error) {
    console.error(error.message);
    AddRecipeView.renderError(error.message);
  }
};

const init = function () {
  bookmarkView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  recipeView.addHandlerUpdateServing(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
  AddRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
