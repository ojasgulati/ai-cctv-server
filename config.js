const errorCodes = {
  NUMBER_PLATE_NOT_FOUND: {
    code: 100,
    message: "Number Plate not found"
  },
  NUMBER_PLATE_MISSING: {
    code: 101,
    message: "Number Plate missing"
  }
};

const onSuccessfullyFound = message => {
  return {
    code: 200,
    message
  };
};

module.exports = { errorCodes,onSuccessfullyFound };
