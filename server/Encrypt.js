const bcrypt = require ('bcrypt');

function encrypt(plaintext) {
    const saltRounds = 10;
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(saltRounds, function(error, salt) { //Create new salt
            if (error) {
                reject(error); //There was an issue.
            } else {
                bcrypt.hash(plaintext, salt, function(error, hash) { //Encrypt plaintext using salt + hash
                    if (error) {
                        reject(error); //There was an issue.
                    } else {
                        console.log(salt, hash); //For testing
                        resolve({salt, hash}); //Successfully encrypted
                    }
                });
            }
        });
    });
}

module.exports = encrypt;