const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.Types.ObjectId;
// Define the schema for the user list
const UserListSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  registeredUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

// Create the model using the schema
const UserList = mongoose.model('UserList', UserListSchema);

module.exports = UserList;
