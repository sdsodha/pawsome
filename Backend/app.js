
const express = require("express");
const path = require('path');
const cors = require('cors');
const app = express()
app.use(express.json())

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


const bodyParser = require("body-parser");
const router = express.Router();
 

app.use(cors());

require('./db');

app.use("/api/v1", router);

app.set('port', process.env.PORT || 8080);

let server = app.listen(app.settings.port, () => console.log('listening on ', app.settings.port));

// app.get("/*",(req,res) => {
//     res.status(404).json({error:"Page not found for now"});
// });

//Routes
// const RegisterRoute = require('./routes/register');
// app.use('/', RegisterRoute);

// const LoginRoute = require('./routes/login');
// app.use('/', LoginRoute);

const UserRoute = require('./routes/user');
app.use('/', UserRoute);

const PetFormRoute = require('./routes/petform');
app.use('/', PetFormRoute);

const LeaderBoardRoute = require('./routes/leaderboard');
app.use('/', LeaderBoardRoute);





// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './public', 'index.html'));
//   });