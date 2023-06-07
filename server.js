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

app.use(express.static('client/build'));
app.get('*', (req, res) => {
res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

/*app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
*/

app.listen(PORT, '0.0.0.0', function() {console.log(`Server running on port ${PORT}`)})