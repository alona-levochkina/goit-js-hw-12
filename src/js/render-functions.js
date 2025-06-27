import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.button-load');

let lightbox;

export function createGallery(images) {
  const galleryMarkup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}">
                <img class="gallery-image"
                    src="${webformatURL}"  
                    alt="${tags}"/>
                <div class="image-info">
                    <p class="info-item">
                        <span class="info-label">Likes</span>
                        <span class="info-value">${likes}</span>
                    </p>
                    <p class="info-item">
                        <span class="info-label">Views</span>
                        <span class="info-value">${views}</span>
                    </p> 
                    <p class="info-item">
                        <span class="info-label">Comments</span>
                        <span class="info-value">${comments}</span>
                    </p> 
                    <p class="info-item">
                        <span class="info-label">Downloads</span>
                        <span class="info-value">${downloads}</span>
                    </p>     
                </div>
            </a>
        </li>
        `;
      }
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', galleryMarkup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
      close: true,
    });
  } else {
    lightbox.refresh();
  }
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('hidden');
}
