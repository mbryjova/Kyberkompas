import React from 'react';
import { View, Text, Image } from 'react-native';
import colors from '../assets/colors/colors';
import { BOLD23, BOLD32, SEMIBOLD16 } from './atoms/typography';
import BigButton from './BigButton';

function ActivityFinished(props) {

    return (
        <View>
            <Image source={require('../assets/images/finished_icon.png')}>

            </Image>
            <Text style={[BOLD32, {color: colors.primary}]}>
                {"+" + props.route.params.points}
            </Text>

            <View>
                <Text style={BOLD23}>
                    Aktivita dokončena!
                </Text>
                <Text style={SEMIBOLD16}>
                Podívejte se na další aktivity v sekci znalosti.
                </Text>
            </View>

            <BigButton
                name="zpět do znalostí"
                onPress={() => props.navigation.navigate('TabNavigator', {screen: 'SkillTree'})}
            />
        </View>
    );
}

export default ActivityFinished;