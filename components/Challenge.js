
import React from 'react';
import colors from '../assets/colors/colors';
import { StyleSheet, ScrollView, Text, Image, View } from 'react-native';
import { EXTRABOLD12, BOLD25, REGULAR16, BOLD15 } from './atoms/typography';
import BigButton from './BigButton';
import axios from "axios";


function Challenge({route, navigation}) {

    const markAsFinished = () => {
        axios.post('https://kyberkompas-database.herokuapp.com/challenges', 
        {"id": route.params.item.id,
        "date_from": route.params.item.date_from,
        "date_to": route.params.item.date_to,
        "point_amount": route.params.item.point_amount,
        "title": route.params.item.title,
        "description": route.params.item.description,
        "image": route.params.item.image,
        "finished": 1,
        "challenge": route.params.item.challenge}
        
       )
      .then((response) => {
        console.log(response);
        //setModules(response.data);
        //console.log(modules);
      }).catch(error => console.log(error));
      
    }

    const image_source = '../assets/images/challenge_clock.png' // ikonka, odkaz asi budu mít, když jde o stálou ikonku, nebo pasnu jako parametr
    const button_name="výzva dokončena";
    const parameters = route.params;
    return (
        <View style={{flex: 1}}>
        <ScrollView style={{paddingTop: "4%"}}>
            <View style={{padding: '4%', backgroundColor: colors.wrong}}>
            <View style={{ backgroundColor: colors.correct}}>
            <Text style={[EXTRABOLD12]}>{parameters.date_from}</Text>
            <Text style={[BOLD25]}>{parameters.name}</Text>

            </View>

            <Text style={[REGULAR16, styles.textStyle]}>{parameters.description}</Text>

            <View style={{alignItems: 'center', height: '15%', justifyContent: 'space-between'}}>
            <Image style={{alignSelf: 'center'}} source={require(image_source)}/>
            <Text style={BOLD15}>{parameters.challenge.time} MIN</Text>

            </View>
            
            
            {parameters.challenge.textboxes.map(txt => 
            <View style={{width: "100%"
            }}>
                <Text style={[REGULAR16, styles.textStyle]}>{txt}</Text>

            </View>
            
            )}

            
            <BigButton
            name={button_name}
            // plus ještě tam musí být funkcionalita co přičte body za výzvu, 
            // pošlu do parent komponenty?
            onPress={() => {navigation.goBack(); markAsFinished()}}
            />

            </View>
        </ScrollView>

        </View>
    );
}

export default Challenge;

const styles = StyleSheet.create({
    textStyle: {
        marginBottom: "4%", marginTop: "4%"
    }
})