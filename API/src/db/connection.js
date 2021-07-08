const mongoose = require('mongoose');
const env = require('node-env-file');
env(__dirname + '/.env');


const options = {
    useNewUrlParser: true,
    // reconnectTries: Number.MAX_VALUE,
    // reconnectInterval: 500, 
    connectTimeoutMS: 10000,
    useUnifiedTopology: true,
  };
  
const url = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=${process.env.MONGO_ROLE}`;
console.log(url);

mongoose.connect(url, options)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
  });
