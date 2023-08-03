const express = require('express');
const router = express.Router();
const PetForm = require('../models/form');

// POST route to save pet form data
router.post('/users/pet-form', async (req, res) => {
  try {
    // const { userId } = req.params;
    const { user, difficulty, name, breed, sex, selectedPicture } = req.body;

    // Create a new instance of the PetForm model
    const petForm = new PetForm({
      user,
      difficulty,
      name,
      breed,
      sex,
      selectedPicture
    });

    // Save the pet form data
    await petForm.save();

    res.status(201).json({ message: 'Pet form data saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/users/:userId/pet-form', async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the pet form data for the specified user
    const petFormData = await PetForm.findOne({ user: userId });

    if (petFormData) {
      res.status(200).json(petFormData);
    } else {
      res.status(404).json({ error: 'Pet form data not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
