
import axios from "axios";

const GET_CHALLENGES = async (setter) => {
    console.log("here2");
     await axios.get('https://kyberkompas-database.herokuapp.com/challenges')
      .then((response) => {
        console.log(response.data);
        setter(response.data);
        //console.log(challenges);
      }).catch(error => console.log(error));
}

const GET_USERS = async (setter) => {
  //console.log("here");
    await axios.get('https://kyberkompas-database.herokuapp.com/users')
    .then((response) => {
      console.log(response.data);
      setter(response.data);
      //console.log(challenges);
    }).catch(error => console.log(error));
}

const POST_USER = () => {
  axios.post('https://kyberkompas-database.herokuapp.com/users')
  .then((response) => {
    console.log(response.data);
    //setter(response.data);
    //console.log(challenges);
  }).catch(error => console.log(error));
}

const PUT_USER = (user) => {
  axios.put('https://kyberkompas-database.herokuapp.com/users/'.concat(user.id))
  .then((response) => {
    console.log(response.data);
    setter(response.data);
    //console.log(challenges);
  }).catch(error => console.log(error));
}

const PUT_PHOTO = (user_id, user) => {
  axios.put('https://kyberkompas-database.herokuapp.com/users/'.concat(user_id), user).then(
    (response) => {
      console.log(response.data);
    }
  ).catch(error => console.log(error));
}

const POST_ACTIVITY = (activity, id) => {
  axios.put('https://kyberkompas-database.herokuapp.com/activities/'.concat(id), activity).then(
    (response) => {
      console.log(response.data);
    }
  ).catch(error => console.log(error));
}


const GET_ACTIVITIES = (setter) => {
  //console.log("here");
    axios.get('https://kyberkompas-database.herokuapp.com/activities')
    .then((response) => {
      console.log(response.data);
      setter(response.data);
      //console.log(challenges);
    }).catch(error => console.log(error));
}

export {
    GET_CHALLENGES,
    GET_USERS,
    PUT_PHOTO,
    GET_ACTIVITIES,
    POST_ACTIVITY,
    POST_USER,
    PUT_USER
}