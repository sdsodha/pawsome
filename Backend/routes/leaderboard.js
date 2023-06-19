const express = require('express');
const router = express.Router();
const UserList = require('../models/leaderboard');
const User = require('../models/users'); // Assuming you have a User model

// POST route to add users for the current logged-in user
// router.post('/user-lists/:loggedInUserId', async (req, res) => {
//   try {
//     const { loggedInUserId } = req.params;
//     const { registeredUserIds } = req.body;

//     // Check if the registered users exist
//     const registeredUsers = await User.find({ _id: { $in: registeredUserIds } });
//     const existingUserIds = registeredUsers.map(user => user._id.toString());
//     const missingUserIds = registeredUserIds.filter(id => !existingUserIds.includes(id));
//     if (missingUserIds.length > 0) {
//       return res.status(404).json({ message: `Registered users not found: ${missingUserIds.join(', ')}` });
//     }

//     // Create a new user list
//     const userList = new UserList({
//       user: loggedInUserId,
//       registeredUsers: registeredUserIds
//     });

//     // Save the user list
//     await userList.save();

//     res.status(201).json({ message: 'Registered users added to the user list successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.post('/user-lists', async (req, res) => {
//     try {
  
//       const { registeredUsers, user  } = req.body;
  
//       // Create a new user list
//       const userList = new UserList({
//         user,
//         registeredUsers
//       });
  
//       // Save the user list
//       await userList.save();
  
//       res.status(201).json({ message: 'Registered users added to the user list successfully' });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });

// router.post('/user-lists', async (req, res) => {
//   try {
//     const { registeredUsers, user } = req.body;

//     // Check if the user list already exists for the user
//     const existingUserList = await UserList.findOne({ user });

//     if (existingUserList) {
//       // If the user list exists, update the registered users
//       existingUserList.registeredUsers = registeredUsers;
//       await existingUserList.save();
//       res.status(200).json({ message: 'Registered users updated successfully' });
//     } else {
//       // If the user list doesn't exist, create a new user list
//       const userList = new UserList({
//         user,
//         registeredUsers,
//       });

//       // Save the user list
//       await userList.save();
//       res.status(201).json({ message: 'User list created successfully' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

router.post('/user-lists', async (req, res) => {
  try {
    const { registeredUsers, user } = req.body;

    // Check if the user list already exists for the user
    const existingUserList = await UserList.findOne({ user });

    if (existingUserList) {
      // If the user list exists, update the registered users
      existingUserList.registeredUsers = registeredUsers.filter(
        (registeredUser) => registeredUser !== user
      );
      await existingUserList.save();
      res.status(200).json({ message: 'Registered users updated successfully' });
    } else {
      // If the user list doesn't exist, create a new user list
      const userList = new UserList({
        user,
        registeredUsers: registeredUsers.filter((registeredUser) => registeredUser !== user),
      });

      // Save the user list
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

module.exports = router;

 

module.exports = router;
