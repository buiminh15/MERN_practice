import express from 'express'
import createError from 'http-errors'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import { config } from './helper/configHelper'
import filesRoute from './routes/files.route'
import mongoose from 'mongoose'
import session from 'express-session'
import MongoStore from 'connect-mongo'

require('dotenv').config()
var app = express();

// mongoose.Promise = global.Promise
// mongoose.connect(config.MONGO.URL, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true,
// })

// const connection = mongoose.createConnection(dbString, dbOptions)

// const sessionStore = new MongoStore({
//   mongooseConnection: connection,
//   collection: 'sessions'
// })

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())
app.use(helmet())
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: config.MONGO.URL, mongoOptions: config.MONGO.OPTIONS, collectionName: config.MONGO.SESSION_NAME }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // Equals 1 day
}))


app.use('/api/v1/', filesRoute);
app.use('/', (req, res, next) => {
  res.send('hello world')
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => {
  console.log(' App is running ...');
})

export default app;
