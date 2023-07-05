const { redirect } = require('react-router-dom');
const database = require('./Database');
const bcrypt = require('bcrypt');

function UpdateEmail(req, res) {
    const { oldEmail, newEmail, confirmPassword } = req.body;
    database.query('SELECT * FROM Users WHERE EMAIL = ? AND ID = ?', [oldEmail, req.session.userID], function (err, result) {
        if (err || result.length === 0) {
            console.log("Error comparing IDs: ", err);
            return res.status(403).json({ message: "There was something wrong with the email you entered. Please be sure you are entering the email of the account you are currently logged into." });
        } else {
            bcrypt.compare(confirmPassword, result[0].Password, (err, isValid) => {
                if (err || !isValid) {
                    console.log("Error comparing passwords: ", err);
                    return res.status(403).json({ message: "Invalid email or password." });
                }
            })}
        }) 
    database.query('UPDATE Users SET Email = ? WHERE Email = ? AND ID = ?', [newEmail, oldEmail, req.session.userID], function (err, result) {
        if (err) {
            console.log("Error comparing IDs: ", err);
            return res.status(403).json({ message: "Something went wrong." });
        } else {
            return res.status(200).json({ message: "Email updated." });
        }
    })
}

module.exports = UpdateEmail;