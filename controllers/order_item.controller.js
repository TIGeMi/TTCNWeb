import conn from "../models/db.js";
import Cart from "../models/cart.model.js"
import Order from "../models/order.model.js"
import OrderItem from "../models/order_item.model.js"
const orderItem = new OrderItem();

const createOrderItem = (req, res) => {
    console.log("after next")
    let order_item_obj = [
        res.locals.order_id, //user_id
        req.body.product_id,
        req.body.order_item_quantity, //supplier_id
        
    ]
    orderItem.create(order_item_obj, (err, data) => {
        if(data) {
            console.log("create a new ORDER ITEM successfully")
        }
        else console.log("create ORDER ITEM failed")
    }) 
};

export default {
    createOrderItem,
};
