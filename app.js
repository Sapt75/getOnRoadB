// express is required
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const path = require("path")
const body_parser = require("body-parser")

dotenv.config({ path: './config.env' });
require('./db/conn');
// const user = require('./model/userSchema');


let data = __dirname.split("\\")
let dir = ""

for(let i=0;i<data.length;i++){
    if(i == data.length-1){
        break
    }else{
        dir = dir + data[i] + "\\"
    }
}

console.log(dir)

app.use(express.static(path.join(dir+'frontend_New11-04-23\\build', 'index.html')))

app.use(express.json());
app.use(cors())
app.use(require('./router/auth'));

// app.use();
app.use(body_parser.urlencoded({ extended: true }))


// const DB =`mongodb+srv://admin:admin%40webshark@cluster0.mdurdqc.mongodb.net/onroadprice?retryWrites=true&w=majority`;
const PORT = process.env.PORT

// Middleware
const middleware = (req, res, next) => {
    console.log(`Middleware`);
    next();
}
// middleware();


// app.get('/', (req, res) =>{
//     res.send(`Hello World from the server a`)
// });

// app.get('/form', (req, res) =>{
//     res.send(`Lead Form`)
// });
// app.get('/test-page', middleware, (req, res) =>{
//     console.log(`Test Rule`)
//     res.send(`Test Page`)
// });
// app.get('/test', middleware, (req, res) =>{
//     res.send(`test page`)
// });


app.listen(PORT, () => {
    console.log(`server is running at port no ${PORT}`);
})

// console.log(`Sucess`);