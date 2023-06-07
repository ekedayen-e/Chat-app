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
router.get('/refresh', control.refresh)
router.get('/logout', control.logout)
router.post('/create-chat', control.createChat)
router.get('/get-chats/:origin', control.getChats)
router.post('/send', control.sendMessage)
router.get('/get-messages/:id', control.getMessages)

module.exports = router