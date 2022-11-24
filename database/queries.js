
import axios from "axios";
//import { UserContext } from "../App";
import React from "react";
import * as SecureStore from 'expo-secure-store';
//import {useContext} from "react";
//import { useUserContext } from "../components/context/context";

//const [loggedUser, setUser, token, setToken] = React.useContext(UserContext);

//const context = useUserContext();

//const token = SecureStore.getItemAsync('token');

const get_value = async (key) => {
  const value = await SecureStore.getItemAsync(key);
  console.log("token in queries:", value);
  return value;
}

//const token = get_value('token');

const api = axios.create({
  baseURL: 'http://172.26.5.28/api/',
  //timeout: 1000,
  // 'token cad8d7aa8dc1a8d07d06f0f97fcdbdf9da40752d'
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

const URL_CHALLENGES = 'https://kyberkompas-database.herokuapp.com/challenges';
const URL_ACTIVITIES = 'https://kyberkompas-database.herokuapp.com/activities_';
const URL_MODULES = 'https://kyberkompas-database.herokuapp.com/modules';
const URL_SCORES = 'https://kyberkompas-database.herokuapp.com/scores/';
const URL_BREACHES = 'https://kyberkompas-database.herokuapp.com/getbreaches_';
const URL_INACTIVE = 'https://kyberkompas-database.herokuapp.com/inactive_challenges';

const USER_ME_URL = 'user/me';
const MODULES_URL = 'modules';
const SIGN_UP_URL = 'user';
const VALID_CHALLENGES_URL = 'challenges/valid';
const INVALID_CHALLENGES_URL = 'challenges/obsolete';

const get_from_url = async (setter, url) => {
  //console.log(token);
  await api.get(url).then((response) => {
    //console.log(response.data);
    setter(response.data);
  }).catch(error => {console.log("get:", error);
  });

}

const post_to_url = async (url, data, setter=null) => {
  api.defaults.headers['Content-type'] = 'application/json';
  console.log(url, data)
  await api.post(url, data).then((response) => {
    console.log(response.data);
    if (setter != null) {
      console.log("here", response.data)
      setter(response.data);
    }
  }).catch(error => {console.log(error);
  });

}

const post_picture = async (url, data, setter=null) => {
  api.defaults.headers['Content-type'] = 'multipart/form-data';
  console.log(url, data)
  await api.post(url, data).then((response) => {
    console.log(response.data);
    if (setter != null) {
      console.log("here", response.data)
      setter(response.data);
    }
  }).catch(error => {console.log(error.response);
  });

}

const GET = async (setter, url, errorSetter=null) => { // gets a list from url
    //console.log("here2", url);
     await axios.get(url)
      .then((response) => {
        console.log(response.data);
        setter(response.data);
        //console.log(challenges);
      }).catch(error => {console.log(error);
        if (errorSetter != null) {
          //console.log("in queries", error.status);
          errorSetter(error.status);
        }
      });
}

const POST = (url, object) => { // posts an object to url
  axios.put(url, object).then(
    (response) => {
      console.log(response.data);
    }
  ).catch(error => console.log(error));
}

const LOGIN = async (user) => {
  try {
    const response = await axios.post('https://kyberkompas-database.herokuapp.com/login', user);
    console.log("user in login", response.data.user);
    if (response.status == 200) {
      //setter(response.data.user);
      return response.data.user;
    }
  } catch (error) {
    return console.log(error);
  }
}

const GET_SCORES = async (user_id) => {
  try {
    const response = await axios.get('https://kyberkompas-database.herokuapp.com/scores/'.concat(user_id));
    //console.log("user in login", response.data.user);
      //setter(response.data.user);
      return response.data;
  } catch (error) {
    return console.log(error);
  }

}

const SET_SCORES = async (user_id, points, activity) => {
  const scores = await GET_SCORES(user_id);
  loggedUser.total_score = loggedUser.total_score + points;
  console.log(scores);
  //GET(setScores, URL_SCORES.concat(user.id));
  if (activity) {
    POST(URL_SCORES.concat(user_id), {
      "id": user_id, "total_score": scores.total_score + points,
      "weekly_score": scores.weekly_score + points,
      "new_activities": scores.new_activities + 1,
      "finished_challenges": scores.finished_challenges
    })

  } else {
    POST(URL_SCORES.concat(user_id), {
      "id": user_id,
      "total_score": scores.total_score,
      "weekly_score": scores.weekly_score,
      "new_activities": scores.new_activities,
      "finished_challenges": scores.finished_challenges + 1
    })
  }
  setUser(loggedUser);


}

const CHALLENGE_FINISHED = () => {

}

const ACTIVITY_FINISHED = async (url, activities_data, points, user_id) => {

  //const [user, setUser] = React.useContext(UserContext);
  //const [scores, setScores] = React.useState(null);
  activities_data.setActivityFinished(true);
  
  activities_data.data[1].data.push(activities_data.activity); // dokončené

  // následující
  activities_data.data[0].data = activities_data.data[0].data.filter((item) => activities_data.activity.id != item.id);

  POST(url.concat(1), activities_data.data[0]);
  POST(url.concat(2), activities_data.data[1]);
  SET_SCORES(user_id, points, true);
  // const scores = await GET_SCORES(user_id);
  // console.log(scores);
  // //GET(setScores, URL_SCORES.concat(user.id));
  // POST(URL_SCORES.concat(user_id), {
  //   "id": user_id, "total_score": scores.total_score + points,
  //   "weekly_score": scores.weekly_score + points,
  //   "new_activities": scores.new_activities + 1,
  //   "finished_challenges": scores.finished_challenges
  // })
  //activities_data.setActivityFinished(true);

}


export {
    //PUT_PHOTO, // v profile.js
    //GET_ACTIVITIES, // v module.js
    //POST_ACTIVITY, // v aktivitách
    //api,
    LOGIN, // v login.js
    //GET_SCORES,
    GET,
    POST,
    ACTIVITY_FINISHED,
    SET_SCORES,

    // new api
    get_from_url,
    post_to_url,
    post_picture,
    //PUT,
    URL_CHALLENGES,
    URL_ACTIVITIES,
    URL_MODULES,
    URL_SCORES,
    URL_BREACHES,
    URL_INACTIVE,

    // new api
    USER_ME_URL,
    MODULES_URL,
    SIGN_UP_URL,
    VALID_CHALLENGES_URL,
    INVALID_CHALLENGES_URL
}