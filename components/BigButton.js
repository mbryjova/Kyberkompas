
import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';

import colors from '../assets/colors/colors';

/*
Component representing the big yellow button
*/

function BigButton(text, navigation) {
    return (
        <View style={styles.view}>
            <Pressable style={styles.container} onPress={() => props.navigation.navigate({navigation})}>
                <Text style={styles.title}>
                    {text}
                </Text>
            </Pressable>
            
        </View>
    );
}

export default BigButton;

const styles = StyleSheet.create({
    view: {
        justifyContent: "center",
        alignItems: 'center'
    },
    container: {
        width: 335,
        height: 52,
        borderRadius: 50,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: 'center',
        borderColor: colors.blackText,
        borderWidth: 0.5
    },
    title: {
        textAlign: "center",
        // fontFamily: "MulishBold"
        fontSize: 16
    }
})