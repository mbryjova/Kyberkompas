
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
  baseURL: 'http://172.26.5.28/api/',
  headers: {
  'accept': 'application/json', 
  'Authorization': '', 
  'Content-Type': ''
}
});

/** before sending the request the token is added to the header */
api.interceptors.request.use(async req => {
  const token = await SecureStore.getItemAsync('token')
  req.headers.Authorization = token;
  return req;
})

const USER_ME_URL = 'user/me';
const MODULES_URL = 'modules';
const SIGN_UP_URL = 'user';
const VALID_CHALLENGES_URL = 'challenges/valid';
const INVALID_CHALLENGES_URL = 'challenges/obsolete';

/**
 * 
 * @param {*} setter setter from calling component
 * @param {*} url 
 */
const get_from_url = async (setter, url) => {
  await api.get(url).then((response) => {
    setter(response.data);
  }).catch(error => {console.log("get:", error);
  });
}

/**
 * 
 * @param {*} url 
 * @param {*} data 
 * @param {*} setter setter from calling component
 * @param {*} errorSetter setter of the error
 */
const post_to_url = async (url, data, setter=null, errorSetter=null) => {
  api.defaults.headers['Content-type'] = 'application/json';
  await api.post(url, data).then((response) => {
    if (setter != null) {
      setter(response.data);
    }
  }).catch(error => {
    if (errorSetter != null) {
      errorSetter(error.response.data)
    }
  });

}

/**
 * 
 * @param {*} url 
 * @param {*} data 
 * @param {*} setter setter from calling component
 */
const post_picture = async (url, data, setter=null) => {
  api.defaults.headers['Content-type'] = 'multipart/form-data';
  await api.post(url, data).then((response) => {
    if (setter != null) {
      setter(response.data);
    }
  }).catch(error => {
  });

}

export {

    // new api
    get_from_url,
    post_to_url,
    post_picture,
    
    // new api
    USER_ME_URL,
    MODULES_URL,
    SIGN_UP_URL,
    VALID_CHALLENGES_URL,
    INVALID_CHALLENGES_URL
}