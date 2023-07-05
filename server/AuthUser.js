const database = require('./Database');
const bcrypt = require('bcrypt');

function AuthUser(req, res) {
    const { email, password } = req.body;
    //Email Validation
    database.query('SELECT * FROM Users WHERE Email = ?', [email], function (err, result) {
        if (err) {
            console.log("Error comparing emails: ", err); //For testing
            return res.status(403).json({ message: "Incorrect email or password." });
        }
        const hashedPassword = result[0].Password;
        //Password Validation
        bcrypt.compare(password, hashedPassword, (err, isValid) => {
            if (err || !isValid) {
                console.log("Error comparing emails: ", "\nError: ", err, "\nisValid: ", isValid); //For testing
                return res.status(403).json({ message: "Incorrect email or password." });
            }
            req.session.userID = result[0].ID;
            res.redirect('/events');
        });
    });
}

module.exports = AuthUser;