import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import Card from "./components/Card/Card";
import CardHeader from "./components/Card/CardHeader";
import CardBody from "./components/Card/CardBody";
import GridItem from "./components/Grid/GridItem";
import GridContainer from "./components/Grid/GridContainer";
import Table from "./components/TabelData/Tabel";
import bulb from "./Assets/image/bulb.gif";
import fear from "./Assets/image/fear.png";
import anger from "./Assets/image/anger.png";
import love from "./Assets/image/love.png";
import joy from "./Assets/image/joy.png";
import sad from "./Assets/image/sad.png";
import surprise from "./Assets/image/surprise.png";

function App() {
  const [message, setMessage] = useState([{}]);
  const [addData, setAddData] = useState("");
  const [resultData, setResultData] = useState([{}]);

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
        Text: addData,
      }),
      headers: {
        "Content-type": "application.json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((message) => setResultData(message), setAddData(""));
  };

  const selectImage = (text) => {
    if (text === "sadness") {
      return (
        <img
          style={{ align: "center" }}
          width={"100%"}
          height={"100%"}
          src={sad}
          alt="loading..."
        />
      );
    }
    if (text === "anger") {
      return (
        <img
          style={{ align: "center" }}
          width={"100%"}
          height={"100%"}
          src={anger}
          alt="loading..."
        />
      );
    }
    if (text === "love") {
      return (
        <img
          style={{ align: "center" }}
          width={"100%"}
          height={"100%"}
          src={love}
          alt="loading..."
        />
      );
    }
    if (text === "fear") {
      return (
        <img
          style={{ align: "center" }}
          width={"100%"}
          height={"100%"}
          src={fear}
          alt="loading..."
        />
      );
    }
    if (text === "joy") {
      return (
        <img
          style={{ align: "center" }}
          width={"100%"}
          height={"100%"}
          src={joy}
          alt="loading..."
        />
      );
    }
    if (text === "surprise") {
      return (
        <img
          style={{ align: "center" }}
          width={"100%"}
          height={"100%"}
          src={surprise}
          alt="loading..."
        />
      );
    }
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
                <h2 style={{ color: "#fff" }}> My Emotion</h2>
              </CardHeader>

              {resultData.message ? (
                <CardBody>
                  <h2
                    style={{
                      textAlign: "center",
                      marginTop: "0px",
                    }}
                  >
                    {selectImage(resultData.message)}
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
                <h4 style={{ color: "#fff" }}>Sample Emotion Explanations</h4>
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
