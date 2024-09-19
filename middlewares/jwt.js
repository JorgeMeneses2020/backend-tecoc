'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const clave = "secreto";
exports.createToken = function (user) {
    var payload = {
        sub: user._id,
        nombre: user.nombre,
        email: user.email,
        password: user.password,
        iat: moment().unix(),
        exp: moment().add(2, 'days')
    }
    return jwt.encode(payload, clave);
}