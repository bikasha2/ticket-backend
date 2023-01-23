const User = require("../models/user");
const bcrypt = require("bcryptjs");
const config = require("../config/config");
const jwt = require("jsonwebtoken");


module.exports = {

    register: async function (req, res) {
        try {
            const { firstName, lastName, email, password, confirmPassword, role } = req.body;

            if (!firstName || !lastName || !email || !password || !role ) {
                return res.status(400).json({ msg: "Please enter all fields" })
            }

            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

            if (reg.test(email) === false) return res.status(400).json({ msg: "Invalid Email Format" })

            if (password.length < 6) return res.status(400).json({ msg: "Password must be at least 6 characters" })

            if (password !== confirmPassword) return res.status(400).json({ msg: "Passwords don't match" })

            const user = await User.findOne({ email })
            if (user) return res.status(400).json({ msg: "User already registered" });
            // Create New User
            const newUser = new User({
                firstName,
                lastName,
                email,
                role
            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    // Save the new user to the DB
                    newUser.save()
                        .then(user => {
                            const { firstName, lastName, email, role } = user;

                            jwt.sign(
                                { id: user.id }, config.jwtSecret, { expiresIn: 3600 }, (err, token) => {
                                    if (err) throw err
                                    res.json({
                                        token,
                                        user: {
                                            _id: user.id,
                                            firstName,
                                            lastName,
                                            email,
                                            role
                                        }
                                    })
                                }
                            )
                        })
                })
            })

        } catch (err) {
            throw err;
        }

    },

    login: async function (req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ msg: "Please enter all fields" })
            }

            const user = await User.findOne({ email })

            if (!user) return res.status(400).json({ msg: "User does not exist" });

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: "Password invalid" })

                    jwt.sign(
                        { id: user.id }, config.jwtSecret, { expiresIn: 3600 }, (err, token) => {
                            if (err) throw err
                            const { firstName, lastName, email, role } = user;
                            res.json({
                                token, user: {
                                    _id: user.id,
                                    firstName,
                                    lastName,
                                    email,
                                    role
                                }
                            })
                        }
                    )
                })
        } catch (err) {
            throw err;
        }

    },

    getAllUsers: async function (req, res) {
        try {
            const user = await User.find()
            res.json(user)
        } catch (err) {
            throw err;
        }
    },
    getUser: async function (req, res) {
        try {
            const user = await User.findById(req.user.id)
            res.json(user)
        } catch (err) {
            throw err;
        }
    }
}
