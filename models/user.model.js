import conn from '../models/db.js'
import bcrypt from 'bcrypt';
// constructor
// const User = () => {};
function User() {};
User.prototype = {
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
    checkLogin : (email, password, result) => {
        conn.query("SELECT * FROM users WHERE email = ?", [email], (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }
            if(res.length) {
                console.log("co email nay")
                let data = res[0]
                if(bcrypt.compareSync(password, data.password)) {
                    console.log("dung pass")
                    console.log(data)
                    result(null, data);
                } 
                else {
                    console.log("sai pass")
                    result(null,false)
                };
            }
            else result(null, false)
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
    update : (user_info, result) => {
        let newPassword = bcrypt.hashSync(user_info[0],10);
        user_info[0] = newPassword
        conn.query("UPDATE users SET password = ?, name = ?, address = ?, phone = ?  WHERE id = ?", 
        user_info, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, false);
            return;
        }
        console.log("res", res)
        console.log(res.affectedRows)
        result(null, res.affectedRows)
        })
    },
    filler : (role, result) => {
        let role_id = -1;
        if(role == "customer") role_id = 0;
        else if(role == "supplier") role_id = 1;
        conn.query("SELECT * FROM users WHERE role = ?", [role_id], (err, res) => {
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
    },
    setSupplier : (user_id, result) => {
        conn.query("UPDATE users SET role = 1 WHERE id = ? ", [user_id], (err, res) => {
            if(err) {
                console.log("error: ", err);
                result(null, err);
                return
            }
            result(null, true)
        })
    }
}

export default User;