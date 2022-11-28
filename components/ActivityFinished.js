import React from 'react';
import { View, Text, Image } from 'react-native';
import colors from '../assets/colors/colors';
import { BOLD23, BOLD32, SEMIBOLD16 } from './atoms/typography';
import BigButton from './BigButton';

function ActivityFinished(props) {

    return (
        <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
            <View style={{margin: '8%'}}>
            <Image source={require('../assets/images/finished_icon.png')}>

            </Image>

            </View>
            <Text style={[BOLD32, {color: colors.primary, marginBottom: '5%'}]}>
                {"+ " + Math.round(props.route.params.points) + " b"}
            </Text>

            <View style={{alignItems: 'center', flex: 2, width: '91%'}}>
                { props.route.params.points == props.route.params.max_points ? ( <Text style={[BOLD23, {marginBottom: '5%'}]}>
                    Aktivita dokončena!
                </Text>) : (
                    <Text style={[BOLD23, {marginBottom: '5%', textAlign: 'center'}]}>
                    Na dokončení aktivity chybí {Math.round(props.route.params.max_points - props.route.params.points)} b.
                </Text>
                )}
                <Text style={[SEMIBOLD16, {textAlign: 'center'}]}>
                Podívejte se na další aktivity.
                </Text>
            </View>
            <View style={{flex: 1}}>
            <BigButton
                //name={props.route.params.from_challenge ? "na další výzvy" : "na další aktivity"}
                name="na další aktivity"
                onPress={() => 
                    props.route.params.from_challenge ? props.navigation.navigate('Výzvy') :
                    props.navigation.navigate('Module', {name: props.route.params.name})
                }
                // sem dát přičtení skore a dání aktivity do dokončených?
                //onPress={() => props.navigation.navigate('TabNavigator', {screen: 'SkillTree'})}
            />

            </View>
        </View>
    );
}

export default ActivityFinished;