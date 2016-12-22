import axios from 'axios';
import APIKEYS from './APIKEYS.js';
const ROOT_URL = 'https://app.ticketmaster.com/discovery/v2/events.json?';

export const SEARCH_EVENTS = 'SEARCH_EVENTS';
export const EVENT_SELECTED = 'EVENT_SELECTED';
export const SAVE_RESULT = 'SAVE_RESULT';
export const GET_EVENTS = 'GET_EVENTS';
export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN';

module.exports = {
  selectEvent(event) {
    return {
      type: EVENT_SELECTED,
      payload: event,
    };
  },
  searchEvents(query) {
    const url = ROOT_URL + 'keyword=' + query + '&&apikey=' + APIKEYS;
    const request = axios.get(url);

    console.log('REQUEST: ', request);
    return {
      type: SEARCH_EVENTS,
      payload: request,
    };
  },
  saveResult(result) {
    const resultObj = {
      tm_id: result.id || null,
      name: result.name || null,
      artist_name: JSON.stringify(result._embedded.attractions) || null,
      date: result.dates.start.dateTime || null,
      event_url: result.url || null,
      venue: result._embedded.venues[0].name|| null,
      venue_address: result._embedded.venues[0].address.line1 || null,
      city: result._embedded.venues[0].city.name || null,
      zipcode: result._embedded.venues[0].postalCode || null,
      image: result._embedded.attractions[0].images[0].url || null,
      genre: result.classifications[0].genre.name || null,
      subgenre: result.classifications[0].subGenre.name || null,
      latitude: result._embedded.venues[0].location.latitude || null,
      longitude: result._embedded.venues[0].location.longitude || null,
      country: result._embedded.venues[0].country.name || null,
      sale_date: JSON.stringify(result.sales.public) || null,
    };
    axios.post('/api/events/addevent', resultObj);
    // browserHistory.push('/');
    return {
      type: SAVE_RESULT,
      payload: resultObj,
    };
  },
  getEvents() {
    const request = axios.get('/api/events/getAll');
    console.log('THIS IS THE GETALL EVENTS REQUEST FROM ACTION: ', request);
    return {
      type: GET_EVENTS,
      payload: request,
    }
  },
  signUp(result) {
    console.log('SIGNUP RESULT BEFORE OBJ: ', result);
    const resultObj = {
      email: result.email,
      password: result.password,
      fullname: result.name,
    };
    console.log('SIGNUP RESULT:: ', resultObj);
    axios.post('/auth/signup', {
      data: resultObj,
    });

    // return {
    //   type: SIGN_UP,
    //   payload: resultObj,
    // };
  },
  logIn(result) {
    const resultObj = {
      email: result.email,
      password: result.password,
    };
    console.log('LOGIN RESULT:: ', result);
    axios.post('/auth/login', resultObj);

    return {
      type: LOG_IN,
      payload: resultObj,
    };
  },
};
