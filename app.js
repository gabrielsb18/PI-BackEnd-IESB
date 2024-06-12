require("dotenv").config();
const mongoose = require("mongoose");

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const notesRouter = require('./routes/router_notes')
const usersRouter = require("./routes/router_users")
const routerDocs = require("./routes/router_docs")

mongoose.connect(process.env.MONGODB_URL);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/notes",notesRouter)
app.use("/users",usersRouter)
app.use("/api-docs",routerDocs)

module.exports = app;