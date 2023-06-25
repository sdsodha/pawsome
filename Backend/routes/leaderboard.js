const express = require('express');
const router = express.Router();
const UserList = require('../models/leaderboard');
const User = require('../models/users'); // Assuming you have a User model




router.post('/user-lists', async (req, res) => {
  try {
    const { registeredUsers, user } = req.body;

    // Check if the user list already exists for the user
    const existingUserList = await UserList.findOne({ user });

    if (existingUserList) {
      // Remove the requested user from the registered users array if they exist
      existingUserList.registeredUsers = existingUserList.registeredUsers.filter(registeredUser => registeredUser !== user);

      // Add the new users to the registered users array
      existingUserList.registeredUsers.push(...registeredUsers);

      await existingUserList.save();
      res.status(200).json({ message: 'Registered users updated successfully' });
    } else {
      // If the user list doesn't exist, create a new user list
      const userList = new UserList({
        user,
        registeredUsers,
      });

      await userList.save();
      res.status(201).json({ message: 'User list created successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// GET route to retrieve the registered user list of a specific user
router.get('/user-lists/:loggedInUserId', async (req, res) => {
  try {
    const { loggedInUserId } = req.params;

    // Find the user list based on the logged-in user ID
    const userList = await UserList.findOne({ user: loggedInUserId }).populate('registeredUsers', 'email');

    if (!userList) {
      return res.status(404).json({ message: 'User list not found' });
    }

    res.status(200).json({ userList });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/userlist/:userListId/registeredUsers/:registeredUserId', async (req, res) => {
  try {
    const userListId = req.params.userListId;
    const registeredUserId = req.params.registeredUserId;

    const userList = await UserList.findOne({ user: userListId });

    if (!userList) {
      return res.status(404).json({ message: 'User list not found' });
    }

    const registeredUserIndex = userList.registeredUsers.findIndex(user => user.toString() === registeredUserId);

    if (registeredUserIndex === -1) {
      return res.status(404).json({ message: 'Registered user not found' });
    }

    userList.registeredUsers.splice(registeredUserIndex, 1);
    await userList.save();

    res.json({ message: 'Registered user removed successfully' });
  } catch (error) {
    console.error('Error removing registered user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
