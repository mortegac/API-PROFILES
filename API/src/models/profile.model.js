const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = Schema({
  name: String,
  pages: [{ type: Schema.Types.ObjectId, ref: 'roles_pages', autopopulate: true }],
},{ collection : 'roles_profile' },
{ timestamps: true }
);

ProfileSchema.plugin(require('mongoose-autopopulate'));


module.exports = mongoose.model('Profile', ProfileSchema);
