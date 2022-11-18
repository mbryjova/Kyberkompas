

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