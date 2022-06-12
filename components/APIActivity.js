
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
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

    return (
        <View>
            <View style={{justifyContent: 'center'}}>
            <Text style={BOLD20}>
                Byl váš účet prolomen?
            </Text>

            <Text style={REGULAR16}>
            Zadejte email a zjistětě, zda byl váš učet někde prolomen.
            </Text>
            <View style={{width: '90%'}}>
            <InputComp
            onChangeText={setInput}
            header=""
            name=""
            secureTextEmpty={false}
            source={require("../assets/images/mail.png")}
            wrongInput={false}
            error=""
            />
            </View>

            </View>

            {
                status == 1 ? (
                    <BigButton 
                    name="zkontrolovat"
                    onPress={() => setStatus(2)}
                    />
                ) : (
                <View>
                    <View>

                    </View>
                    <BigButton 
                        name="dokončit"
                        onPress={() => setStatus(2)}
                        />

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