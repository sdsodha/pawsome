const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;
// Define the schema for the form data
const petFormSchema = new mongoose.Schema({
  user: {type: ObjectId,ref: 'User'},
  difficulty: { type: String, required: true },
  name: { type: String, required: true },
  breed: { type: String, required: true },
  sex: { type: String, required: true },
  selectedPicture: { type: String, required: true },
});

// Create the model using the schema
const PetForm = mongoose.model('PetForm', petFormSchema);

module.exports = PetForm;
