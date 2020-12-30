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
    getByCartItemID :  (cart_item_id, result) => {
        conn.query("SELECT * FROM cart_items INNER JOIN products ON cart_items.product_id = products.product_id WHERE cart_item_id = ?", cart_item_id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res[0]);
        });
    },
    
    create : (cartItem, result) => {
        conn.query("INSERT INTO cart_items(cart_item_quantity, cart_id, product_id) VALUES (?,?,?)",cartItem, (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }
            result(null, true)
          })   
    },
    addMore : (cartItem, result) => {
        conn.query("SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?", 
        cartItem.slice(1), (err, res) => {
            console.log(res)
            if (err) return
            else if(res.length) {
                console.log("Ket qua tim item: " + res)
                conn.query("UPDATE cart_items SET cart_item_quantity = cart_item_quantity + ? WHERE cart_id = ? AND product_id = ?", 
                cartItem, (err1, res1) => {
                if (err1) {
                    console.log("error: ", err1);
                    result(null, err1);
                    return;
                }
                result(null, true)
                }) 
            }
            else result(null,false)
        
        })
    },
        

    update : (cartItem, result) => {
        conn.query("UPDATE cart_items SET cart_item_quantity = cart_item_quantity + ? WHERE cart_item_id = ?", 
            cartItem, (err, res) => {
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