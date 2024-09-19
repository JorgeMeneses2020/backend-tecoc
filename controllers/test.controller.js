'use strict'

const testController = {
    testFunction: (req, res) => {
        res.status(200).send({ message: "Hello world" });
    },
    testFunction2: (req, res) => {
        res.status(200).send({ message: "Hello world 2" });
    },

}

module.exports = testController;