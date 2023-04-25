import React from 'react';
import { useState } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { useNavigate } from "react-router-dom";

const NewQuestion = ({dispatch}) => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const question = {
      optionOne: inputs.optionOne,
      optionTwo: inputs.optionTwo,
    }
    dispatch(handleAddQuestion(question))

    setInputs({})
    navigate("/");
  }

  return (
    <div>
      <h3 className="center">Create Your Own Poll</h3>
      <form onSubmit={handleSubmit} className="new-question">
        <h4 className="center">First Option:</h4>
          <input 
            className="textarea"
            type="text" 
            name="optionOne"
            value={inputs.optionOne || ""}
            onChange={handleChange}
            placeholder="Option One"
          />
        <h4 className="center">Second Option:</h4>
          <input
            className="textarea" 
            type="text" 
            name="optionTwo" 
            value={inputs.optionTwo || ""} 
            onChange={handleChange}
            placeholder="Option Two"
          />
        <button className="btn" type="submit" disabled={!inputs.optionOne || !inputs.optionTwo}>
          Submit
        </button>
      </form>
    </div>
  )
}

export default connect()(NewQuestion);