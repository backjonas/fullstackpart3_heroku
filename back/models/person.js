const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });


const validateNumber = (number) => {
  const regexp = /(^\d{2}-\d{6,}$)|(^\d{3}-\d{5,}$)/;
  return regexp.test(number);
};

const personSchema = new mongoose.Schema({
  name: {
    type:  String,
    minLength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    validate: {
      validator: (v) => validateNumber(v),
      message: props => `${props.value} is not a valid phone number`
    },
    required: true
  }
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Person', personSchema);
