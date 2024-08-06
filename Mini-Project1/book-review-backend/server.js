
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db')



const signupRoute = require("./routes/Signup")

const app = express();
connectDB();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
console.log("server.js called")

app.use("/",signupRoute)
app.get("/", (req, res)=> {
    res.send("Hello World")
})



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
