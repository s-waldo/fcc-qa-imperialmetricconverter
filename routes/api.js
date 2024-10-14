"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.get("/api/convert", (req, res) => {
    const userInput = req.query.input;
    const initNum = convertHandler.getNum(userInput);
    const initUnit = convertHandler.getUnit(userInput);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const string = convertHandler.getString(
      initNum,
      convertHandler.spellOutUnit(initUnit),
      returnNum,
      convertHandler.spellOutUnit(returnUnit)
    )
    if (!initNum || !initUnit || !returnNum || !returnUnit) {
      if (!initNum && !initUnit) {
        res.send('invalid number and unit')
        return
      }
      if (!initNum) res.send('invalid number')
      if (!initUnit) res.send('invalid unit')
      return
    }
    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    });
  });
};
