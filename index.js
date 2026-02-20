require("dotenv").config();

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql"
  }
);

sequelize.authenticate().then(() => {console.log('Connected to the database.');}).catch(err => {
    console.error('Unable to connect to database', err);
})

const articleRouter = require('./routes/article.js');
const authorRouter = require('./routes/author.js')

app.use('/', articleRouter);
app.use('/article', articleRouter);
app.use('/author', authorRouter);

app.listen(6013, "0.0.0.0", ()=>{
    console.log('App is started at http://localhost:6013')
})