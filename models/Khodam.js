const mongoose = require('mongoose');

const KhodamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Khodam = mongoose.model('Khodam', KhodamSchema, 'khodams');

module.exports = Khodam;
