const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categories = await Category.findAll({
    include: [{model: Product}],
  });
  return res.status(200).json(categories);

});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryByID = await Category.findByPk(req.params.id, {
      include: [{model: Product}],
    });
    if(!categoryByID) {
      throw new Error("Category not found");
    }
    res.status(200).json(categoryByID);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
    category_name: req.body.category_name
  });
  if(!category_name) {
    res.status(404).json({ message: 'No category name entered!'});
    return;
  }
  res.status(200).json(newCategory)
  } catch (err) {
    res.status(500).json(err);
  }

});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const category = await Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id,
      }
    }
  );
  return res.json(category);
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const category = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });

  return res.json(category);
});

module.exports = router;
