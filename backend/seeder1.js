const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
let url =
  'mongodb+srv://minhbb:12345678a@cluster0.grd6k.mongodb.net/d5-test?retryWrites=true&w=majority';

// Load models
const Login = require('./models/Login.model');

// Connect to DB
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Read JSON files
const logins = JSON.parse(
  fs.readFileSync(`${__dirname}/demo.json`, 'utf-8')
);


// Import into DB
const importData = async () => {
  try {
    await Login.create(logins);
    console.log('Data imported...'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

const getAllData = async () => {
  try {
    await Login.find({}, (err, datas) => {
      console.log('datas: '.green.inverse, datas);
    });
    process.exit();
  } catch (error) {
    console.error(error);
  }
}

// Delete data

const deleteData = async () => {
  try {
    await Login.deleteMany();
    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};


if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else if (process.argv[2] === '-s') {
  getAllData();
}
