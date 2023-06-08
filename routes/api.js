const express = require('express')
const router = express.Router()
const control = require('../controllers/controller')


router.post('/register', control.register) 
router.post('/login', control.login) 
router.get('/refresh', control.refresh)
router.get('/logout', control.logout)
router.post('/create-chat', control.createChat)
router.get('/get-chats/:origin', control.getChats)
router.post('/send', control.sendMessage)
router.get('/get-messages/:id', control.getMessages)
router.get('/chat-cookies/:id', control.storeChat)
router.delete('/delete-chat/:id', control.deleteChat)

module.exports = router