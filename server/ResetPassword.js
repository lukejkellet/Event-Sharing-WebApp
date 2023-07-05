const database = require('./Database');
const encrypt = require('./Encrypt');

function ResetPassword(req, res) {
    const { email, password, confirmPassword, answer } = req.body;
    //Email Validation
    database.query('SELECT * FROM Users WHERE Email = ?', [email], function (err, result) {
      if (err) {
        console.log("Error comparing emails: ", err);
        return res.status(400).json({ message: "Email does not exist." });
      }
    //Password Validation
      if (!password === confirmPassword) {
        return res.status(400).json({ message: "Passwords did not match." });
      }
    //Question/Answer Validation
      if (answer === result[0].Answer) {
        encrypt(password).then(({ hash }) => {
          database.query('UPDATE Users SET Password = ?', [hash], function (err, result) {
            if (err) {
              console.log("Error comparing emails: ", err);
              return res.status(400).json({ message: "Something went wrong." });
            } else {
              return res.status(200).json({ message: "Password updated." });
            }
          })
        })
      } else {
        return res.status(400).json({ message: "Unable to update account information." });
      }
    })
}

module.exports = ResetPassword;

