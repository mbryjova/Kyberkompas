
import axios from "axios";
import { UserContext } from "../App";
import React from "react";

const URL_CHALLENGES = 'https://kyberkompas-database.herokuapp.com/challenges';
const URL_ACTIVITIES = 'https://kyberkompas-database.herokuapp.com/activities_';
const URL_MODULES = 'https://kyberkompas-database.herokuapp.com/modules';
const URL_SCORES = 'https://kyberkompas-database.herokuapp.com/scores/';
const URL_BREACHES = 'https://kyberkompas-database.herokuapp.com/getbreaches_';

const GET = async (setter, url) => { // gets a list from url
    //console.log("here2", url);
     await axios.get(url)
      .then((response) => {
        console.log(response.data);
        setter(response.data);
        //console.log(challenges);
      }).catch(error => console.log(error));
}

const PUT = (url, object) => {
  axios.put(url, object).then(
    (response) => {
      console.log(response.data);
    }
  ).catch(error => console.log(error));

}

const POST = (url, object) => { // posts an object to url
  axios.put(url, object).then(
    (response) => {
      console.log(response.data);
    }
  ).catch(error => console.log(error));
}

// const PUT_PHOTO = (user_id, user) => {
//   axios.put('https://kyberkompas-database.herokuapp.com/users/'.concat(user_id), user).then(
//     (response) => {
//       console.log(response.data);
//     }
//   ).catch(error => console.log(error));
// }

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

const ACTIVITY_FINISHED = async (url, activities_data, points) => {

  //const [user, setUser] = React.useContext(UserContext);
  //const [scores, setScores] = React.useState(null);
  activities_data.setActivityFinished(true);
  
  activities_data.data[0].data.push(activities_data.activity);
  activities_data.data[1].data = activities_data.data[1].data.filter((item) => activities_data.activity.id != item.id);

  POST(url.concat(1), activities_data.data[0]);
  POST(url.concat(2), activities_data.data[1]);
  //GET(setScores, URL_SCORES.concat(user.id));
  // POST(URL_SCORES.concat(user.id), {
  //   "id": user.id, "total_score": scores.total_score + points,
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
    LOGIN, // v login.js
    //GET_SCORES,
    GET,
    POST,
    ACTIVITY_FINISHED,
    //PUT,
    URL_CHALLENGES,
    URL_ACTIVITIES,
    URL_MODULES,
    URL_SCORES,
    URL_BREACHES
}