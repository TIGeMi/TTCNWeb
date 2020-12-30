import conn from '../models/db.js'
import bcrypt from 'bcrypt';
// constructor
// const User = () => {};
function OrderItem() {};
OrderItem.prototype = {
    create : (order_item_obj, result) => {      
        conn.query("INSERT INTO order_items(order_id, product_id, order_item_quantity) VALUES (?, ?, ?)", order_item_obj, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            result(null, true)
        });
    },
    // delete : (order_id, result) => {      
    //     conn.query("DELETE FROM orders WHERE order_id = ?", order_id, (err, res) => {
    //         if (err) {
    //             console.log("error: ", err);
    //             result(null, err);
    //             return;
    //         }
    //         result(null, true)
    //     });
    // },
    // getByOrderID : (order_id, result) => {
    //     conn.query("SELECT * FROM orders WHERE order_id = ?", [order_id], (err, res) => {
    //         if(err) {
    //             console.log("error: ", err);
    //             result(null, err);
    //             return;
    //         }
    //         if (res.length) {
    //             result(null, res[0]);
    //             return;
    //         }
    //         result({ kind: "not_found" }, null);
    //         });
    // },

    // getByUserID : (user_id, result) => {
    //     conn.query("SELECT * FROM orders WHERE user_id = ?", [user_id], (err, res) => {
    //         if(err) {
    //             console.log("error: ", err);
    //             result(null, err);
    //             return;
    //         }
    //         if (res.length) {
    //             result(null, res);
    //             return;
    //         }
    //         result({ kind: "not_found" }, null);
    //         });
    // },

    // getBySupplierID : (supplier_id, result) => {
    //     conn.query("SELECT * FROM orders WHERE user_id = ?", [supplier_id], (err, res) => {
    //         if(err) {
    //             console.log("error: ", err);
    //             result(null, err);
    //             return;
    //         }
    //         if (res.length) {
    //             result(null, res);
    //             return;
    //         }
    //         result({ kind: "not_found" }, null);
    //         });
    // },

    
}

export default OrderItem;