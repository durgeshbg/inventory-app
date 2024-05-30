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
  res.send('TODO: GET Catgory create');
});
exports.category_create_post = asyncHandler(async (req, res, next) => {
  res.send('TODO: POST Catgory create');
});
exports.category_update_get = asyncHandler(async (req, res, next) => {
  res.send('TODO: GET Catgory update');
});
exports.category_update_post = asyncHandler(async (req, res, next) => {
  res.send('TODO: POST Catgory update');
});
exports.category_delete_get = asyncHandler(async (req, res, next) => {
  res.send('TODO: GET Catgory delete');
});
exports.category_delete_post = asyncHandler(async (req, res, next) => {
  res.send('TODO: POST Catgory delete');
});
