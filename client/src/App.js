import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import Card from "./components/Card/Card";
import CardHeader from "./components/Card/CardHeader";
import CardBody from "./components/Card/CardBody";
import GridItem from "./components/Grid/GridItem";
import GridContainer from "./components/Grid/GridContainer";
import Table from "./components/TabelData/Tabel";

function App() {
  // const [data, setData] = useState([{}]);
  const [message, setMessage] = useState([{}]);
  const [addData, setAddData] = useState("");
  const [resultData, setResultData] = useState([{}]);
  console.log("resultData", resultData);

  useEffect(() => {
    fetch("/api")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => setMessage(data));
  }, []);

  // useEffect(() => {
  //   fetch("/members")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //       console.log(data);
  //     });
  // }, []);

  // useEffect(() => {
  //   fetch("/home")
  //     .then((res) => res.json())
  //     .then((value) => setMessage(value));
  // }, []);

  const handleFormChange = (inputValue) => {
    setAddData(inputValue);
  };

  const handleFormSubmit = () => {
    fetch("/api/predict", {
      method: "POST",
      body: JSON.stringify({
        Message: addData,
      }),
      headers: {
        "Content-type": "application.json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((message) => setResultData(message), setAddData(""));
  };

  return (
    <div>
      <h1>{message.name}</h1>
      <h2 style={{ marginLeft: "500px", marginTop: "20px" }}>
        Matching Category is: {resultData.message}
      </h2>

      <Form
        userInput={addData}
        onFormChange={handleFormChange}
        onFormSubmit={handleFormSubmit}
      />
      <div>
        <GridContainer style={{ padding: "100px" }}>
          <GridItem>
            <Card>
              <CardHeader color="primary">
                <h4>Sample Complains</h4>
              </CardHeader>
              <CardBody>
                <Table />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}

export default App;
