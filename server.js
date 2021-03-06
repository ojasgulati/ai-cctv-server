require("./db/mongoose");
const { errorCodes, onSuccessfullyFound } = require("./config");
const Person = require("./models/Person");
const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");

var app = express();

const PORT = 80;
app.use(cors());

app.use(bodyParser.json());

app.post("/searchForNumberPlate", async (req, res) => {
  console.log(req.body.vehicleNo);
  try {
    if (!req.body.vehicleNo) throw new Error(errorCodes.NUMBER_PLATE_MISSING);
    let person = await Person.findOne({ vehicleNo: req.body.vehicleNo });
    if (!person) {
      console.log("ojas");
      throw new Error(JSON.stringify(errorCodes.NUMBER_PLATE_NOT_FOUND));
    }
    res.status(200).send(onSuccessfullyFound(person));
  } catch (e) {
    console.log(e);
    res.status(404).send(e.message);
  }
});

app.post("/signup", async (req, res) => {
  try {
    let person = new Person({
      ...req.body
    });
    person
      .save()
      .then(() => {
        res.status(200).send(person);
      })
      .catch(e => {
        console.log(e);
        res.status(404).send(e.message);
      });
  } catch (e) {
    console.log(e);
    res.status(404).send(e.message);
  }
});

app.listen(PORT, () => {
  console.log("server started at port " + PORT);
});
