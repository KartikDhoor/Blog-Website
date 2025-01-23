const User = require('../modules/userModel');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    let validation = '';
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
                    const user = new User()
                    user.email = req.body.email,
                    user.password = bcrypt.hash(req.body.password, saltRounds),
                    user.save()
                    .then((savedUser) => {
                        res.send({ success: true, status: 200, message: "New user is created", data: savedUser });
                    })
                    .catch((err) => {
                        res.send({ success: false, status: 500, message: err.message });
                    });
                }
            })
            .catch((err) => {
                res.send({ success: false, status: 500, message: "Error checking user: " + err.message });
            });
    }
}
const login = async (req, res) => {
    let validation = '';
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
        User.findOne({ email: req.body.email }).exec()
            .then(
                (data) => {
                    if (data == null) {
                        res.send({
                            success: false,
                            status: 500,
                            message: "user is not register"
                        })
                    }
                    else {
                        if(data.email==req.body.email){
                            if(data.password== bcrypt.compare(req.body.password, data.password)){
                                res.send({success:true,status:200,message:"login Successfull", data:data})
                            }
                            else{  
                            res.send({ success: false, status: 400, message:"the credentail is Wrong" })
                            }
                        }
                        else{
                            res.send({ success: false, status: 400, message:"the credentail is Wrong" })
                        }

                    }
                }
            )
            .catch((err) => {
                res.send({ success: false, status: 400, message: err.message })
            })

    }
}
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