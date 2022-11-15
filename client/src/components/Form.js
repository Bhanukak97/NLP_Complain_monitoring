import React from "react";
import { TextField, Button } from "@material-ui/core";

export const Form = ({ userInput, onFormChange, onFormSubmit }) => {
  const handleChange = (event) => {
    onFormChange(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onFormSubmit();
  };

  return (
    <div style={{ marginLeft: "50px", marginTop: "50px", marginRight: "50px" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter Your Complain"
          multiline="10"
          color="primary"
          variant="outlined"
          fullWidth
          value={userInput}
          onChange={handleChange}
        />
        <Button
          type="submit"
          style={{
            width: "100px",
            height: "50px",
            marginTop: "20px",
            marginLeft: "auto",
          }}
          variant="contained"
          color="primary"
        >
          Continue
        </Button>

        {/* <input type='textarea' required value={userInput} onChange={handleChange}></input>
            <input type="submit"></input> */}
      </form>
    </div>
  );
};

export default Form;
