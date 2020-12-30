import express from 'express';
import ejs from 'ejs';
import path from 'path';
import router from './routes/product.route.js';
import session from 'express-session';
import passport from 'passport';
import bodyParser from 'body-parser'
import cartRouter from './routes/cart.route.js';
import userRouter from './routes/user.route.js'
import orderRouter from './routes/order.route.js'
const app = express();

//ejs setting for html
var __dirname = path.resolve();
app.set('views', path.join(__dirname, 'views')); 
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');
//for css
app.use(express.static(__dirname + '/views'));
//for get data from form, ex req.body.name
app.use(express.urlencoded({extended:true}));
//session
app.use(session({
    secret:'abcd',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 1000 * 30
    }
}));

app.use("/", router);
app.use("/", cartRouter)
app.use("/", userRouter)
app.use("/", orderRouter)
const port = 3000;
app.listen(port, () => {
    console.log("node js is running")
});
// app.listen(port, "10.20.2.242")
