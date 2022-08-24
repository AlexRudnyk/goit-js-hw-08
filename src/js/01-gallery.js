// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

// console.log(galleryItems);

const galleryEl = document.querySelector('.gallery');
console.log('galleryEl', galleryEl);

// console.log(createGalleryItemsMarkup(galleryItems));

function createGalleryItemsMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>
`;
    })
    .join('');
}

const itemsMarkup = createGalleryItemsMarkup(galleryItems);

galleryEl.insertAdjacentHTML('afterbegin', itemsMarkup);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
