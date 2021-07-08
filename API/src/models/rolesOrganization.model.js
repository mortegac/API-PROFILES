const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrganizationSchema = Schema({
  // _id: Schema.Types.ObjectId,
  name: String,
  type: String,
  createdAt: { type: Date, default: Date.now },
}
// ,{ toJSON: { virtuals: true }}
,{ collection : 'organization' }
);

module.exports = mongoose.model('Organization', OrganizationSchema);