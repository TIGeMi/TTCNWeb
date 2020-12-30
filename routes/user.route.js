import express from 'express';
import ProductController from '../controllers/product.controller.js';
import UserController from '../controllers/user.controller.js';
import CartController from '../controllers/cart.controller.js';
import CartItem from '../controllers/cart_item.controller.js'
const userRouter = express.Router();

userRouter.post("/login", UserController.validateUser)
userRouter.post("/register", UserController.registerUser)
userRouter.get('/', UserController.sessionStorage)
userRouter.get("/logout", UserController.logoutUser)
userRouter.get("/getSupllier", UserController.getSupllier)


userRouter.post("/checkEmail", UserController.checkEmail)
userRouter.post("/update-profile", UserController.updateUserProfile)

userRouter.get("/admin/manage-user", UserController.adminManageUser);
userRouter.get("/admin/manage-product", UserController.adminManageProduct);

userRouter.get("/profile", UserController.getUserProfile)
userRouter.post("/profile", UserController.updateUserProfile)


export default userRouter;  