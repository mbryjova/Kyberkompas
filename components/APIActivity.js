
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import colors from '../assets/colors/colors';
import { BOLD20, REGULAR16 } from './atoms/typography';
import BigButton from './BigButton';
import InputComp from './InputComp';

function APIActivity(props) {

    const [input, setInput] = React.useState("");

    /**
     * 1 - getting user input
     * 2 - finishig the activity
     */
    const [status, setStatus] = React.useState(1);
    const [wrong, setWrong] = React.useState(false);

    const validate = () => {
        if (input.length == 0) {
            setWrong(true);
        }
    }
    return (
        <View>
            <View style={{alignItems: 'center', height: '30%', marginTop: '10%', 
            justifyContent: 'space-evenly', width: '90%', alignSelf: 'center'}}>
            <Text style={BOLD20}>
                Byl váš účet prolomen?
            </Text>

            <Text style={REGULAR16}>
            Zadejte email a zjistětě, zda byl váš učet někde prolomen.
            </Text>
            <View style={{width: '100%'}}>
            <InputComp
            onChangeText={setInput}
            header=""
            name=""
            secureTextEmpty={false}
            source={require("../assets/images/mail.png")}
            wrongInput={wrong}
            error="Email cant be empty"
            />
            </View>

            </View>

            {
                status == 1 ? (
                    <View style={{height: '70%', alignItems: 'center'}}>
                        <BigButton 
                        name="zkontrolovat"
                        onPress={() => {setStatus(2); validate()}}
                        />


                    </View>
                ) : (
                <View style={{height: '70%', alignItems: 'center'}}>
                    <View style={{borderRadius: 16, backgroundColor: colors.correct_light, 
                        borderColor: colors.correct_light, height: '40%', width: '90%', padding: '6%'}}>
                        <Text style={[BOLD20, {textTransform: 'uppercase', marginBottom: 10}]}>
                        chráněn
                        </Text>
                        <Text style={REGULAR16}>
                        Dobrý, žádný váš účet není evidovaný v databázi datových úniků.
                        </Text>

                    </View>
                    <View>
                    <BigButton 
                        name="dokončit"
                        onPress={() => setStatus(2)}
                        />

                    </View>

                </View>
                    )
            }
            
        </View>
    );
}

export default APIActivity;

const styles = StyleSheet.create({
    header: {

    }
})