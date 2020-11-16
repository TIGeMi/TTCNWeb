import conn from '../models/db.js'
import bcrypt from 'bcrypt';
// constructor
// const User = () => {};
function User() {};
User.prototype = {
    checkLogin : (email, password, result) => {
        find(email, (data) => {
            if(data) {
                if(bcrypt.compareSync(password, data.password)) {
                    result(null, res);
                    return;
                } 
            }
            else result(null, null);
        })
    },
    find : (email, result) => {
        console.log("dang find")
        conn.query("SELECT * FROM users WHERE email = ?", [email], (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }
            if(res.length) {
                result(null,res[0]);
            }
            else result(null, null)
          });
    },

    create : (email, password, name, result) => {
        password = bcrypt.hashSync(password,10);       
        conn.query("INSERT INTO users(email, password, name) VALUES (?, ?, ?)", [email, password, name], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            result(null, res)
        });
    },
    filler : (role, result) => {
        let isSupplier = -1;
        if(role == "customer") isSupplier = 0;
        else if(role == "supplier") isSupplier = 1;
        conn.query("SELECT * FROM users WHERE is_supplier = ?", [isSupplier], (err, res) => {
            if(err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.length) {
                console.log("found users : ", res);
                result(null, res);
                return;
            }
            result({ kind: "not_found" }, null);
            });
    }
}

export default User;