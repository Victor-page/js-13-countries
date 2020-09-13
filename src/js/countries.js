import debounce from 'lodash.debounce';

import countriesService from './services/countries-service';

import countryItemTemplate from '../templates/country-item.hbs';
import countryList from '../templates/country-list.hbs';

import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

const refs = {
  searchForm: document.querySelector('#search-form'),
  countryList: document.querySelector('#country-list'),
  country: document.querySelector('#country'),
};

refs.searchForm.addEventListener('input', searchFormSubmitHandler);

function searchFormSubmitHandler(e) {
  const searchQuery = e.currentTarget.value;

  countriesService
    .fetchCountries(searchQuery)
    .then(data => {
      console.log(data);

      if (data.length > 10) {
        error({
          width: '320px',
          maxTextHeight: null,
          delay: 1500,
          text: 'Too many matches found. Please enter a more specific query!',
          closer: false,
          sticker: false,
        });
        clearCountryList();
        clearCountry();
      }

      if (data.length < 10) {
        const markup = buildItemsMarkup(data);
        insertItems(markup);
        clearCountry();
      }

      if (data.length === 1) {
        const markup = buildItemMarkup(data[0]);
        insertItem(markup);
        refs.countryList.firstChild.remove();
      }
    })
    .catch(error => console.warn(error));
}

function insertItem(item) {
  clearCountry();
  refs.country.insertAdjacentHTML('beforeend', item);
}

function insertItems(item) {
  clearCountryList();
  refs.countryList.insertAdjacentHTML('beforeend', item);
}

function buildItemMarkup(item) {
  return countryItemTemplate(item);
}

function buildItemsMarkup(item) {
  return countryList(item);
}

function clearCountry() {
  refs.country.innerHTML = '';
}

function clearCountryList() {
  refs.countryList.innerHTML = '';
}
