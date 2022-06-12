// module for interface elements and their event listeners

import { API_KEY, refs, watchedIdArr, queueIdArr } from './global';
import {
  getMovieList,
  searchMovies,
  getMovieInfo,
  getAndShowLibrary,
} from './movies';
import { modalInit } from './modal';
import { clearMovies } from './markup';
import { showLoader, hideLoader } from './loader';
import { DataStorage } from './data';
import { onQueueBtnCard, onWatchedBtnCard } from './actions-library';

const data = new DataStorage();
export function init() {
  //refs, event listeners, genres request, popular movies request
  // showLoader();
  // hideLoader();

  modalInit();
  refs.cardsBox = document.querySelector('.cards-box');
  refs.header = document.querySelector('.header');
  refs.homeLink = document.querySelector('#home');
  refs.libraryLink = document.querySelector('#library');
  refs.logo = document.querySelector('#logo');
  refs.libraryWatchBtn = document.querySelector('#lib-w');
  refs.libraryQueBtn = document.querySelector('#lib-q');
  refs.ourTeamLink = document.querySelector('#our-team');
  refs.closeModalBtn = document.querySelector('[data-action="close-modal"]');
  refs.backdrop = document.querySelector('.js-backdrop');
  refs.movieModal = document.querySelector('.movie-modal');
  refs.searchForm = document.querySelector('#movie-search');

  try {
    refs.logo.addEventListener('click', onHomeLinkClick);
    refs.homeLink.addEventListener('click', onHomeLinkClick);
    refs.libraryLink.addEventListener('click', onLibraryLinkClick);
    refs.libraryWatchBtn.addEventListener('click', onLibraryWatchBtnClick);
    refs.libraryQueBtn.addEventListener('click', onLibraryQueBtnClick);
    refs.ourTeamLink.addEventListener('click', openTeamModal);
    refs.closeModalBtn.addEventListener('click', closeTeamModal);
    refs.backdrop.addEventListener('click', onBackdropClick);
    refs.searchForm.addEventListener('submit', onMoviesSearch);
    refs.cardsBox.addEventListener('click', onActionMovieCard);

    // refs.movieModal.addEventListener('click', onCloseClick);
  } catch (error) {
    console.log(error);
  }

  getMovieList();

  // when init page, check localStorage
  data.getQueue();
  data.getWatched();
}

function onHomeLinkClick(event) {
  event.preventDefault();
  refs.header.classList.remove('header-library');
  refs.header.classList.add('header-search');
}

function onLibraryLinkClick(event) {
  event.preventDefault();
  refs.header.classList.remove('header-search');
  refs.header.classList.add('header-library');
  onLibraryWatchBtnClick();
}

function onLibraryWatchBtnClick() {
  refs.libraryWatchBtn.classList.remove('accent-btn');
  refs.libraryWatchBtn.classList.add('accent-btn');
  refs.libraryQueBtn.classList.remove('accent-btn');
  clearMovies();
  getAndShowLibrary(data.getWatched());
}

function onLibraryQueBtnClick() {
  refs.libraryQueBtn.classList.remove('accent-btn');
  refs.libraryQueBtn.classList.add('accent-btn');
  refs.libraryWatchBtn.classList.remove('accent-btn');
  clearMovies();
  getAndShowLibrary(data.getQueue());
}

function openTeamModal() {
  window.addEventListener('keydown', checkKeyPress);
  document.body.classList.add('modal-open');
}

function closeTeamModal() {
  window.removeEventListener('keydown', checkKeyPress);
  document.body.classList.remove('modal-open');
}

function checkKeyPress(event) {
  if (event.code === 'Escape') {
    closeTeamModal();
  }
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    closeTeamModal();
  }
}

function onMoviesSearch(event) {
  event.preventDefault();
  const query = event.target.elements.query.value;
  refs.cardsBox.innerHTML = '';
  clearMovies();
  searchMovies(query);
}

function onActionMovieCard(event) {
  event.preventDefault();

  let btnClicked = false;

  event.path.map(currentMovieLink => {
    // check btn events on the movie card and add/delete to/from the library
    if (currentMovieLink.nodeName === 'BUTTON') {
      const currentMovieId = currentMovieLink.closest('.card-link').dataset.id;
      const currentMovieIdNum = Number(currentMovieId);

      if (currentMovieLink.classList.contains('in-queue')) {
        onQueueBtnCard(currentMovieLink, currentMovieIdNum);
      } else if (currentMovieLink.classList.contains('in-watched')) {
        onWatchedBtnCard(currentMovieLink, currentMovieIdNum);
      }
      btnClicked = true;
      // event.stopImmediatePropagation();
    }

    // catch a movie link and open the movie modal
    if (currentMovieLink.nodeName === 'A' && !btnClicked) {
      const currentMovieId = currentMovieLink.dataset.id;
      const currentMovieIdNum = Number(currentMovieId);
      getMovieInfo(currentMovieId);

      // event.stopPropagation();
    }
  });
}
