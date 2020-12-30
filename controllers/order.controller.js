// import {user_id} from './user.controller.js'
import conn from "../models/db.js";
import Cart from "../models/cart.model.js"
import Order from "../models/order.model.js"
import CartItem from "../models/cart_item.model.js"
const order = new Order();
const cartItem = new CartItem();

const createOrder = async (req, res, next) => {
    // tim product id va so luong
    // phan theo supplier
    let order_item_id = req.body.order_item_id; //=data
    let len = order_item_id.length();
    let orderItems = [];
    let getOneOrderItem = (cart_item_id) => {
        return new Promise(resolve => {
            cartItem.getByCartItemID(cart_item_id, (err, item) => {
                if (err) {
                    console.log("error here")
                } else {
                    console.log("tim thay");
                    orderItems.push(item)
                    resolve();
                }
            })
        }) 
    }
    let getOrderItems = () => {
        const promises = []
        order_item_id.forEach(element => {
            promises.push(getOneItem(element))
        });
        Promise.all(promises)
        .then(() => {
            let temp = []
            orderItems.forEach(e => {
                if (temp.filter(e => e.supplier_id === 'Magenic').length > 0) {
                    /* vendors contains the element we're looking for */
                  }
            })
        })
    }
    






    let timestamp = new Date().toISOString().slice(0,10)
    let order_obj = [
        req.body.user_id, //user_id
        req.body.supplier_id, //supplier_id
        timestamp,
        req.body.total, //total
        req.body.address, //address
    ]
    return new Promise((resolve, rejects) => {
        order.create(order_obj, (err, data) => {
            if(data) {
                console.log(data)
                console.log("create a new order successfully")
                res.locals.order_id = data.insertId
                resolve()
            }
            else console.log("create order failed")
        })
    }).then(()=> {
        console.log("next function")
        next();
    })
    
};
const deleteOrder = (req, res) => {
    let order_id = req.body.order_id;
    order.delete(order_id, (err, data) => {
        if(data) {
            console.log("Delete a new order successfully")
        }
        else console.log("Delete order failed")
    }) 
};

const getOrderByOrderID = (req, res) => {
    let order_id = req.body.order_id;
    order.getByOrderID(order_id, (err, data) => {
        if(data) {
            console.log("Order by ID: ", data)
        }
        else console.log("get order failed")
    }) 
};
const getOrderByUserID = (req, res) => {
    let user_id = req.body.user_id;
    order.getByUserID(user_id, (err, data) => {
        if(data) {
            console.log("Order by User: ", data)
        }
        else console.log("get order failed")
    }) 
};
const getOrderBySupplierID = (req, res) => {
    let supplier_id = req.body.supplier_id;
    order.getBySupplierID(supplier_id, (err, data) => {
        if(data) {
            console.log("Order by Supplier: ", data)
        }
        else console.log("get order failed")
    }) 
};

export default {
    createOrder,
    deleteOrder,
    getOrderByOrderID,
    getOrderByUserID,
    getOrderBySupplierID,

};
