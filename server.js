const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
var fs = require('fs');
const routes = require("./routes/api")
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieparser = require('cookie-parser');
const path = require('path')
app.use(cookieparser())
app.use(express.json())
const http = require('http')
const {Server} = require('socket.io')
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'DELETE']
    }
})

io.on('connection', (socket) => {
    socket.on('message', (data) => {
        io.emit('messageResponse', data)
      });
})

/*io.on('message', (data) => {
    console.log('message received')
    io.emit('messageResponse', data)
})
*/



const corsOptions = {
    origin: true,
    credentials: true,
}
app.use(cors(corsOptions))


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    );
    if ("OPTIONS" == req.method) {
      res.send(200);
    } else {
      next();
    }
  });

app.use(routes)
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
app.use(express.static('client/build'));
app.get('*', (req, res) => {
res.sendFile(path.join(__dirname + '/client/build/index.html'));
});
}

/*app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
*/

server.listen(PORT, '0.0.0.0', function() {})

