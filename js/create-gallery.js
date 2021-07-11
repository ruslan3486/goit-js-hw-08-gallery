import ItemsDefault from "./app.js";

const refs = {
    galleryItems: document.querySelector('.js-gallery'),
    modal: document.querySelector('.js-lightbox'),
    modalCloseBtn: document.querySelector('button[data-action="close-lightbox"]'),
    modalImg: document.querySelector('.lightbox__image'),
    
};

// Создание и рендер разметки по массиву данных galleryItems из app.js и предоставленному шаблону.

const marcupGallery = createGalleryMarcup(ItemsDefault)

refs.galleryItems.insertAdjacentHTML('beforeend', marcupGallery);

function createGalleryMarcup(elements) {
    return elements.map(({ preview, original, description }) => {
        return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
        .join('');
}

// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.

refs.galleryItems.addEventListener('click', onOpenImage)

function onOpenImage(e) {
    
    if (e.target.nodeName !== 'IMG') {
        return
    }

    e.preventDefault(); //отмена перехода по ссилке
    refs.modal.classList.add('is-open'); // Открытие модального окна по клику на элементе галереи.
    refs.modalImg.src = e.target.dataset.source;
    refs.modalImg.alt = e.target.alt
}



// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].

refs.modalCloseBtn.addEventListener('click', onCloseModal)
function onCloseModal() {
    refs.modal.classList.remove('is-open');
    refs.modalImg.src = '';// Очистка значения атрибута src элемента img.lightbox__image.
    refs.modalImg.alt = '';

}