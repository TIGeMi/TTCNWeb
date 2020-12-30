import express from 'express';
import ProductController from '../controllers/product.controller.js';
import UserController from '../controllers/user.controller.js';
import CartController from '../controllers/cart.controller.js';
import CartItem from '../controllers/cart_item.controller.js'
import OrderController from "../controllers/order.controller.js"
import OrderItemController from "../controllers/order_item.controller.js"
const orderRouter = express.Router();


orderRouter.post("/createOrder", OrderController.createOrder); //next
orderRouter.post("/createOrder", OrderItemController.createOrderItem);

orderRouter.post("/deleteOrder", OrderController.deleteOrder);

orderRouter.get("/my-order", OrderController.getOrderByUserID);

orderRouter.get("/manage-order", OrderController.getOrderByUserID);


export default orderRouter;  