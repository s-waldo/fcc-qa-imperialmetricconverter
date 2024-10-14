const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("should correctly read a whole number input", () => {
    assert.isOk(convertHandler.getNum("12gal"));
    assert.equal(12, convertHandler.getNum("12gal"));
  });
  test("should correctly read a decimal number input.", () => {
    assert.isOk(convertHandler.getNum("2.5l"));
    assert.equal(2.5, convertHandler.getNum("2.5l"));
  });
  test("should correctly read a fractional input.", () => {
    assert.isOk(convertHandler.getNum("1/2gal"));
    assert.equal(0.5, convertHandler.getNum("1/2gal"));
  });
  test("should correctly read a fractional input with a decimal.", () => {
    assert.isOk(convertHandler.getNum("2.5/5mi"));
    assert.equal(0.5, convertHandler.getNum("2.5/5mi"));
  });
  test("should correctly return an error on a double-fraction (i.e. 3/2/3).", () => {
    assert.notOk(convertHandler.getNum("2/3/7mi"));
    assert.isFalse(convertHandler.getNum("2/3/7mi"));
  });
  test("should correctly default to a numerical input of 1 when no numerical input is provided.", () => {
    assert.isOk(convertHandler.getNum("gal"));
    assert.equal(1, convertHandler.getNum("gal"));
  });
  test("should correctly read each valid input unit.", () => {
    assert.equal("L", convertHandler.getUnit("12l"));
    assert.equal("L", convertHandler.getUnit("12L"));
    assert.equal("gal", convertHandler.getUnit("12GAL"));
    assert.equal("gal", convertHandler.getUnit("12gal"));
    assert.equal("mi", convertHandler.getUnit("12mi"));
    assert.equal("mi", convertHandler.getUnit("12mI"));
    assert.equal("km", convertHandler.getUnit("12km"));
    assert.equal("kg", convertHandler.getUnit("12kg"));
    assert.equal("lbs", convertHandler.getUnit("12lbs"));
  });
  test("should correctly return an error for an invalid input unit.", () => {
    assert.isFalse(convertHandler.getUnit("42kilomo"));
    assert.notEqual("mi", convertHandler.getUnit("121miles"));
  });
  test("should return the correct return unit for each valid input unit.", () => {
    assert.equal("L", convertHandler.getReturnUnit("gal"));
    assert.equal("gal", convertHandler.getReturnUnit("L"));
    assert.equal("mi", convertHandler.getReturnUnit("km"));
    assert.equal("km", convertHandler.getReturnUnit("mi"));
    assert.equal("kg", convertHandler.getReturnUnit("lbs"));
    assert.equal("lbs", convertHandler.getReturnUnit("kg"));
  });
  test("should correctly return the spelled-out string unit for each valid input unit.", () => {
    assert.equal("liters", convertHandler.spellOutUnit("L"));
    assert.equal("gallons", convertHandler.spellOutUnit("gal"));
    assert.equal("miles", convertHandler.spellOutUnit("mi"));
    assert.equal("kilometers", convertHandler.spellOutUnit("km"));
    assert.equal("kilograms", convertHandler.spellOutUnit("kg"));
    assert.equal("pounds", convertHandler.spellOutUnit("lbs"));
  });
  test("should correctly convert gal to L.", () => {
    assert.equal(3.78541, convertHandler.convert(1, "gal"));
    assert.equal(11.35623, convertHandler.convert(3, "gal"));
  });
  test("should correctly convert L to gal.", () => {
    assert.equal(0.26417, convertHandler.convert(1, "L"));
    assert.equal(1, convertHandler.convert(3.78541, "L"));
  });
  test("should correctly convert mi to km.", () => {
    assert.equal(1.60934, convertHandler.convert(1, "mi"));
    assert.equal(4.98895, convertHandler.convert(3.1, "mi"));
  });
  test("should correctly convert km to mi.", () => {
    assert.equal(0.62137, convertHandler.convert(1, "km"));
    assert.equal(3.10686, convertHandler.convert(5, "km"));
  });
  test("should correctly convert lbs to kg.", () => {
    assert.equal(0.45359, convertHandler.convert(1, "lbs"));
    assert.equal(7.16675, convertHandler.convert(15.8, "lbs"));
  });
  test("should correctly convert kg to lbs.", () => {
    assert.equal(1, convertHandler.convert(0.45359, "kg"));
    assert.equal(15.43237, convertHandler.convert(7, "kg"));
  });
});
