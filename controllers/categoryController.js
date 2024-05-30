const Category = require('../models/category');
const Item = require('../models/item');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const debug = require('debug')('item:');

exports.category_list = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({}).exec();
  res.render('category_list', { title: 'Categories List', categories });
});

exports.category_detail = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();
  const items = await Item.find({ category: req.params.id }).exec();
  if (category === null) {
    const err = new Error('Category not found!');
    err.status = 404;
    next(err);
  }
  res.render('category_detail', { title: 'Category Detail', category, items });
});

exports.category_create_get = asyncHandler(async (req, res, next) => {
  res.render('category_create', { title: 'Create Category' });
});

exports.category_create_post = [
  body('name', 'Name too small').trim().isLength({ min: 2 }).escape(),
  body('description', 'Description too small').trim().isLength({ min: 10 }).escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });
    if (!errors.isEmpty()) {
      res.render('category_create', {
        title: 'Create Category',
        category,
        errors: errors.array(),
      });
    } else {
      await category.save();
      res.redirect(category.url);
    }
  }),
];

exports.category_update_get = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id).exec();
  if (category === null) {
    const err = new Error('Category not found!');
    err.status = 404;
    next(err);
  }
  res.render('category_create', { title: 'Update Category', category });
});

exports.category_update_post = [
  body('name', 'Name too small').trim().isLength({ min: 2 }).escape(),
  body('description', 'Description too small').trim().isLength({ min: 10 }).escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      _id: req.params.id,
    });
    if (!errors.isEmpty()) {
      res.render('category_create', {
        title: 'Update Category',
        category,
        errors: errors.array(),
      });
    } else {
      const updatedCategory = await Category.findByIdAndUpdate(req.params.id, category, {});
      res.redirect(updatedCategory.url);
    }
  }),
];

exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send('TODO: GET Catgory delete');
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send('TODO: POST Catgory delete');
});
