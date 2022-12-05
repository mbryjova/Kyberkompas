
import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import colors from '../assets/colors/colors';
import { BOLD15 } from './atoms/typography';

/**
 * 
 * @param {*} props 
 * @returns 
 */
function ValidationView(props) {
    return (
        <View style={[{backgroundColor: props.logicalValue == 1 ? colors.correct_light : colors.wrong_light,
            borderColor: props.logicalValue == 1 ? colors.correct : colors.wrong
        }, styles.validation]}>
        <View style={{flexDirection: 'row'}}>
            <Text style={[styles.textValidation, BOLD15]}>{props.logicalValue == 1 ? 'správně' : 'špatně'}</Text>
            <Image
            style={{marginLeft: '0%'}}
            source={props.logicalValue == 1 ? 
            (require('../assets/images/testIcons/check.png')) : (require('../assets/images/testIcons/cross.png'))}/>
        </View>
        </View>
    );
}

export default ValidationView;

const styles = StyleSheet.create({
    textValidation:
    {textTransform: 'uppercase',
    color: colors.blackText
},
    validation: {
        height: "100%",
        width: '100%',
        borderRadius: 100,
        //borderColor: colors.correct,
        //backgroundColor: colors.correct_light,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        //marginTop: '5%'
      },
})