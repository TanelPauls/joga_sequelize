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

const getAllArticles = (req, res) => {
  models.Article.findAll().then(articles => {
      return res.status(200).json({articles});
  }).catch(error => {
      return res.status(500).send(error.message);
  })
}

const getArticleBySlug = (req, res) => {
  models.Article.findOne({
    where: {
      slug: req.params.slug
    },
    include: [{
      model: models.Authors
    }],
  }).then(article => {
    return res.status(200).json({article})
  }).catch(error=> {
    return res.status(500).send(error.message);
  })
}

module.exports = {getAllArticles, getArticleBySlug};