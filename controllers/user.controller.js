import conn from "../models/db.js";
import User from "../models/user.model.js";

const user = new User();

const loginUser = (req, res) => {
    let user = req.session.user;

    if (user) {
        console.log("user in session: " + user.Name);
        res.render("main", {
            opp: req.session.opp,
            name: user.Name,
            isLogin: true,
        });
        return;
    } else {
        res.render("main", {
            opp: req.session.opp,
            name: "default",
            isLogin: false,
        });
        return;
    }
};

const logoutUser = (req, res) => {
    if (req.session.user) {
        req.session.destroy(function () {
            res.redirect("/");
        });
    }
};
const validateUser = (req, res) => {
    user.checkLogin(req.body.email, req.body.password, (err, data) => {
        let defaultEmail = "default@gmai.com";
        if (data) {
            console.log(data);
            // Store the user data in a session.
            req.session.user = data[0];
            req.session.opp = 10;
            // redirect the user to the home page.

            res.redirect("/");
            // res.render('whoLogin', {
            //     email : req.body.email,
            // })
        } else
            res.render("whoLogin", {
                email: defaultEmail,
            });
    });
};
let user_id = -1;
// const registerUser = (req, res) => {
//     console.log("ham nay se ra truoc")
//     user.create(
//         req.body.Email,
//         req.body.Password,
//         req.body.Name,
//         (err, data) => {
//             let defaultEmail = "default@gmai.com";
//             if (data) {
//                 console.log("data create new user: " + data.insertId);
//                 user_id = data.insertId;
//                 console.log("user_id from userController: " + user_id)
//                 res.render("Register", {
//                     email: req.body.Email,
//                     password: req.body.Password,
//                     Name: req.body.Name,
//                 });
//             } else
//                 res.render("Register", {
//                     email: defaultEmail,
//                 });
//         }
//     );
// };

const registerUser = async (req, res) => {
    console.log("ham nay se ra truoc")
    var a = await user.create(
        req.body.Email,
        req.body.Password,
        req.body.Name,
        (err, data) => {
            let defaultEmail = "default@gmai.com";
            if (data) {
                console.log("data create new user: " + data.insertId);
                user_id = data.insertId;
                console.log("user_id from userController: " + user_id)
                res.render("Register", {
                    email: req.body.Email,
                    password: req.body.Password,
                    Name: req.body.Name,
                });
            } else
                res.render("Register", {
                    email: defaultEmail,
                });
        }
    );
    console.log("phai ra sau data create new user" + a)
};

const getLatestUserID = async (req, res, next) => {
    await registerUser(req, res);
    console.log("the lastest user id is : " + user_id);
}

const getSupllier = (req, res) => {
    let role = "supplier";
    console.log("filler supplier is running");
    user.filler(role, (err, data) => {
        if (data) {
            console.log(data);
            res.json({
                supllier: data,
            });
        }
    });
};
const checkEmail = (req, res) => {
    console.log("dang check email");
    console.log(req.body.email);
    user.find(req.body.email, (err, data) => {
        if (data) {
            console.log(data);
            res.send({ duplicate: true }); 
        } else {
            console.log("khong duplicate");
            res.send({ duplicate: false }); 
        }
    });
};
const testLogin = (req, res) => {
    res.render("test", {
        duplicate: false,
    });
};
export default {
    validateUser,
    registerUser,
    loginUser,
    logoutUser,
    getSupllier,
    checkEmail,
    testLogin,
    getLatestUserID,
};
