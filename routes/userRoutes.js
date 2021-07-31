const { Router } = require('express');
const { signUp, login } = require('../controllers/authController');

const router = Router();

router.post("/signup", signUp);
router.post("/login", login);


module.exports = router