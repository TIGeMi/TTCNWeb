import conn from '../models/db.js'

function Product() {};
Product.prototype = {
    getAll :  result => {
        conn.query("SELECT * FROM products", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
        });
    },
    getProductByID : (product_id, result) => {
        conn.query("SELECT * FROM products WHERE product_id = ?", [product_id], (err, res) => {
            if(err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.length) {
                console.log("found product: ", res[0]);
                result(null, res[0]);
                return;
            }
            result({ kind: "not_found" }, null);
            });
    },
    create : (product, result) => {
        // const {id,catid,name,des,quan,brid,supid,price,sprice,photos,state} = product;
        conn.query("INSERT INTO products(category_id, product_name, product_description, quantity, brand_id, supplier_id, price, sale_price, photos, public_state) VALUES (?,?,?,?,?,?,?,?,?,?)",
        product, (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }
            result(null, true)
          })   
    },
    delete : (id, result) => {
        conn.query("DELETE FROM products WHERE product_id = ?", id, (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }
            result(null, true)
          })        
    },
    update : (id, product, result) => {
        conn.query("UPDATE products SET category_id =?,product_name=?,product_description=?,quantity=?,brand_id=?,supplier_id=?,price=?,sale_price=?,photos=?,public_state=? WHERE product_id = ?", 
            product.concat(id), (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }
            result(null, true)
          }) 
    },
}

export default Product;