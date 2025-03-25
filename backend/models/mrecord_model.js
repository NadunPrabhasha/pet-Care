const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
  petName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  diagnosis: {
    type: String,
    required: true
  },
  treatment: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  }
});

const MedicalRecord = mongoose.model('MedicalRecord', medicalRecordSchema);

module.exports = MedicalRecord;
