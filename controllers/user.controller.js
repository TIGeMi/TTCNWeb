import conn from "../models/db.js";
import User from "../models/user.model.js";
import Cart from "../models/cart.model.js"
const user = new User();
const cart = new Cart();

const sessionStorage = (req, res) => {
    let user = req.session.user;
    console.log(user);
    if (user) {
        console.log("user in session: " + user.name);
        res.render("main1", {
            session_user: user, 
            opp: req.session.opp,
        });
        return;
    } else {
        res.render("main1", {
            session_user: false,
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
    user.checkLogin(req.body.Email, req.body.Password, (err, data) => {
        console.log("data o day: ",data);
        if (data) {
            // Store the user data in a session.
            req.session.user = data;
            req.session.role = data.role;
            req.session.opp = 10;
            // redirect the user to the home page.
            let redirect = "";
            if(req.session.role == 2) {
               redirect = "admin/manage-user"
            }
            else redirect = "/";
            res.send({ loginState: true, url : redirect  })
            
        } else {
            console.log("Dang nhap failed")
            res.send({ loginState: false })
        }
    });
};

const registerUser = (req, res) => {
    user.create(
        req.body.Email,
        req.body.Password,
        req.body.Name,
        (err, data) => {
            console.log(data);
            let defaultEmail = "default@gmai.com";
            if (data) {
                console.log("data create new user: " + data.insertId);
                let user_id = data.insertId;
                console.log("user_id from userController: " + user_id)
                cart.create(user_id, user_id, (err1,data1) => {
                    if(err1) throw err1 
                })
                res.send({registerState : true})
                // res.render("API/test_register", {
                //     email: req.body.Email,
                //     password: req.body.Password,
                //     Name: req.body.Name,
                // });
            } else
                res.send({registerState : false})
                // res.render("API/test_register", {
                //     email: defaultEmail,
                // });
        }
    );
};

const updateUserProfile = (req, res) => {
    let user1 = req.body;
    console.log("user1: " ,user1)
    let user_info = [
        user1.newPassword,
        user1.name,
        user1.address,
        user1.phone,
        req.session.user.id,
    ]
    console.log("user_info" , user_info)
    user.update(user_info, (err, data) => {
        if (data == 1) {
            console.log("data", data);
            res.send({
                updateState: true,
            });
        }
        else {
            res.send({
                updateState: false,
            })
        }
    });
};
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

const getUserProfile = (req, res) => {
    let user = req.session.user;
    if(user) {
        res.render("profile", {
            session_user: user, 
            opp: req.session.opp,
        });
    } else res.render("API/error_page")
    
}

//ADMIN
const adminManageUser = (req, res) => {
    if(req.session.user.role == 2)  
    user.filler("supplier", (err, data) => {
        if (data) {
            console.log(data);
            res.render(("admin/manageUser"),{
                suppliers: data,
                session_user: req.session.user,
            });
        }
    });
    else res.render("API/error_page")
}
const adminManageProduct = (req, res) => {
    if(req.session.user.role == 2)  res.render(("admin/manageProduct"), {
        session_user: req.session.user,
    })
    else res.render("API/error_page")
}

export default {
    validateUser,
    registerUser,
    sessionStorage,
    logoutUser,
    getSupllier,
    checkEmail,
    testLogin,
    adminManageUser,
    adminManageProduct,
    updateUserProfile,
    getUserProfile
};
