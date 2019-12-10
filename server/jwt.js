var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

generateToken = (id) => {
    const token = jwt.sign({
        _id: id}, "MySecretPassword")
    return token
}
module.exports =  generateToken