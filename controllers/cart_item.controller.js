import conn from "../models/db.js";
import CartItem from "../models/cart_item.model.js";
import Product from "../models/product.model.js";

const cartItem = new CartItem();
const product = new Product();

const getAllCartItems = (req, res) => {
    let card_id = req.session.user.id;
    cartItem.getByCartID(card_id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving cart items.",
            });
        else {
            let cartItems = [];

            let getOneItem = (product_id) => {
                return new Promise(resolve => {
                    product.getProductByID(product_id, (err, product) => {
                        if (err) {
                            console.log("error here")
                        } else {
                            console.log("tim thay" + product_id);
                            cartItems.push(product)
                            resolve();
                        }
                    })
                }) 
            }
            let getCartItems = () => {
                const promises = []
                data.forEach(element => {
                    promises.push(getOneItem(element.product_id))
                });
                console.log(data)
                Promise.all(promises)
                .then(() => {
                    res.render("checkout", {
                        session_user: req.session.user,
                        listCartItems: cartItems,
                        cartItemData: data,
                    });
                })
            }
            getCartItems()
        }
    });
};

const removeCartItem = (req, res) => {
    let cart_item_id = req.body.cart_item_id
    cartItem.delete(cart_item_id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving customers.",
            });
        else {
            console.log(data);
            res.send({
                deleteStatus: true,
            });
        }
    });
};

const updateQuantity = (req, res) => {
    console.log("cap nhat so luong")
    console.log(req.body.cart_item_id)
    let updatedCartItem = [
        req.body.diff, //quantity of cart_item
        req.body.cart_item_id, //cart_item_id
    ]
    cartItem.update(updatedCartItem, (err,data) => {
        if(err) throw err;
        else {
            console.log("Update successfully")
            res.send({success: true})
        }
    })
}

const addCartItem = (req, res) => {
    console.log("Add cart  item")
    let newCartItem = [
        // 10, //quantity of cart_item
        // 56, //cart_id
        // 7 //product_id
        req.body.quantity_of_cart_item, 
        req.body.cart_id,
        req.body.product_id, 
    ]
    console.log(newCartItem)
    cartItem.addMore(newCartItem, (err,data) => {
        console.log(err)
        console.log(data)
        if (!data) {
            console.log("Loi err")
            cartItem.create(newCartItem, (err1, data1) => {
                if (err1) console.log("Loi err1");
                if (data1)
                    res.render("API/test_add_cart_item", {
                        addStatus: "thanh cong",
                    })
                else
                    res.render("API/test_add_cart_item", {
                        addStatus: "that bai",
                    })
            })
        }
        else
            {
                res.render("API/test_add_cart_item", {
                addStatus: "Cap nhat",
            })}
    })
    
};
const goToAddCartItem = (req, res) => {
    res.render("API/test_add_cart_item")
}
export default { getAllCartItems, removeCartItem, addCartItem, updateQuantity, goToAddCartItem };
