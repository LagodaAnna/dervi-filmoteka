import APIService from './movie-api';
import { API_IMG_URL } from './global';

export function showSliderMovies(selector) {
  api
    .getPremiers()
    .then(res => res.results)
    .then(data => {
      sliderCardsTpl(data, selector);
      splide.mount(window.splide.Extensions);
    });
}

export const splide = new Splide('.splide', {
  type: 'loop',
  drag: 'free',
  focus: 'center',
  gap: '20px',
  pagination: false,
  perPage: 10,
  autoScroll: {
    speed: 1,
  },
});

const api = new APIService();
const genres = api.getGenres().reduce((acc, genre) => {
  return { ...acc, [genre.id]: genre.name };
}, {});

function getGenresForSlider(genreArr, genres) {
  const showedGenres = [];
  let index = 0;
  for (item of genreArr) {
    index++;
    if (index > 2) {
      showedGenres.push('others');
      break;
    }
    showedGenres.push(genres[item]);
  }

  return showedGenres.join(', ');
}

function sliderCardsTpl(objectsArray, selector) {
  objectsArray.map(movie => {
    const gendersList = getGenresForSlider(movie.genre_ids, genres);
    selector.innerHTML += `
        <li class="card splide__slide">
          <a href="" class="card-link" data-id="${movie.id}">
            <div class="splide__img-container">
              <img
                src="${API_IMG_URL}${movie.poster_path}"
                class="splide__img"
                alt=""
              />
            </div>
            <div class="splide__card-body">
              <p class="splide__card-title"><b>${movie.title}</b></p>
              <p class="splide__card-genres"><b>${gendersList} | ${movie.release_date.slice(
      0,
      4
    )}</b>
              </p>
            </div>
          </a>
        </li>`;
  });
}
