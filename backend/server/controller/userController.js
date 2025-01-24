const User = require('../modules/userModel');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    let validation = '';
    if (!req.body.name) {
        validation += "name is required "
    }
    if (!req.body.email) {
        validation += "email is required "
    }
    if (!req.body.password) {
        validation += "password is required "
    }
    if (!!validation) {
        res.send({ success: false, status: 400, message: validation })
    }
    else {
        User.findOne({ email: req.body.email })
            .then((existingUser) => {
                if (existingUser) {
                    return res.send({ success: false, status: 400, message: "User already exists" });
                }
                else {
                    const saltRounds = 10;
                    bcrypt.hash(req.body.password, saltRounds)
                        .then((hashedPassword) => {
                            const user = new User({
                                name: req.body.name,
                                email: req.body.email,
                                password: hashedPassword,
                            });

                            user.save()
                                .then((savedUser) => {
                                    res.send({ success: true, status: 200, message: "New user is created", data: savedUser });
                                })
                                .catch((err) => {
                                    res.send({ success: false, status: 500, message: err.message });
                                });
                        })
                        .catch((err) => {
                            res.send({ success: false, status: 500, message: "Error checking user: " + err.message });
                        });

                }
            })
            .catch((err) => {
                res.send({ success: false, status: 500, message: "Error checking user: " + err.message });
            });
    }
}
const login = (req, res) => {
    let validation = '';
    if (!req.body.email) {
        validation += "email is required ";
    }
    if (!req.body.password) {
        validation += "password is required ";
    }
    if (validation) {
        res.send({ success: false, status: 400, message: validation });
    } else {
        User.findOne({ email: req.body.email }).exec()
            .then((user) => {
                if (!user) {
                    res.send({
                        success: false,
                        status: 500,
                        message: "User is not registered",
                    });
                } else {
                    // Compare passwords using bcrypt.compare
                    bcrypt.compare(req.body.password, user.password)
                        .then((isPasswordValid) => {
                            if (isPasswordValid) {
                                res.send({
                                    success: true,
                                    status: 200,
                                    message: "Login Successful",
                                    data: user,
                                });
                            } else {
                                res.send({
                                    success: false,
                                    status: 400,
                                    message: "The credentials are wrong",
                                });
                            }
                        })
                        .catch((err) => {
                            res.send({
                                success: false,
                                status: 500,
                                message: "Error during password validation: " + err.message,
                            });
                        });
                }
            })
            .catch((err) => {
                res.send({
                    success: false,
                    status: 500,
                    message: "Error during user lookup: " + err.message,
                });
            });
    }
};


const profilePasswordChange = (req, res) => {
    let validation = ''
    if (!req.body.password) {
        validation += "old password is required "
    }
    if (!req.body.newPassword) {
        validation += "new password is required "
    }
    if (!!validation) {
        res.send({ success: false, status: 400, message: validation })
    }
    else {
        User.findOne({ _id: req.body._id }).exec()
            .then((data) => {
                if (data == null) {
                    res.send({ success: false, status: 400, message: "user od this _id not exists" })
                }
                else {
                    if (data.password == req.body.password) {
                        data.password = req.body.newPassword
                        data.save()
                            .then((updatedData) => {
                                res.send({ success: true, status: 200, message: "the password is changed" })
                            })
                            .catch((err) => {
                                res.send({ success: false, status: 400, message: err.message })
                            })
                    }
                }
            })
            .catch((err) => {
                res.send({ success: false, status: 400, message: err.message })
            })
    }
}
const findOneUser = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += "_id is requried"
    }
    if (!!validation) {
        res.send({ success: false, status: 400, message: validation })
    }
    else {
        User.findOne({ _id: req.body._id }).exec()
            .then((data) => {
                if (data == null) {
                    res.send({ success: false, status: 400, message: "no users Exists" })
                }
                else {
                    res.send({ success: true, status: 200, message: "user", data: data })
                }
            })
            .catch((err) => {
                res.send({ success: false, status: 400, message: err.message })
            })
    }

}


module.exports = { register, login, profilePasswordChange, findOneUser };