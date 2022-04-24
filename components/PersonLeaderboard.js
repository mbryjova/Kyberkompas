
import React from 'react';
import {View, FlatList, Image, Text} from "react-native";

function PersonLeaderboard(props) {
    /**
     * 1 - týden
     * 2 - měsíc
     * 3 - rok
     */
    const [currentState, setCurrentState] = React.useState(1)
    const data = require("../data/db.json").users;

    const renderPerson = ({item}) => {
        return (
            <View style={{height: 56, width: "90%", flexDirection: "row"}}>
                <Image source={require("../assets/images/person1.png")}
                    style={{borderRadius: 12, height: "100%", width: {height}}}
                />
                <View>
                <Text>
                    {item.first_name} + {item.last_name}
                </Text>
                <Text>
                    Celkem: + {item.total_score}
                </Text>
                </View>
                <Text>
                    {currentState == 1 && (item.weekly_score)}
                    {currentState == 2 && (item.montly_score)}
                    {currentState == 3 && (item.anual_score)}
                </Text>
            </View>
        );
    }

    return (
        <View style={{flex: 1}}>
            <View style={{flex: 1}}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={renderPerson}
                    contentContainerStyle={{alignItems: 'center'}}
                
                />
            </View>
            
        </View>
    );
}

export default PersonLeaderboard;