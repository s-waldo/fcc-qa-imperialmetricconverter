function ConvertHandler() {
  //#region GET NUM FUNC
  this.getNum = function (input) {
    let seenFraction = false;
    let i = 0;
    while (i < input.length) {
      if (seenFraction && input[i] === "/") {
        return false;
      }
      if (input[i] === "/") {
        seenFraction = true;
      }
      if (
        input[i].toLowerCase() === "l" ||
        input[i].toLowerCase() === "g" ||
        input[i].toLowerCase() === "k" ||
        input[i].toLowerCase() === "m"
      ) {
        break;
      }
      i++;
    }
    if (i === 0) return 1;
    let result = input.slice(0, i);
    if (seenFraction) {
      let split = result.split("/");
      result = Number(split[0]) / Number(split[1]);
      return result;
    }
    return Number(result);
  };
  //#endregion

  //#region GET UNIT FUNC
  this.getUnit = function (input) {
    let i = 0;
    while (i < input.length) {
      if (
        input[i].toLowerCase() === "l" ||
        input[i].toLowerCase() === "g" ||
        input[i].toLowerCase() === "k" ||
        input[i].toLowerCase() === "m"
      ) {
        break;
      }
      i++;
    }
    let result = input.slice(i, input.length).toLowerCase();
    if (result === "gal") {
      result = "gal";
      return result;
    }
    if (result === "l") {
      result = "L";
      return result;
    }
    if (result === "mi") {
      result = "mi";
      return result;
    }
    if (result === "km") {
      result = "km";
      return result;
    }
    if (result === "lbs") {
      result = "lbs";
      return result;
    }
    if (result === "kg") {
      result = "kg";
      return result;
    }

    return false;
  };
  //#endregion

  //#region GET RETURN UNIT FUNC
  this.getReturnUnit = function (initUnit) {
    let result;
    if (initUnit === "gal") {
      result = "L";
      return result;
    }
    if (initUnit === "L") {
      result = "gal";
      return result;
    }
    if (initUnit === "mi") {
      result = "km";
      return result;
    }
    if (initUnit === "km") {
      result = "mi";
      return result;
    }
    if (initUnit === "lbs") {
      result = "kg";
      return result;
    }
    if (initUnit === "kg") {
      result = "lbs";
      return result;
    }
    return false;
  };
  //#endregion

  //#region SPELL OUT UNIT FUNC
  this.spellOutUnit = function (unit) {
    const units = {
      L: "liters",
      gal: "gallons",
      mi: "miles",
      km: "kilometers",
      kg: "kilograms",
      lbs: "pounds",
    };
    let result = units[unit];
    return result;
  };
  //#endregion

  //#region CONVERT FUNC
  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    if (initUnit === "L") {
      result = initNum / galToL;
      return parseFloat(result.toFixed(5));
    }
    if (initUnit === "gal") {
      result = initNum * galToL;
      return parseFloat(result.toFixed(5));
    }
    if (initUnit === "mi") {
      result = initNum * miToKm;
      return parseFloat(result.toFixed(5));
    }
    if (initUnit === "km") {
      result = initNum / miToKm;
      return parseFloat(result.toFixed(5));
    }
    if (initUnit === "kg") {
      result = initNum / lbsToKg;
      return parseFloat(result.toFixed(5));
    }
    if (initUnit === "lbs") {
      result = initNum * lbsToKg;
      return parseFloat(result.toFixed(5));
    }
    return false;
  };
  // #endregion

  //#region GET STRING FUNC
  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;

    return result;
  };
  //#endregion
}

module.exports = ConvertHandler;
