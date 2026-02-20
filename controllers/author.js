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
const models = require('../models');

const getArticlesByAuthorId = (req, res) => {
  models.Article.findAll().then(authors => {
      return res.status(200).json({message: 'yes'});
  }).catch(error => {
      return res.status(500).send(error.message);
  })
}


module.exports = {getArticlesByAuthorId};