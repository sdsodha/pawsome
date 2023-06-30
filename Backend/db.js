const mongoose = require('mongoose');
// mongoose.set('strictQuery', true);

// const dbURI = 'mongodb+srv://dionysus:Windows10*@cluster0.es7590t.mongodb.net/?retryWrites=true&w=majority'

const dbURI = `mongodb+srv://karansingh1120:X1Dc5dGBebuEG9U0@cluster0.cdgdg.mongodb.net/pawsomeusers?retryWrites=true&w=majority`;

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', () => {
console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', err => {
console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
console.log('Mongoose disconnected');
});