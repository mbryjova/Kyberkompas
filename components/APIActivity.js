
import React from 'react';
import { View, Styles } from 'react-native';
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
            <Text style={BOLD20}>
                Byl váš účet prolomen?
            </Text>

            <Text style={REGULAR16}>
            Zadejte email a zjistětě, zda byl váš učet někde prolomen.
            </Text>
            <InputComp
            onChangeText={setInput}
            header=""
            name=""
            secureTextEmpty={false}
            source={require("../assets/images/mail.png")}
            wrongInput={false}
            error=""
            />

            {
                status == 1 ? (
                    <BigButton 
                    name="zkontrolovat"
                    onPress={() => setStatus(2)}
                    />
                ) : null
            }

            



            
        </View>
    );
}

export default APIActivity;

const styles = StyleSheet.create({
    header: {

    }
})