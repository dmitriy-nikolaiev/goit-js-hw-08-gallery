import galleryItems from './gallery-items.js';

const galleryListRef = document.querySelector('ul.js-gallery');
const lightboxRef = document.querySelector('div.js-lightbox');
const lightboxImageRef = document.querySelector('img.lightbox__image');

// Create gallery
const htmlGalleryItems = galleryItems.map(
  ({ preview, original, description: alt }) => {
    return `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}"
      data-source="${original}"
      alt="${alt}"/>
    </a>
  </li>`;
  },
);
galleryListRef.insertAdjacentHTML('afterbegin', htmlGalleryItems.join(''));

const closeModal = () => {
  lightboxRef.classList.remove('is-open');
  lightboxImageRef.setAttribute('src', '');
  lightboxImageRef.setAttribute('alt', '');
};

// Lightbox scroll image
const scrollImage = direction => {
  let nextImageIndex =
    galleryItems.findIndex(
      element => element.original === lightboxImageRef.src,
    ) + direction;
  if (nextImageIndex > galleryItems.length - 1) {
    nextImageIndex = 0;
  } else if (nextImageIndex < 0) {
    nextImageIndex = galleryItems.length - 1;
  }
  lightboxImageRef.src = galleryItems[nextImageIndex].original;
  lightboxImageRef.alt = galleryItems[nextImageIndex].description;
};

// Event Listeners
galleryListRef.addEventListener('click', event => {
  event.preventDefault();
  if (event.target.classList.contains('gallery__image')) {
    lightboxImageRef.setAttribute('src', event.target.dataset.source);
    lightboxImageRef.setAttribute('alt', event.target.alt);
    lightboxRef.classList.add('is-open');
  }
});

lightboxRef.addEventListener('click', event => {
  if (
    event.target.dataset.action === 'close-lightbox' ||
    event.target.classList.contains('lightbox__overlay')
  ) {
    closeModal();
  }
});

document.addEventListener('keydown', ({ code }) => {
  if (!lightboxRef.classList.contains('is-open')) {
    return;
  }
  if (code === 'Escape') {
    closeModal();
  } else if (code === 'ArrowRight') {
    scrollImage(1);
  } else if (code === 'ArrowLeft') {
    scrollImage(-1);
  }
});
