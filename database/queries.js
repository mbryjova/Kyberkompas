
import axios from "axios";

const GET_CHALLENGES = (setter) => {
    console.log("here2");
      axios.get('https://kyberkompas-database.herokuapp.com/challenges')
      .then((response) => {
        console.log(response.data);
        setter(response.data);
        //console.log(challenges);
      }).catch(error => console.log(error));
}

const GET_USERS = (setter) => {
  //console.log("here");
    axios.get('https://kyberkompas-database.herokuapp.com/users')
    .then((response) => {
      console.log(response.data);
      setter(response.data);
      //console.log(challenges);
    }).catch(error => console.log(error));
}

const PUT_PHOTO = (user_id) => {
  axios.put('https://kyberkompas-database.herokuapp.com/users'.concat(user_id)).then(
    (response) => {
      console.log(response.data);
    }
  ).catch(error => console.log(error));
}

const POST_ACTIVITY = (activity_id) => {
  axios.put('https://kyberkompas-database.herokuapp.com/activities/1/data').then(
    (response) => {
      console.log(response.data);
    }
  ).catch(error => console.log(error));
}

const DELETE_ACTIVITY = (activity_id) => {
  axios.delete('https://kyberkompas-database.herokuapp.com/activities/2/data').then(
    (response) => {
      console.log(response.data);
    }
  ).catch(error => console.log(error));
}

export {
    GET_CHALLENGES,
    GET_USERS
}