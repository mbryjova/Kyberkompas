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
                {"+" + props.route.params.points}
            </Text>

            <View style={{alignItems: 'center', flex: 2, width: '91%'}}>
                <Text style={[BOLD23, {marginBottom: '5%'}]}>
                    Aktivita dokončena!
                </Text>
                <Text style={[SEMIBOLD16, {textAlign: 'center'}]}>
                Podívejte se na další aktivity v sekci znalosti.
                </Text>
            </View>
            <View style={{flex: 1}}>
            <BigButton
                name="zpět do znalostí"
                onPress={() => props.navigation.navigate('TabNavigator', {screen: 'SkillTree'})}
            />

            </View>
        </View>
    );
}

export default ActivityFinished;