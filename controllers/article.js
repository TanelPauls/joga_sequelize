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
    include: [
      {
        model: models.Authors
      },
      {
        model: models.Tags,
        through: {
          models: models.ArticleTag
        }
      }
    ],
  }).then(article => {
    return res.status(200).json({article})
  }).catch(error=> {
    return res.status(500).send(error.message);
  })
}

module.exports = {getAllArticles, getArticleBySlug};