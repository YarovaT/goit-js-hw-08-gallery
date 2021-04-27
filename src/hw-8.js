import galleryItems from "./gallery-items.js";

const imagesContainerRef = document.querySelector("ul.js-gallery");

const makeImgTags = (galleryItem) => {
  return `
  <li class="gallery__item">
  <a
    class="gallery__link"
    href= '${galleryItem.original}'
  >
    <img
      class="gallery__image"
      src='${galleryItem.preview}'
      data-source='${galleryItem.original}'
      >
      alt='${galleryItem.description}'
    />
  </a>
</li>
    `;
};

const makeImgTagsGallery = galleryItems.map(makeImgTags).join("");

imagesContainerRef.insertAdjacentHTML("afterbegin", makeImgTagsGallery);
