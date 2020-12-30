// import {user_id} from './user.controller.js'
import conn from "../models/db.js";
import Cart from "../models/cart.model.js"

const cart = new Cart();

const registerCart = (req, res) => {
    let cart_id = user_id;
    console.log("dang ki cart " + cart_id)
    if(cart_id !== -1) {
        cart.create(
            cart_id, user_id,
            (err, data) => {
                if (data) {
                    console.log("create Cart successfully")
                } else console.log("create Cart failed")
            }
        );
    }  
};

const accessCart = (req, res) => {
    if(req.session.user != null) { 
        res.send({accessCart : true, url: "checkout"})
    }
    else res.send({accessCart: false})
}
export default {
    registerCart,
    accessCart
};
