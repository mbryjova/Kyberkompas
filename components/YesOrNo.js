
import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { BOLD15, BOLD20, REGULAR16 } from './atoms/typography';
import colors from '../assets/colors/colors';

function YesOrNo(props) {

    const {height, width} = Dimensions.get("window");
    const [currentIndex, setCurrentIndex] = React.useState(2);
    /**
     * 1 - question
     * 2 - explanation
     * 3 - last question
     */
    const [currentState, setCurrentState] = React.useState(1);

    const data = require("../data/db.json").tinder_swipe;

    const Button = (props) => {
        return (
            <TouchableOpacity style={{width: "40%", height: "100%", backgroundColor: props.color, borderRadius: 100,
            justifyContent: "center", alignItems: "center", borderColor: props.borderColor, borderWidth: 0.5
            }}
            onPress={props.onPress}
            >
                <Text style={[BOLD15, {color: props.textColor, textTransform: "uppercase"}]}>
                    {props.name}
                </Text>
            </TouchableOpacity>
        )

    }

    return (
        <View style={{flex: 1}}>
            
                {currentState == 1 && 
                    (   <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between',
                    backgroundColor: colors.blackText
                    }}>
                        <View style={styles.questionWrapper}>
                            <View style={styles.textWrapper}>
                            <Text style={[BOLD20, {marginBottom: "9%"}]}>
                                Jde o správné tvrzení?
                            </Text>
                            <Text style={REGULAR16}>
                                {data[currentIndex].question.text}
                            </Text>

                            </View>
                            <Image style={styles.image} source={require("../assets/images/yesno_1.png")}

                            />
                        </View>
                        <View style={styles.buttonWrapper}>
                                <Button name={data[currentIndex].options[1].text} 
                                color={colors.wrong_light}
                                textColor={colors.wrong}
                                borderColor={colors.wrong}
                                />

                                
                                <Button name={data[currentIndex].options[0].text} color={colors.correct_light}
                                textColor={colors.blackText}
                                borderColor={colors.correct}
                                
                                />

                                
                            </View>
                        </View>
                    )

                }

                {currentState == 2 && 
                    (
                        <View> </View>
                    )
                }
                {currentState == 3 && 
                    (
                        <View></View>
                    )
                }
            
            
        </View>
    );
}

export default YesOrNo;

const styles = StyleSheet.create({
    image: {
        marginTop: "4%"
    },
    buttonWrapper: {
        flexDirection: 'row',
        backgroundColor: colors.wrong,
        height: "7%",
        width: "90%",
        justifyContent: "space-between",
        marginBottom: "16%"
    },
    questionWrapper: {
        marginTop: "8%",
        backgroundColor: colors.correct, 
        height: "70%", 
        width: "91%",
        borderRadius: 16,
        alignItems: 'center',
        borderColor: colors.blackText,
        borderWidth: 0.5
    },
    textWrapper: {
        backgroundColor: colors.primary,
        height: "30%",
        width: "90%",
        marginTop: "4%"

    }
})