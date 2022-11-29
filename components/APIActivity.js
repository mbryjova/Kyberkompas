import React from "react";
import { View, Text, FlatList, Dimensions, StyleSheet, ScrollView } from "react-native";
import colors from "../assets/colors/colors";
import {
  post_to_url,
} from "../database/queries";
import { BOLD16, BOLD20, REGULAR16 } from "./atoms/typography";
import BigButton from "./BigButton";
import InputComp from "./InputComp";
//import { UserContext } from "../App";
//import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function APIActivity(props) {

  const [input, setInput] = React.useState(" ");

  /**
   * 1 - getting user input
   * 2 - finishig the activity
   * 3 - account doesnt exist - asi můžu smazat
   */
  const [status, setStatus] = React.useState(1);

  const [response, setResponse] = React.useState(null);

  const activity = props.route.params.activity;



  React.useEffect(() => {
    const setState = () => {
      if (response != null && response.achieved_score != null) {
        setStatus(2)
      }

    }
    setState()

  }, [response]);

  return (
    <View style={styles.container}>
      
        {/* title */}
        <Text style={[BOLD20, styles.title]}>{activity.title}</Text>

        {/* description */}
        <Text style={[REGULAR16, styles.description]}>
          {activity.description}
        </Text>
        <View style={{ width: "100%", marginTop: 5, marginBottom: 20 }}>
          <InputComp
            onChangeText={setInput}
            header=""
            name=""
            secureTextEmpty={false}
            source={require("../assets/images/lock.png")} // nevím co dát sem
            wrongInput={response != null ? (response.input == null ? [response.detail] : response.input) : null} // zatím null

            //error="Email cant be empty"
          />
        </View>

      {status == 3 ? (
        <View>
          <Text>doesnt exist</Text>
        </View>
      ) : null}
      {status == 1 ? (
        <View style={styles.button}>
          <BigButton
            name="zkontrolovat"
            onPress={async () => {
              //validate();
              //setValidate(true);
                await post_to_url(props.route.params.from_challenge ? 'challenges/'.concat(props.route.params.challenge_id).concat('/submit/') :
                  'interactive-activity/'.concat(activity.id).concat('/submit/'), // udělat i s challenges
                {input}, setResponse, setResponse);

                //setStatus(2);

              
            }}
          />

        </View>
      ) : null}
      {status == 2 ? (
        <View style={{ flex: 1, justifyContent: 'space-between', 
        //backgroundColor: colors.correct, 
        width: '100%'}}>
            <View
            style={{
              borderRadius: 16,
              backgroundColor:  response != null && activity.max_score == response.achieved_score ? colors.correct_light : colors.wrong_light,
              borderColor:  response != null && activity.max_score == response.achieved_score ? colors.correct_light : colors.wrong_light,
              //height: 150, // kdyby tady byly procenta tak se to mění
              width: "100%",
              padding: "6%",
              alignSelf: 'center'
            }}>
            <ScrollView
              
            >
              <Text style={REGULAR16}>
                {response != null ? response.message : null}
              </Text>
            </ScrollView>
            </View>

          <View style={{marginBottom: 40}}>
            <BigButton
              name="dokončit"
              onPress={() => {
                props.navigation.navigate("ActivityFinished", {
                  from_challenge: props.route.params.from_challenge,
                  points: response.achieved_score, // ošetřit, že není null
                  name: props.route.params.module_name,
                  max_points: response.achieved_score,
                  user_points: activity.user_activity != null && activity.user_activity.length != 0 ? activity.user_activity[0].score : 0
                  //max_points: props.route.params.from_challenge ? props.route.params.challenge_max_score : activity.max_score
                });
              }}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
}

export default APIActivity;

const styles = StyleSheet.create({
  container: {
    //backgroundColor: colors.correct_light,
    flex: 1,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center'
  },
  title: {
    marginTop: 50,
    textAlign: 'center'

  },
  description: {
    marginTop: 20 ,
    textAlign: 'center'
  },
  button: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 40,
    //flexDirection: 'column-reverse',
    //alignSelf: 'flex-end',
    //backgroundColor: colors.wrong,

  }
})
