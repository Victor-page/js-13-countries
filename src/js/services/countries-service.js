const baseUrl = 'https://restcountries.eu/rest/v2/name/';

export default {
  query: '',
  fetchCountries(query) {
    const requestParams = `${query}`;

    return fetch(baseUrl + requestParams)
      .then(responce => responce.json())
      .then(parcedResponce => {
        return parcedResponce;
      });
  },
};
