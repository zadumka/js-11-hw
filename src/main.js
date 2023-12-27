import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  gallery: document.querySelector('.gallery'),
  form: document.querySelector('.search-form'),
  input: document.querySelector('input'),
  loadBtn: document.querySelector('.load-more'),
};

const KEY = '41029112-ec6e065fca3f0d308b81a7ee5';
axios.defaults.baseURL = 'https://pixabay.com/api/';
let page = 1;
let searchQuery = null;

refs.form.addEventListener('submit', async event => {
  event.preventDefault();
  refs.gallery.innerHTML = '';
  page = 1;

  searchQuery = refs.input.value.trim();

  if (!searchQuery) {
    return;
  }
  fetchImages(page, searchQuery).then(value => makeCards(value));
});

refs.loadBtn.addEventListener('click', loadMore);

async function loadMore() {
  refs.loadBtn.classList.add('hidden');
  page += 1;
  fetchImages(page, searchQuery).then(value => {
    makeCards(value);
    if (page === Math.ceil(value.data.totalHits / 40)) {
      iziToast.show({
        message:
          "We're are sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      refs.loadBtn.classList.add('hidden');
      return;
    }
  });
}

async function fetchImages(pag, searchQuery) {
  // if (page !== 1) {
  //   iziToast.show({
  //     message: 'PLease wait, pictures are loading...',
  //     position: 'topRight',
  //   });
  // }

  const params = new URLSearchParams({
    key: KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: pag,
    per_page: 40,
  });

  const resp = await axios.get(`?${params}`);

  if (page === 1) {
    if (resp.data.totalHits === 0) {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }
    iziToast.show({
      message: `Hooray! We found ${resp.data.totalHits} images.`,
      position: 'topRight',
    });
  }

  return resp;
}

async function makeCards(response) {
  const markup = response.data.hits
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
        return `<a href="${largeImageURL}"><div class="photo-card">
  <img class="image" src="${webformatURL}" alt="${tags}" loading="lazy" />
  <span class="loader"></span>
  <div class="info">
    <p class="info-item">
      <b>Likes</b><br>${likes}
    </p>
    <p class="info-item">
      <b>Views</b><br>${views}
    </p>
    <p class="info-item">
      <b>Comments</b><br>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b><br>${downloads}
    </p>
  </div>
  </div></a>`;
      }
    )
    .join('');
  refs.gallery.innerHTML += markup;

  refs.images = document.querySelectorAll('.image');
  [...refs.images].map(image => {
    image.addEventListener('load', onLoad(image));
  });

  const { height: cardHeight } =
    refs.gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight / 2,
    behavior: 'smooth',
  });

  refs.loadBtn.classList.remove('hidden');

  let simplelightbox = new SimpleLightbox('.gallery a', {});
  simplelightbox.refresh();
 
}

 function onLoad(image) {
    image.nextElementSibling.style.display = 'none';
  }