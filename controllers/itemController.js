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
  res.send('TODO: GET Item Create');
});
exports.item_create_post = asyncHandler(async (req, res, next) => {
  res.send('TODO: POST Item Create');
});
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
