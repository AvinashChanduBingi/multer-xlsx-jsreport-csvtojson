var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const multer = require("multer");
const session = require("express-session");
const mongoose = require("mongoose");
require("dotenv").config();
var app = express();

mongoose.connect(process.env.MONGO_URL).then(console.log("Connnected to MongoDB"));

app.use(session({
  secret: 'Zeroooo',
  resave: false,
  saveUninitialized: false
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('uploads', path.join(__dirname, 'uploads'));

const storage = multer.diskStorage({
            destination : (req,file,func)=>{
                func(null,'uploads/');
            },
            filename : (req,file,func)=>
            {
                func(null,file.originalname);
            }
        });

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.listen(3090,()=>{console.log("connected to port")});

module.exports = app;
