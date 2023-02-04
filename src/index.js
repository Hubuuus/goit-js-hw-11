// const axios = require('axios').default;
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// const searchInput = document.querySelector('.search-form__input');
// const submitButton = document.querySelector('.search-form');
// const gallery = document.querySelector('.gallery');

// const pageNumberCounter = 1;

// const apiInfo = {
//   key: '33342226-bbc62fd28fd26f410ebf6a75c',
//   image_type: 'image',
//   orientation: 'horizontal',
//   safesearch: true,
//   per_page: 40,
// };

// var lightbox = new SimpleLightbox('.gallery a');
// const displayImgEl = image => {
//   gallery.insertAdjacentHTML(
//     'beforeend',
//     `<div class="photo-box">
//       <a href="${image.largeImageURL}">
//         <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
//       </a>
//     <div class="info">
//       <p class="info__item">
//         <span>Likes</span>
//         ${image.likes}
//       </p>
//       <p class="info__item">
//         <span>Views</span>
//         ${image.views}
//       </p>
//       <p class="info__item">
//         <span>Comments</span>
//         ${image.comments}
//       </p>
//       <p class="info__item">
//         <span>Downloads</span>
//         ${image.downloads}
//       </p>
//     </div>
//   </div>`
//   );
// };

// const getImg = async (value, page) => {
//   try {
//     const response = await axios.get(
//       `https://pixabay.com/api/?key=${apiInfo.key}&q=${value}&image_type=${apiInfo.image_type}&orientation=${apiInfo.orientation}&safesearch=${apiInfo.safesearch}&per_page=${apiInfo.per_page}&page=${page}`
//     );

//     const data = response.data.hits;

//     data.forEach(image => {
//       displayImgEl(image);
//     });
//     lightbox.refresh();
//     Notify.info(`Hooray! We found ${response.data.totalHits} images.`);

//     const { height: cardHeight } = document
//       .querySelector('.gallery')
//       .firstElementChild.getBoundingClientRect();

//     window.scrollBy({
//       top: cardHeight * 0.5,
//       behavior: 'smooth',
//     });
//   } catch (error) {
//     Notify.failure(
//       'Sorry, there are no images matching your search query. Please try again.'
//     );
//   }
// };

// submitButton.addEventListener('submit', event => {
//   gallery.innerHTML = '';
//   event.preventDefault();
//   if (searchInput.value == '') {
//     return;
//   } else {
//     pageNumberCounter = 1;
//     getImg(searchInput.value.trim(), pageNumberCounter);
//   }
// });

// window.addEventListener('scroll', () => {
//   console.log('scrolled', window.scrollY);
//   console.log(window.innerHeight);
//   if (
//     window.scrollY + window.innerHeight >=
//     document.documentElement.scrollHeight
//   ) {
//     pageNumberCounter++;
//     getImages(searchInput.value.trim(), pageNumberCounter);
//   }
// });

const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchInput = document.querySelector('.search-form__input');
const searchSubmit = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

let parameters = {
  key: '33342226-bbc62fd28fd26f410ebf6a75c',
  image_type: 'image',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 25,
};

var lightbox = new SimpleLightbox('.gallery a');
const displayImgEl = img => {
  gallery.insertAdjacentHTML(
    'beforeend',
    `<div class="imgCard">
      <a href="${img.largeImageURL}">
        <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
      </a>
    <div class="imgCard--info">
      <p class="imgCard--info__item">
        <span>Likes</span>
        ${img.likes}
      </p>
      <p class="imgCard--info__item">
        <span>Views</span>
        ${img.views}
      </p>
      <p class="imgCard--info__item">
        <span>Comments</span>
        ${img.comments}
      </p>
      <p class="imgCard--info__item">
        <span>Downloads</span>
        ${img.downloads}
      </p>
    </div>
  </div>`
  );
};

const getImg = async (value, page) => {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${parameters.key}&q=${value}&image_type=${parameters.image_type}&orientation=${parameters.orientation}&safesearch=${parameters.safesearch}&per_page=${parameters.per_page}&page=${page}`
    );

    const data = response.data.hits;

    data.forEach(img => {
      displayImgEl(img);
    });
    lightbox.refresh();
    Notify.success(`Hooray! We found ${response.data.totalHits} images.`);

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 0.5,
      behavior: 'smooth',
    });
  } catch (error) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
};

searchSubmit.addEventListener('submit', event => {
  gallery.innerHTML = '';
  event.preventDefault();
  if (searchInput.value == '') {
    return;
  } else {
    pageScroll = 1;
    getImg(searchInput.value.trim(), pageScroll);
  }
});

let pageScroll = 1;

window.addEventListener('scroll', () => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    pageScroll++;
    getImg(searchInput.value.trim(), pageScroll);
  }
});
