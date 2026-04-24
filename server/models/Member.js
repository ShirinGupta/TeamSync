const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  role: {
    type: String,
    required: [true, 'Please add a role'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  contact: {
    type: String,
    required: [true, 'Please add a contact number'],
  },
  image: {
    type: String,
    default: 'default.jpg',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Member', memberSchema);
