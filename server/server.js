
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

//to recongnize request object as a JSON object.
app.use(express.json())

//to recongnize request object as a string or  an array.
app.use(express.urlencoded({extended:true}))

//A built into the browser feature that 
//takes care of cross origin resource sharing
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(cookieParser())

require("./config/mongoose.config")

require("./routes/city.routes")(app)
require("./routes/user.routes")(app)

app.listen(process.env.MY_PORT, ()=>console.log(`You are connected to port ${process.env.MY_PORT}`))