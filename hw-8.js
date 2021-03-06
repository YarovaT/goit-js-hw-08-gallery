import galleryItems from "./gallery-items.js";

const refs = {
  imgContainer: document.querySelector(".js-gallery"),
  modalWindow: document.querySelector(".js-lightbox"),
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
refs.btn.addEventListener("click", onClickBtnClose);

// Открытие модального окна по клику на элементе галереи
function onClick(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== "IMG") {
    return;
  }

  refs.modalWindow.classList.add("is-open");
  // Подмена значения атрибута `src` элемента `img.lightbox__image`.
  refs.lightboxImg.src = evt.target.dataset.source;
  refs.lightboxImg.alt = evt.target.alt;

  window.addEventListener("keyup", onClickKey);

  window.addEventListener("keydown", onFlipping);
}

// Очистка значения атрибута `src` элемента `img.lightbox__image`.
function onClickBtnClose() {
  refs.modalWindow.classList.remove("is-open");
  refs.lightboxImg.src = "";
  refs.lightboxImg.alt = "";
  window.removeEventListener("keyup", onClickKey);

  window.removeEventListener("keydown", onFlipping);
}

function closeModalWindow(event) {
  if (event.target === event.currentTarget) {
    onClickBtnClose();
  }
}

function onClickKey(event) {
  if (event.code === "Escape") {
    onClickBtnClose();
  }
}

// Закрытие модального окна по клику на `div.lightbox__overlay`.
refs.overlay.addEventListener("click", closeModalWindow);

/*Пролистывание изображений галереи в открытом модальном окне клавишами "влево"
и "вправо"*/
function onFlipping(event) {
  if (event.code === "ArrowRight") {
    onRightNext();
  }
  if (event.code === "ArrowLeft") {
    onLeftNext();
  }
}

function onRightNext() {
  const currentImg = galleryItems.find(
    (img) => img.original === refs.lightboxImg.src
  );
  let index = currentImg ? galleryItems.indexOf(currentImg) : 0;
  if (index < galleryItems.length - 1) {
    index += 1;
  } else {
    index = 0;
  }
  refs.lightboxImg.src = galleryItems[index].original;
  refs.lightboxImg.alt = galleryItems[index].description;
}

function onLeftNext() {
  const currentImg = galleryItems.find(
    (img) => img.original === refs.lightboxImg.src
  );
  let index = currentImg
    ? galleryItems.indexOf(currentImg)
    : galleryItems.length - 1;
  if (index > 0) {
    index -= 1;
  } else {
    index = galleryItems.length - 1;
  }
  refs.lightboxImg.src = galleryItems[index].original;
  refs.lightboxImg.alt = galleryItems[index].description;
}
