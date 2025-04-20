import { getImagesByQuery } from "./js/pixabay-api";
import { createGallery, clearGallery, showLoader, hideLoader } from "./js/render-functions";
import iziToast from 'izitoast';

const form = document.querySelector(".form");
const searchInput = document.querySelector('input[name="search-text"]');
let searchTimeout;

const toastConfig = {
  position: 'topRight',
  backgroundColor: 'rgba(255, 0, 0, 0.6)',
  timeout: 3000,
};

const showError = (message) => {
  iziToast.show({
    ...toastConfig,
    message,
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  clearTimeout(searchTimeout);

  const query = searchInput.value.trim();
  if (!query) {
    hideLoader();
    showError('The search field cannot be empty');
    return;
  }

  searchTimeout = setTimeout(() => {
    clearGallery();
    showLoader();

    getImagesByQuery(query)
      .then((data) => {
        if (!data || data.length === 0) {
          showError('Sorry, there are no images matching your search query. Please try again!');
        } else {
          createGallery(data);
        }
      })
      .catch((error) => {
        console.error('Search error:', error);
        showError('An error occurred while fetching images');
      })
      .finally(() => {
        hideLoader();
      });
  }, 300);
});