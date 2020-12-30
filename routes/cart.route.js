import express from 'express';
import ProductController from '../controllers/product.controller.js';
import UserController from '../controllers/user.controller.js';
import CartController from '../controllers/cart.controller.js';
import CartItem from '../controllers/cart_item.controller.js'
const cartRouter = express.Router();


cartRouter.get("/checkout", CartItem.getAllCartItems);
cartRouter.post("/checkout", CartController.accessCart);

cartRouter.get("/addCartItem", CartItem.goToAddCartItem)
cartRouter.post("/addCartItem", CartItem.addCartItem)

cartRouter.post("/removeCartItem", CartItem.removeCartItem)

cartRouter.post("/updateCartItemQuantity", CartItem.updateQuantity)

export default cartRouter;  