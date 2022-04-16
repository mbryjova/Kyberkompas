
import React from 'react';
import colors from '../assets/colors/colors';
import { StyleSheet, ScrollView, Text, Image } from 'react-native';
import { EXTRABOLD12, BOLD25, REGULAR16 } from './atoms/typography';
import BigButton from './BigButton';


function Challenge({route, navigation}) {
    const image_source = '../assets/images/challenge_icon.png' // ikonka, odkaz asi budu mít, když jde o stálou ikonku, nebo pasnu jako parametr
    const button_name="výzva dokončena";
    const parameters = route.params;
    return (
        <ScrollView>
            <Text style={[EXTRABOLD12]}>{parameters.date_from}</Text>
            <Text style={[BOLD25]}>{parameters.name}</Text>
            <Text style={[REGULAR16]}>{parameters.description}</Text>
            <Image source={require(image_source)}/>
            {/* <Text>{props.navigation.getParam('body')}</Text> */}
            <BigButton
            name={button_name}
            // plus ještě tam musí být funkcionalita co přičte body za výzvu, 
            // pošlu do parent komponenty?
            onPress={() => {navigation.goBack(); }}
            />
        </ScrollView>
    );
}

export default Challenge;

const styles = StyleSheet.create({
    
})