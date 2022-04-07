const mongoose = require("mongoose");

//const cityDB = "cityDB";

mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`,{
    // below two options are to handle deprecation warnings 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>{
        //to know if connected to the db
        console.log(`You are connected to the database called ${process.env.DB_NAME}`)
    })
    .catch((err)=>{
        console.log(`You are not connected to the database ${process.env.DB_NAME}. Error:`, err)
    })
