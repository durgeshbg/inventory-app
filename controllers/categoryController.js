const Category = require('../models/category');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const debug = require('debug')('item:');

exports.category_list = asyncHandler(async (req, res, next) => {
  res.send('TODO: GET Category list');
});
exports.category_detail = asyncHandler(async (req, res, next) => {
  res.send('TODO: GET Catgory detail');
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
