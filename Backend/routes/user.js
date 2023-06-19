// routes/user.js

const express = require('express');
const router = express.Router();
const User = require('../models/users');

// router.post('/users', async (req, res) => {
//   try {
//     const {  email, uid } = req.body;

//     const newUser = new User({
//      uid,
//       email
//     });

//     await newUser.save();

//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

router.post('/users', async (req, res) => {
    try {
      const { email, uid } = req.body;
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      const newUser = new User({
        uid,
        email
      });
  
      await newUser.save();
  
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });  

  router.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  

module.exports = router;
