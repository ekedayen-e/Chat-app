const express = require('express')
const router = express.Router()
const control = require('../controllers/controller')

router.get('/register', (req, res, next) => {
    res.status(200).send({
        success: 'true',
        message: "Testing API",
        version: "1.0.0"
    })
})

router.post('/register', control.register) 
router.post('/login', control.login) 
router.get('/user', control.authenticateToken, control.user)
router.post('/refresh', control.refresh)
router.post('/logout', control.logout)

module.exports = router