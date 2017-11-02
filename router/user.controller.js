var app = require("express");
var User = require("../model/user.model.js");
var config = require("../config.json");
var crypto = require("crypto");
var uuid = require("uuid/v1");
var CheckField = async function (field, value) {
    return await User.ifUserFieldExist(field, value);
}
var APIKey = async function () {
    var user = {};
    do {
        var idBinary = (new Buffer(uuid()));
        user.idBinary = idBinary.toString("utf8");
        user._id = idBinary.toString('hex').substr(0, 8);
    } while (await CheckField("id", user._id));
    do {
        var keyBinary = new Buffer(uuid());
        user.keyBinary = keyBinary.toString("utf8");
        user.key = keyBinary.toString('base64').substr(0, 64);
    } while (await CheckField("key", user._key))
    return user;
};

exports.vaildUser = (req, res) => {
    res.json("Developing");
}
exports.createUser = async function (req, res) {
    var result = {};
    var info = {};
    // Generate Keys
    /*
    APIKey().then(async (keys) => {
        info._id = keys._id;
        info.username = req.jsonBody.username;
        info.email = req.jsonBody.email;
        info.password = crypto.createHash('sha256').update(req.jsonBody.password).digest('base64');
        info.APIKey = keys.key;
    })
        .then(async function () {
            CheckField("username", info.username).then((username) => {
                console.log("user:"+username);
                if (username == true) {
                    result.error = true;
                    result.message = "Username existed!"
                }
            });
            CheckField("email", info.email).then((email) => {
                if (email == true) {
                    console.log("email");
                    result.error = true;
                    result.message = "Email existed!"
                }
            });
        }).then(()=> {

        });
        */
        let keys = APIKey();
        info._id = keys._id;
        info.username = req.jsonBody.username;
        info.email = req.jsonBody.email;
        info.password = crypto.createHash('sha256').update(req.jsonBody.password).digest('base64');
        info.APIKey = keys.key;
        console.log(info);

        let username = await CheckField("username", info.username);
        let email = await CheckField("email", info.email);
        console.log("username:"+username);
        console.log("email:"+email);
        if (username) {
            console.log("username");
            result.error = true;
            result.message = "Username existed!"
        } else if (email) {
            console.log("email");
            result.error = true;
            result.message = "Email existed!"
        } else if (!result.error) {
            User.createUser(info._id, info, (err, callback) => {
                if (!err) {
                    result.error = false;
                    result.message = "User created";
                } else {
                    result.error = true;
                    result.message = err;
                }
            })
        }
        res.json(result);
}
