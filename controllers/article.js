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

const Article = require('../models/article.js')(sequelize, Sequelize.DataTypes);

const getAllArticles = (req, res) => {
    Article.findAll().then(articles => {
        return res.status(200).json({articles});
    }).catch(error => {
        return res.status(500).send(error.message);
    })
}

const getArticleBySlug = (req, res) => {
  Article.findOne({
    where: {
      slug: req.params.slug
    }
  }).then(article => {
    return res.status(200).json({article})
  }).catch(error=> {
    return res.status(500).send(error.message);
  })
}

module.exports = {getAllArticles, getArticleBySlug};