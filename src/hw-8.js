import galleryItems from "./gallery-items.js";

const refs = {
  imgContainer: document.querySelector(".js-gallery"),
  modalWindow: document.querySelector(".lightbox"),
  lightboxImg: document.querySelector(".lightbox__image"),
  btn: document.querySelector('[data-action="close-lightbox"]'),
  overlay: document.querySelector(".lightbox__overlay"),
};

// Создание и рендер разметки по массиву данных и предоставленному шаблону

const makeImgTags = ({ preview, original, description }) => {
  return `
  <li class="gallery__item">
  <a
    class="gallery__link"
    href= '${original}'
  >
    <img
      class="gallery__image"
      src='${preview}'
      data-source='${original}'
      alt='${description}'
      />
 </a>
</li>`;
};

const makeImgTagsGallery = galleryItems.map(makeImgTags).join("");
refs.imgContainer.insertAdjacentHTML("afterbegin", makeImgTagsGallery);

/*Реализация делегирования на галерее `ul.js-gallery` и получение `url` большого
  изображения*/

refs.imgContainer.addEventListener("click", onClick);

/*Закрытие модального окна по клику на кнопку
`button[data-action="close-lightbox"]`.*/
refs.modalWindow.addEventListener("click", closeModalWindow);

// Очистка значения атрибута `src` элемента `img.lightbox__image`.
refs.btn.addEventListener("click", onClickBtnClose);

function onClick(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== "IMG") {
    return;
  }
  if (evt.target.nodeName === "IMG") {
    // Открытие модального окна по клику на элементе галереи
    refs.modalWindow.classList.add("is-open");
    // Подмена значения атрибута `src` элемента `img.lightbox__image`.
    refs.lightboxImg.src = evt.target.dataset.source;
    refs.lightboxImg.alt = evt.target.alt;
  }
  window.addEventListener("keyup", clickKey);
}

function closeModalWindow(event) {
  if (event.target === event.currentTarget) {
    onClickBtnClose();
  }
}

function onClickBtnClose(evt) {
  evt.preventDefault();
  refs.modalWindow.classList.remove("is-open");
  refs.lightboxImg.src = "";
  refs.lightboxImg.alt = "";
  window.removeEventListener("keyup", clickKey);
}

function clickKey(event) {
  if (event.code === "Escape") {
    onClickBtnClose();
  }
}

// Закрытие модального окна по клику на `div.lightbox__overlay`.
refs.overlay.addEventListener("click", onClickBtnClose);

// - Закрытие модального окна по нажатию клавиши `ESC`.
