const express = require('express')
const router = new express.Router()
const utilities = require('../utilities')
const accountController = require('../controllers/accountController')
const accountValidate = require('../utilities/account-validation')

/* *************
* Build View
************* */
// login view
router.get('/login', utilities.handleErrors(accountController.buildLogin))

// register view
router.get('/register', utilities.handleErrors(accountController.buildRegister))

// account management view
router.get('/',
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildManagement))

// process logout  
router.get(
  "/logout",
  utilities.handleErrors(accountController.accountLogout)
)

// edit account management view
router.get('/edit-account/:account_id',
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildUpdateView)
 )

/* *************
* Process view
************* */
// process register
router.post(
    '/register', 
    accountValidate.registrationRules(),
    accountValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount))

// Process login
router.post(
    "/login",
    accountValidate.loginRules(),
    accountValidate.checkLoginData,
    utilities.handleErrors(accountController.accountLogin)
  )

// Process update account
router.post(
  "/update",
  accountValidate.updateRules(),
  accountValidate.checkUpdateData,
  utilities.handleErrors(accountController.updateAccount)
)

// Process update password
router.post(
  "/updatePW",
  accountValidate.updatePWRules(),
  accountValidate.checkUpdatePWData,
  utilities.handleErrors(accountController.updatePassword)
)

// Process delete account
router.post(
  '/deleteAccount',
  utilities.handleErrors(accountController.deleteAccount)
)

module.exports =router