import express from 'express';
import ProductController from '../controllers/product.controller.js';
import UserController from '../controllers/user.controller.js';
import CartController from '../controllers/cart.controller.js';
const router = express.Router();



router.get("/single", ProductController.getOne)
router.get("/product", ProductController.findAll)


router.post("/login", UserController.validateUser)
router.post("/register", UserController.getLatestUserID)
router.get('/', UserController.loginUser)
router.get("/logout", UserController.logoutUser)
router.post("/addProduct", ProductController.addProduct)

router.get("/getSupllier", UserController.getSupllier)


router.post("/checkEmail", UserController.checkEmail)
router.get("/checkEmail", UserController.testLogin)

router.get("/a", [(req, res, next) => {console.log("function 1"); next()}, (req, res)=> {console.log("function 2")}])
export default router;  