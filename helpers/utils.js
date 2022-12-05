
/**file for helper functions */


/**
 * @param {*} question_id id of answered question
 * @param {*} answer_id id of the answer
 * @param {*} submit list of object to be submited to server
 * @param {*} setSubmit setter for the submit state of activities
 * 
 * function for creating the submit list in correct format
 * used by InteractiveReading, Quiz, YesOrNo
 */
const AddAnswer = (question_id, answer_id, submit, setSubmit) => {
    let list = submit;
    list.push( {
      "question_id": question_id,
      "correct_answers_ids": [answer_id]
    })
    setSubmit(list)
  }

  export {
    AddAnswer
  }