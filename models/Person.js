const mongoose = require("mongoose");
const validator = require("validator");
const _ = require("lodash");
const bcrypt = require("bcryptjs");

var PersonSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email"
    }
  },
  password: {
    type: String,
    require: true,
    minlength: [6, "min length required is 6"]
  },
  vehicleNo: {
    type: String,
    required: true
  },
  flatNo: {
    type: String,
    required: true
  },
  buildingNo: {
    type: String,
    required: true
  }
});

PersonSchema.methods.toJSON = function() {
  var person = this;
  var personObject = person.toObject();

  return _.pick(personObject, ["email", "vehicleNo", "flatNo", "buildingNo"]);
};

PersonSchema.pre("save", function(next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

var Person = mongoose.model("Person", PersonSchema);

module.exports = Person;
