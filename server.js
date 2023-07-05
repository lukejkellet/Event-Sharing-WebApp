const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const multer = require('multer');
const AuthUser = require("./server/AuthUser");
const CreateUser = require('./server/CreateUser');
const UpdateEmail = require("./server/UpdateEmail");
const UpdatePassword = require('./server/UpdatePassword');
const ResetPassword = require('./server/ResetPassword');
const CreateEvent = require('./server/CreateEvent');
const FetchEvents = require ('./server/FetchEvents');

//APP + MIDDLEWARE SETUP
const port = 3000;
const app = express();
app.use(bodyParser.json());
app.use('/assets/images', express.static(path.join(__dirname, 'public/assets/images')));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', (req, res) => { session=req.session; });
app.use((req, res, next) => {next(); })

app.use(cookieParser());
app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 3600000
  }
}));

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/assets/images'),
  filename: function(req, file, cb) {
    const fileName = Date.now();
    const extension = path.extname(file.originalname);
    cb(null, fileName + extension);
  }
});

const upload = multer({ storage });

//FORM HANDLERS
app.post('/login', AuthUser);
app.post("/changeEmail", UpdateEmail);
app.post("/changePassword", UpdatePassword);
app.post('/reset', ResetPassword);
app.post("/register", CreateUser);
app.post('/createEvent', upload.single('image'), CreateEvent);
app.get("/fetchEvents", FetchEvents);

//PAGE AUTHENTICATION CHECKS
app.get("/events", (req, res) => {
    if (req.session.userID) { //A session has been started
        res.sendFile(path.join(__dirname, 'build', 'index.html')); //Let them access
    } else {
      console.log("No session set.");
    }
});

app.get("/settings", (req, res) => {
  if (req.session.userID) { //A session has been started
      res.sendFile(path.join(__dirname, 'build', 'index.html')); //Let them access
  } else {
    console.log("No session set.");
  }
});

app.get("/logout", (req, res) => { //Ends the session
  console.log("Signing out.");
  req.session.destroy;
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});