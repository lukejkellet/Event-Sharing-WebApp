const database = require('./Database');
const encrypt = require('./Encrypt');

function UpdatePassword(req, res) {
    const {oldEmail, password, newPasswordConfirm} = req.body;
    if (!password == newPasswordConfirm) {
      return res.status(403).json({ message: "Passwords do not match." });
    }
    database.query('SELECT * FROM Users WHERE EMAIL = ? AND ID = ?', [oldEmail, req.session.userID], function (err) {
      if (err) {
        console.log("Error comparing IDs: ", err);
        return res.status(403).json({ message: "Something went wrong." });
      }
    })
    encrypt(newPasswordConfirm).then(({ hash }) => {
      database.query('UPDATE Users SET Password = ? WHERE Email = ? AND ID = ?', [hash, oldEmail, req.session.userID], function (err) {
        if (err) {
          console.log("Error comparing emails: ", err);
          return res.status(403).json({ message: "Incorrect email or password." });
        } else {
          console.log("Password updated.");
          return res.status(200).json({ message: "Password updated." });
        }
      })
    })
}

module.exports = UpdatePassword;

