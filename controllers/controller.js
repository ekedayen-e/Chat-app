const db = require('../config/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { uuid } = require('uuidv4');


exports.logout = async(req, res) => {
    res.cookie('refreshToken', '', {maxAge: 0});
    res.cookie('chatid', '', {maxAge: 0})
    res.send({message: 'Logged out'})

}

exports.register = async (req, res) => {
    const {first_name, last_name, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)
    const {rows} = await db.query(
        "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)",
        [first_name, last_name, email, hashedPassword]
    );

    res.status(201).send("User succesfully registered!")
};

exports.login = async (req,res) => {
    let result;
    let email = req.body.email
    const user = await db.query(
        `SELECT * FROM users WHERE email= $1`, [email]
    )
    try{
        result = user.rows[0]
        
    } catch(err) {
        return res.status(400).send("User doesn't exist")
    }

    try{
        if(await bcrypt.compare(req.body.password, result.password)) {
            const user = {email: req.body.email, name: result.first_name}
            const accessToken = generateAccessToken(user)
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'})
            res.cookie('refreshToken', refreshToken, {httpOnly: true,
                /*sameSite: 'None', secure: false,*/
                maxAge: 24 * 60 * 60 * 1000})
            //req.info = result;
            res.json({email: req.body.email, name: result.first_name, accessToken: accessToken})

        } else {
            return res.status(406).send("Wrong username/password combination!")
        }
    }
    catch {
        res.status(500).send()
    }

}

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30s'})
}

exports.refresh = (req, res) => {
    let chatid;
    if(req.cookies?.refreshToken) {
        if(req.cookies?.chatid) {
            chatid = req.cookies.chatid
        }
        const refreshToken = req.cookies.refreshToken;
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,(err,decoded) => {
            if(err) { return res.status(401).send({message: "Unauthorized"})}
            else {
            const accessToken = generateAccessToken({email: decoded.email, name: decoded.name})
            return res.json({email: decoded.email, name: decoded.name, accessToken: accessToken, chatid: chatid})
        }
        });
    } else {
        return res.status(406).json({ message: 'Unauthorized' });
    }
}

exports.authenticateToken = (req,res,next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.sendStatus(401)
        req.userId = decoded
        next();
    })
}

exports.createChat = async(req, res) => {
    let origin = req.body.origin;
    let recipient = req.body.recipient;
    let id = uuid();
    console.log(origin)
    const result = await db.qchats(
        "INSERT INTO chats (id, origin, recipient) VALUES ($1, $2, $3)",
        [id, origin, recipient]
    )
    res.json({id})
}

exports.storeChat = (req, res) => {
    let id = req.params.id
    res.cookie('chatid', id, {httpOnly: true,
        /*sameSite: 'None', secure: false,*/
        maxAge: 24 * 60 * 60 * 1000})
    return res.json({message: 'Chat stored!'})
}

exports.deleteChat = async(req,res) => {
    let id = req.params.id
    res.cookie('chatid', '', {maxAge: 0})

    const other = await db.qchats(
        "DELETE FROM messages WHERE id = $1",
        [id]
    )

    const result = await db.qchats(
        "DELETE FROM chats WHERE id = $1",
        [id]
    )
    
    res.json({message: 'Chat succesfully deleted'})
}

exports.getChats = async(req, res) => {
    let origin = req.params.origin
    const result = await db.qchats(
        `SELECT * FROM chats WHERE origin= $1 OR recipient= $1`, [origin]
    )
    return res.json(result.rows)
}

exports.sendMessage = async(req, res) => {
    let id = req.body.id
    let topic = req.body.topic
    let sent_by = req.body.sent_by
    const result = await db.qchats(
        "INSERT INTO messages (id, topic, sent_by) VALUES ($1, $2, $3)",
        [id, topic, sent_by]
    )
    res.json({messages: 'Message sent sucessfully'})
}

exports.getMessages = async(req, res) => {
    let id = req.params.id
    const result = await db.qchats(
        `SELECT * FROM messages WHERE id= $1`, [id]
    )
    return res.json(result.rows)
}