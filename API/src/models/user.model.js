const mongoose = require('mongoose');
const { isEmail } = require('validator');
const Schema = mongoose.Schema;
// const Organization = require('./rolesOrganization.model');

const UserSchema = Schema({
  // _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: [true, 'Please enter a name']
  },
  email: {
      type: String,
      required: [true, 'Please enter a email'],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email address']
  },
  password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [6, 'The password should be at least 6 characters long']
  },
  fechaNacimiento: String,
  sexo: String,
  tipoVivienda: String,
  usoVehiculo: String,
  createdAt: { type: Date, default: Date.now },
  organization: { 
    type: Schema.Types.ObjectId, 
    ref: 'Organization'
  },
  perfil: { 
    type: Schema.Types.ObjectId, 
    ref: 'roles_profile'
  },
  // organization : [{ type: Schema.Types.ObjectId, ref: 'organization' }],
  status: { type: Boolean, default: true },
  validated: { type: Boolean, default: false }
}
,{ collection : 'electric-cars-users' }
// ,{ toJSON: { virtuals: true }}
);




  // this.findOne({ email: email })
  //   .populate('organization')
  //   .then( (result)=>{

  //     console.log('-result-', result);
  //     return result;
  //   });


UserSchema.statics.login = async function( email, password){
  const user = await this.findOne({ email }).populate('organization').exec();
  console.log('-user-', user);
  return user;

  if(user){
     return user; 
  }
  throw Error('Clave incorrecta')

}

module.exports = mongoose.model('Users', UserSchema);



// module.exports = mongoose.model('user', UserSchema);