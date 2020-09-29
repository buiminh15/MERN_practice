var createError = require('http-errors');
var express = require('express');
var dotenv = require('dotenv');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connectDB = require('./config/db');
var colors = require('colors');
var fileupload = require('express-fileupload');
var errorHandler = require('./middlewares/error');
var bootcampsRouter = require('./routes/bootcamps');
var coursesRouter = require('./routes/courses');
var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var reviewsRouter = require('./routes/reviews');
var mongoSanitize = require('express-mongo-sanitize');
var helmet = require('helmet');
var xss = require('xss-clean');
var rateLimit = require("express-rate-limit");
var hpp = require('hpp');
var cors = require('cors');
// Load env vars
dotenv.config({ path: './config/config.env' });

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

// Connect to DB
connectDB();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileupload());
app.use(express.static(path.join(__dirname, 'public')));
// Sanitize data
app.use(mongoSanitize());
// Set security headers
app.use(helmet());
// Prevent XSS attacked
app.use(xss());

app.use(limiter);

// Prevent HTTP pollution
app.use(hpp());

// Enable CORS
app.use(cors());

app.use('/api/v1/bootcamps', bootcampsRouter);
app.use('/api/v1/courses', coursesRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/reviews', reviewsRouter);
app.use(errorHandler);

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

module.exports = app;
