
import axios from "axios";

const URL_CHALLENGES = 'https://kyberkompas-database.herokuapp.com/challenges';
const URL_ACTIVITIES = 'https://kyberkompas-database.herokuapp.com/activities_';
const URL_MODULES = 'https://kyberkompas-database.herokuapp.com/modules';
const URL_SCORES = 'https://kyberkompas-database.herokuapp.com/scores/';

const GET = async (setter, url) => { // gets a list from url
    console.log("here2", url);
     await axios.get(url)
      .then((response) => {
        console.log(response.data);
        setter(response.data);
        //console.log(challenges);
      }).catch(error => console.log(error));
}

const POST = (url, object) => {
  axios.put(url, object).then(
    (response) => {
      console.log(response.data);
    }
  ).catch(error => console.log(error));
}

const PUT_PHOTO = (user_id, user) => {
  axios.put('https://kyberkompas-database.herokuapp.com/users/'.concat(user_id), user).then(
    (response) => {
      console.log(response.data);
    }
  ).catch(error => console.log(error));
}

// const POST_ACTIVITY = (activity, id) => {
//   axios.put('https://kyberkompas-database.herokuapp.com/activities/'.concat(id), activity).then(
//     (response) => {
//       console.log(response.data);
//     }
//   ).catch(error => console.log(error));
// }


// const GET_ACTIVITIES = (setter, module_name) => {
//     axios.get('https://kyberkompas-database.herokuapp.com/activities_'.concat(module_name.toLowerCase()))
//     .then((response) => {
//       console.log(response.data);
//       setter(response.data);
//     }).catch(error => console.log(error));
// }

const LOGIN = async (user, setter) => {
  try {
    const response = await axios.post('https://kyberkompas-database.herokuapp.com/login', user);
    console.log(response.data);
    if (response.status == 200) {
      setter(response.data);
    }
  } catch (error) {
    return console.log(error);
  }
}

// const GET_SCORES = (user_id, setter) => {
//   axios.get('https://kyberkompas-database.herokuapp.com/scores/'.concat(user_id))
//     .then((response) => {
//       console.log(response.data);
//       setter(response.data);
//     }).catch(error => console.log(error));

// }

export {
    PUT_PHOTO, // v profile.js
    //GET_ACTIVITIES, // v module.js
    //POST_ACTIVITY, // v aktivitách
    LOGIN, // v login.js
    //GET_SCORES,
    GET,
    POST,
    URL_CHALLENGES,
    URL_ACTIVITIES,
    URL_MODULES,
    URL_SCORES
}