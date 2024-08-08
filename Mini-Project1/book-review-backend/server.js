
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const {createAdmin} = require('./scripts/setup')
const signupRoute = require("./routes/Signup")
const loginRoute = require("./routes/Login")
const bookRoutes = require("./routes/book_Route")

const app = express();
connectDB();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

console.log("server.js called")

createAdmin()
app.use("/",signupRoute)
app.use("/",loginRoute)
app.use("/",bookRoutes)



app.get("/", (req, res)=> {
    res.send("Hello World")
})



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
