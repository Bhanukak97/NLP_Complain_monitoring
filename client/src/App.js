import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import Card from "./components/Card/Card";
import CardHeader from "./components/Card/CardHeader";
import CardBody from "./components/Card/CardBody";
import GridItem from "./components/Grid/GridItem";
import GridContainer from "./components/Grid/GridContainer";
import Table from "./components/TabelData/Tabel";
import bulb from "./Assets/image/bulb.gif";

function App() {
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
      <h1 style={{ textAlign: "center" }}>{message.name}</h1>
      <div>
        <GridContainer style={{ padding: "30px", flexWrap: "unset" }}>
          <GridItem style={{ width: "100%" }}>
            <Form
              userInput={addData}
              onFormChange={handleFormChange}
              onFormSubmit={handleFormSubmit}
            />
            <Card style={{ marginTop: "100px" }}>
              <CardHeader
                style={{
                  textAlign: "center",
                  marginTop: "-50px",
                  backgroundColor: "#3f51b5",
                }}
              >
                <h2 style={{ color: "#fff" }}> Matching Category</h2>
              </CardHeader>

              {resultData.message ? (
                <CardBody>
                  <h2 style={{ textAlign: "center", marginTop: "20px" }}>
                    {resultData.message}
                  </h2>
                </CardBody>
              ) : (
                <img
                  style={{ align: "center" }}
                  width={"100%"}
                  height={"100%"}
                  src={bulb}
                  alt="loading..."
                />
              )}
            </Card>
          </GridItem>
          <GridItem>
            <Card>
              <CardHeader style={{ backgroundColor: "#3f51b5" }}>
                <h4 style={{ color: "#fff" }}>Sample Complains</h4>
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
