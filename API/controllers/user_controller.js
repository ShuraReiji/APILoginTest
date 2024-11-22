const database = require('../models/connection_db')
const userModel = require('../models/user_model')

const addUserAccount = (req, res, next) => {
  let UserName = req.body.name;
  let UserPass = req.body.pass;
  let UserEmail = req.body.email;
  let ContactNumber = req.body.contnumber;

  if (UserName == "" || UserName == null || UserPass == "" || UserPass == null || ContactNumber == "" || ContactNumber == null) {
    res.status(404).json({
      successful: false,
      message: "user name, user password, or contact number is not defined"
    })
  } else {
    //USER NAME MUST NOT BE EXISTING
    let query = `SELECT user_name FROM userinfo_tbl WHERE user_name = '${UserName}'`

    database.db.query(query, (err, rows, result) => {
      if (err) {
        res.status(500).json({
          successful: false,
          message: err
        })
      } else {
        if (rows.length > 0) {
          res.status(400).json({
            successful: false,
            message: "Account is already exists."
          })
        } else {
          let insertQuery = `INSERT INTO userinfo_tbl SET ?`
          let userObj = userModel.user_model(UserName, UserPass, UserEmail, ContactNumber)

          database.db.query(insertQuery, userObj, (err, rows, result) => {
            if (err) {
              res.status(500).json({
                successful: false,
                message: err
              })
            } else {
              res.status(200).json({
                successful: true,
                message: "Successfully added an Account!"
              })
            }
          })
        }
      }
    })
  }
}

const register = async (req, res, next) => {
  let user_name = req.body.UserName
  let password = req.body.password

  if (user_name == "" || user_name == null || password == "" || password == null) {
    res.status(400).json({
      successful: false,
      message: "Missing Username or Password"
    })
  } else {
    let searchQuery = `SELECT username from users_tbl WHERE username = '${user_name}'`

    database.db.query(searchQuery, async (error, rows, result) => {
      if (error) {
        res.status(500).json({
          successful: false,
          message: error
        })
      } else {
        if (rows.length == 0) {
          let insertQuery = `INSERT INTO users_tbl SET ?`
          let hashedPassword = await bcrypt.hash(password, 10)
          let users_json = userModel.user_model(user_name, hashedPassword)

          database.db.query(insertQuery, users_json, (error, rows, result) => {
            if (error) {
              res.status(500).json({
                successful: false,
                message: error
              })
            } else {
              res.status(200).json({
                successful: true,
                message: "Account created successfully! :)"
              })
            }
          })
        } else {
          res.status(500).json({
            successful: false,
            message: "Username already exists."
          })
        }
      }
    })
  }
}

module.exports = {
  addUserAccount,
  register
}
