import conn from '../models/db.js'
import Product from '../models/product.model.js'

const product = new Product();

const view = (req, res, categoryID) => {
    conn.connect( err => {
        conn.query("SELECT * FROM products", (err, result, fields) => {
            if(err) throw err;
            res.render('product', {
                list : result
            })
        })
    })
}
const findAll = (req, res) => {
    product.getAll((err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving customers."
            });
        else {
            console.log(data);
            res.render('product', {
                list : data
            })}
        });
  };

const getOne = (req, res) => {
    console.log(req.query.ProductID)
    product.getProductByID(req.query.ProductID,(err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: 'Not found Customer with id ' + req.query.ProductID
              });
            } else {
              res.status(500).send({
                message: "Error retrieving Customer with id " + req.query.ProductID
              });
            }
        } else res.render('single', {
            product: data
        })
  });
}

const addProduct = (req,res) => {
    let newProduct = [
        req.body.category,
        req.body.name,
        req.body.description,
        20,//quantity
        1,//brandID
        req.session.user.id,//100,
        req.body.price,
        20000,//salePrice
        'https://lapvip.vn/upload/products/thumb_350x0/dell-xps-13-9310-windows-10-1602586942.jpg',
        1
    ];
    console.log(newProduct);
    product.create(newProduct, (err, data) => {
        if (err) throw err;
        if(data) res.render('addSuccess', {
            ketqua: "thanh cong"
        })
        else res.render('addSuccess', {
            ketqua: "that bai"
        })
    })
}
export default {view, findAll, getOne, addProduct};