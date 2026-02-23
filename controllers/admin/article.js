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

const editArticle = async (req, res) => {
  try {
    const [updated] = await models.Article.update(
      {
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        body: req.body.body,
        author_id: req.body.author_id,
        published: new Date()
      },
      {
        where: { id: req.params.id }
      }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Article not found' });
    }

    return res.status(200).json({ message: 'Article updated.' });

  } catch (error) {
    return res.status(500).send(error.message);
  }
};

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

const deleteArticle = async (req, res) => {
  try {
    const article = await models.Article.findByPk(req.params.id);

      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }

      await article.destroy();
      return res.status(200).json({message: "Article deleted."})
  } catch (error) {
    return res.status(200).json({message: "yes"});
  }
}

module.exports = {createArticle, editArticle, getArticle, deleteArticle};