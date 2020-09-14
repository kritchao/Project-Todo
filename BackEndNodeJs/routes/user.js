const express = require('express')
const router = express.Router();
const userController = require('../controllers/user')
const passport = require('passport');


const authentication = passport.authenticate("jwt", { session: false });

router.get('/',authentication, userController.getUserInfo)
router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.put('/changePassword', userController.changePassword)

module.exports = router;