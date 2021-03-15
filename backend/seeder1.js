import fs from 'fs'
import mongoose from 'mongoose'
import colors from 'colors'
import dotenv from 'dotenv'

let url =
  'mongodb+srv://minhbb:12345678a@cluster0.grd6k.mongodb.net/d5-test?retryWrites=true&w=majority';

// Load models
import Testcase from './models/Testcase.model'

// Connect to DB
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Read JSON files
const testcases = JSON.parse(
  fs.readFileSync(`${__dirname}/demo.json`, 'utf-8')
);


// Import into DB
const importData = async () => {
  try {
    await Testcase.create(testcases);
    console.log('Data imported...'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// Delete data

const deleteData = async () => {
  try {
    await Testcase.deleteMany();
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
}
