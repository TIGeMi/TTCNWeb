import conn from './db.js'

function CartItem() {};
CartItem.prototype = {
    getByCartID :  (cart_id, result) => {
        conn.query("SELECT * FROM cart_items WHERE cart_id = ?", cart_id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
        });
    },
    
    create : (cart_id, product_id, result) => {
        conn.query("INSERT INTO cart_items(cart_id, product_id) VALUES (?,?)",[cart_id, product_id], (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }
            result(null, true)
          })   
    },
    delete : (cart_item_id, result) => {
        conn.query("DELETE FROM cart_items WHERE cart_item_id = ?", cart_item_id, (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }
            result(null, true)
          })        
    },
}

export default CartItem;