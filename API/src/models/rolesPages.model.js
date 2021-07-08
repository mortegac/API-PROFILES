const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PagesSchema = new Schema({
  pageText: String,
  pageLink: String,
  createdAt: { type: Date, default: Date.now },
},{ collection : 'roles_pages' });

module.exports = mongoose.model('roles_pages', PagesSchema);