const models = require('../../models');

const createArticle = (req, res) => {
    let name = req.body.name;
    let slug = req.body.slug;
    let image = req.body.image;
    let body = req.body.body;

    const newArticle = models.Article.create({
        name: name,
        slug: slug,
        image: image,
        body: body,
        published: new Date().toISOString().slice(0, 19).replace('T', ' ')
    }).then(article => {
        return res.status(200).json({ message: 'Added new article.'});
    }).catch(error => {
        return res.status(500).send(error.message);
    })
}

const editArticle = (req, res) => {
    return res.status(200).json({ message: 'patch'});
}

const getArticle = async (req, res) => {
  try {
    const [article, authors] = await Promise.all([
      models.Article.findByPk(req.params.id),
      models.Authors.findAll()
    ]);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if(!authors) {
        return res.status(404).json({ message: 'Authors not found' });
    }

    return res.status(200).json({
      article,
      authors
    });

  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = {createArticle, editArticle, getArticle};