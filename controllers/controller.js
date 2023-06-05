const db = require('../config/db')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


exports.logout = async(req, res) => {
    res.cookie('refreshToken', '', {maxAge: 0});
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
            res.json({accessToken})

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
    if(req.cookies?.refreshToken) {
        const refreshToken = req.cookies.refreshToken;
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,(err,decoded) => {
            if(err) { return res.status(401).send({message: "Unauthorized"})}
            else {
            const accessToken = generateAccessToken({email: decoded.email, name: decoded.name})
            return res.json({accessToken})
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

exports.user = async (req, res) => {
    let email = req.userId.email
    const user = await db.query(
        `SELECT * FROM users WHERE email= $1`, [email]
    )
    let result = user.rows[0]
    res.json(result)
    //res.json(req.userId);
}