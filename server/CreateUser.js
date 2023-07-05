const database = require('./Database');
const encrypt = require('./Encrypt');

function CreateUser(req, res) {
  const { email, password, confirmPassword, answer } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Requires valid email formatting.
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/; //Requires min. 1 each of a number and special character.

  if (!email || !password || !confirmPassword || !answer) {
    return res.status(400).json({ message: "All input fields must be filled." });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }
  if (!passwordRegex.test(password) || !emailRegex.test(email)) {
    return res.status(400).json({ message: "Please check that you have used valid email formatting, and that your password has at least one number and one special character" });
  }

  // Check if the email already exists in the database
  database.query("SELECT Email FROM Users WHERE Email = ?", [email], function (err, result) {
    if (err) {
      console.log("Error checking email:", err);
      return res.status(500).json({ message: "An error occurred while checking email." });
    }
    if (result.length > 0) {
      return res.status(400).json({ message: "Email already exists in the database." });
    }

    // If email is not in the database, create a new user
    encrypt(password).then(({ hash }) => {
      database.query("INSERT INTO Users (Access, Email, Password, Answer) VALUES ('User', ?, ?, ?)", [email, hash, answer], function (err, result) {
        if (err) {
          console.log("Error creating user: ", err);
          return res.status(500).json({ message: "Account could not be created." });
        }
        console.log("User created.");
        return res.status(200).json({ message: "Account created successfully." });
      });
    });
  });
}

module.exports = CreateUser;
