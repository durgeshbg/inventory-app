const Item = require('../models/item');
const Category = require('../models/category');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const debug = require('debug')('item:');

exports.index = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({}).exec();
  const items = await Item.find({}).exec();
  res.render('index', { title: 'Home', items, categories });
});

exports.item_list = asyncHandler(async (req, res, next) => {
  const items = await Item.find({}).populate('category').exec();
  res.render('item_list', { title: 'Items List', items });
});

exports.item_detail = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id).populate('category').exec();
  if (item === null) {
    const err = new Error('Item not found!');
    err.status = 404;
    next(err);
  }
  res.render('item_detail', { title: 'Item Detail', item });
});

exports.item_create_get = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({}).exec();
  res.render('item_create', { title: 'Create Item', categories });
});

exports.item_create_post = [
  body('name', 'Name too small').trim().isLength({ min: 2 }).escape(),
  body('description', 'Description too small').trim().isLength({ min: 10 }).escape(),
  body('price', 'Invalid price').trim().toInt().isLength({ min: 1 }).escape(),
  body('number_in_stock', 'Invalid stock number')
    .trim()
    .toInt()
    .isLength({ min: 1 })
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const item = new Item({
      category: req.body.category,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock,
    });
    if (!errors.isEmpty()) {
      res.render('item_form', {
        title: 'Create Item',
        item,
        categories,
        errors: errors.array(),
      });
    } else {
      await item.save();
      res.redirect(item.url);
    }
  }),
];

exports.item_update_get = asyncHandler(async (req, res, next) => {
  res.send('TODO: GET Item Update');
});

exports.item_update_post = asyncHandler(async (req, res, next) => {
  res.send('TODO: POST Item Update');
});

exports.item_delete_get = asyncHandler(async (req, res, next) => {
  res.send('TODO: GET Item Delete');
});

exports.item_delete_post = asyncHandler(async (req, res, next) => {
  res.send('TODO: POST Item Delete');
});
