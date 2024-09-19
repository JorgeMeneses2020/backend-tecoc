'use strict'
const User = require('../models/usuario.model');
const bcrypt = require('bcrypt');
const jwt = require('../middlewares/jwt');
function userRegister(req, res) {
    var params = req.body;
    var user = new User({
        nombre: params.nombre,
        email: params.email.toLocaleLowerCase()
    });

    User.findOne({ email: user.email }).then(
        (userConsult) => {
            if (!userConsult) {
                if (params.password) {
                    bcrypt.hash(params.password, 2, null).then(
                        (hash) => {
                            user.password = hash;
                            console.log(user);
                            user.save().then(
                                (userSaved) => {
                                    if (!userSaved) return res.status(404).send({ message: "No se pudo guardar el usuario" });
                                    if (userSaved) return res.status(200).send({ usuario: userSaved })
                                }
                            ).catch(
                                (err) => {
                                    if (err) return res.status(500).send({ message: "Error en el servidor" + err });
                                }
                            )

                        }
                    ).catch(
                        (err) => {
                            console.log(err);

                        }
                    );
                }

            }
            if (userConsult) res.status(200).send({ message: "El usuario ya está registrado" });

        }
    ).catch(
        (err) => {
            if (err) return res.status(500).send({ message: "Error en el servidor" + err })
        }
    )

}
function userLogin(req, res) {
    const body = req.body;
    var email = body.email;
    var password = body.password;
    var gethash = body.gethash;

    User.findOne({ email: email.toLocaleLowerCase() }).then(
        (user) => {
            if (!user) return res.status(404).send({ message: "El usuario no existe" });
            if (user) {
                console.log(user);

                bcrypt.compare(password, user.password).then(
                    (check) => {
                        if (check) {
                            if (gethash) {
                                return res.status(200).send({ token: jwt.createToken(user) });
                            } else {
                                return res.status(200).send({ user: user });
                            }
                        } else {
                            return res.status(401).send({ message: "Contraseña invalida" });
                        }
                    }
                )
            }
        }
    ).catch(
        (err) => {
            if (err) res.status(500).send({ error: err });
        }
    )

}

// USERLOGIN

module.exports = {
    userRegister,
    userLogin
}