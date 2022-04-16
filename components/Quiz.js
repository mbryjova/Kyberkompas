
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import colors from '../assets/colors/colors';
import BigButton from './BigButton';
import * as Progress from 'react-native-progress';
import { BOLD20, BOLD15 } from './atoms/typography';

function Quiz(props) {
    
    const allQuestions = require("../data/db.json").test_data;
    /** state which contains the index of current question */
    const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);

    /**state which contains which option of the current question is selected */
    const [currentOptionSelected, setCurrentOptionSelected] = React.useState(null);
    
    /** */
    const [correct, setCorrect] = React.useState(false);

    /**state which contains the number of points */
    const [points, setPoints] = React.useState(0);

    /** state of the quiz:
     * 1 - question
     * 2 - explanation
     * 3 - last question
    */

    const [quizState, setQuizState] = React.useState(1);

    const [explanation, setExplanation] = React.useState(false);

    const renderQuestion = () => {
        return (
        <View style={{}}>
            <Text style={BOLD20}>
                {allQuestions[currentQuestionIndex].question}
            </Text>
        </View>

        )
    };

    
    const renderOption = () => {
        return (
            <View style={{width: '81%', height: '30%', backgroundColor: colors.correct}}>
                {
                    allQuestions[currentQuestionIndex].options.map(option => 
                        (<TouchableOpacity
                           key={option}
                           onPress={() => {setCurrentOptionSelected(option); console.log(option)}} // nastavím jako selected option
                        >
                            {/**na co chci namapovat každou option, on press se změní barva políčka */}
                            {/* <View style={{width: '100%', height: '25%', borderRadius: 100, borderWidth: 0.5, borderColor: colors.blackText}}>

                            </View> */}

                            <Text style={BOLD15}>
                                {option}
                            </Text>

                        </TouchableOpacity>)
                        )
                }
            </View>

        )
    };

    const validate = () => {

        console.log("in validate");
        if (currentOptionSelected !== null) {
            if (allQuestions[currentQuestionIndex].correct === currentOptionSelected) {
                // přičti body
                setPoints(points + 1); // je o jeden krok napřed
                setCorrect(true); // podle toho se potom rendruje jestli je tam napsaný správně nebo špatně
                // mělo by se zablokovat dát jinou možnost 
    
                //console.log(points);
            }
            console.log("after if");
            console.log(points);
            setQuizState(2); // explanation
    
            //setExplanation(true); // místo explanation dát obecný state toho testu

        }

    }

    const nextQuestion = () => {

        //setCurrentQuestionIndex(currentQuestionIndex + 1);
        //setExplanation(false);

        /** pokud je další otázka poslední, potom nastavím state na poslední otázku */
        { currentQuestionIndex + 1 == allQuestions.length ? 
            (setQuizState(3)) : (
                setCurrentQuestionIndex(currentQuestionIndex + 1),
                setQuizState(1))
        }
    }

    const finish = () => {

    }

    return (
        
        <View style={{alignItems: 'center', alignContent: 'center', backgroundColor: colors.wrong, flex: 1}}>

            {/**Question */}
            <View style={{flex: 1}}>
            {renderQuestion()}

            </View>

            {/**Options */}
            {/* {
                explanation ? (<Text> {allQuestions[currentQuestionIndex].explanation} </Text>) : (renderOption())
            } */}

            {/**Validate answer/next button height: '56%', width: '89%'*/}

            {
                quizState == 1 && 
                <View  style={{backgroundColor: colors.correct, flex: 2}}>
                    {renderOption()}
                    <Progress.Bar
            progress={0.3}
            />
                    <View style={{}}>
                    <BigButton
                    name="zkontrolovat"
                    onPress={() => validate()} // {validate}
                    />

                    </View>
                </View>
            }
            {
                quizState == 2 && 
                <View>
                    <Text>

                    {allQuestions[currentQuestionIndex].explanation}
                    </Text>
                    <Progress.Bar
            progress={0.3}
            />
                    <View style={{backgroundColor: colors.wrong}}>
                    <BigButton
                    name="na další otázku"
                    onPress={() => nextQuestion()} // {next question} // potom už se ale nepůjde vracet
                    />

                        </View>
                </View>
                
            }

            {
                quizState == 3 && <BigButton
                name="dokončit"
                onPress={() => props.navigation.navigate("ActivityFinished", {points: points})}
                />
            }

            {/* {
                explanation ? (<BigButton
                    name="na další otázku"
                    onPress={() => nextQuestion()} // {next question} // potom už se ale nepůjde vracet
                    />) : (
                        <BigButton
                    name="zkontrolovat"
                    onPress={() => validate()} // {validate}
                    />
                        
                    )
            } */}
            


            {/**Progress bar */}
            
                
            
            
        </View>
    );
}

export default Quiz;