require("dotenv").config();

const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));


app.use('/', (req, res) => {res.json({ message: "Welcome to sequelize application"})});

app.listen(6013, "0.0.0.0", ()=>{
    console.log('App is started at http://localhost:6013')
})