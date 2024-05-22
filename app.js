require("dotenv").config();
const mongoose = require("mongoose");

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const notesRouter = require('./routes/router_notes')
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

mongoose.connect(process.env.MONDODB_URL);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use("/notes",notesRouter)

module.exports = app;