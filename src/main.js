import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  gallery,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');
const input = form.elements['search-text'];
const loadMoreBtn = document.querySelector('.button-load');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

hideLoadMoreButton();

async function onSearch(event) {
  event.preventDefault();
  currentQuery = input.value.trim();
  currentPage = 1;
  totalHits = 0;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  if (currentQuery === '') {
    iziToast.error({
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    hideLoader();
    return;
  }
  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    if (!data || !Array.isArray(data.hits)) {
      iziToast.error({
        message: 'Received incorrect data while loading additional images. Please try again.',
        position: 'topRight',
      });
      hideLoader();
      return;
    }

    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      hideLoader();
      return;
    }

    createGallery(data.hits);
    hideLoader();

    checkEndOfTheCollection();
  } catch (error) {
    console.log('catch', error);
    iziToast.error({
      message: 'Try again!',
      position: 'topRight',
    });
    hideLoader();
  } finally {
    input.value = '';
  }
}

async function onLoadMore() {
  currentPage += 1;
  showLoader();
  hideLoadMoreButton();

  try {
      const data = await getImagesByQuery(currentQuery, currentPage);
      if (!data || !Array.isArray(data.hits)) {
      iziToast.error({
        message: 'Received incorrect data while loading additional images. Please try again.',
        position: 'topRight',
      });
      hideLoader();
      showLoadMoreButton();
      return;
    }

    createGallery(data.hits);
    hideLoader();
    checkEndOfTheCollection();
    scrollToNextGroup();
  } catch (error) {
    console.log('catch', error);
    iziToast.error({
      message: 'An error occurred while loading more images',
      position: 'topRight',
    });
    hideLoader();
    showLoadMoreButton();
  }
}

function checkEndOfTheCollection() {
  const loadedImagesCount = currentPage * 15;

  if (loadedImagesCount >= totalHits) {
    hideLoadMoreButton();
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results!",
    });
  } else {
    showLoadMoreButton();
  }
}

function scrollToNextGroup() {
  const firstGalleryItem = gallery.firstElementChild;
  if (firstGalleryItem) {
    const itemHeight = firstGalleryItem.getBoundingClientRect().height;
    window.scrollBy({
      top: itemHeight * 2,
      behavior: 'smooth',
    });
  }
}
