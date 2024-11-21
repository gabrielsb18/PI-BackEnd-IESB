require("dotenv").config();
const mongoose = require("mongoose");

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require("cors");
const rateLimit = require('express-rate-limit');

const notesRouter = require('./routes/router_notes')
const usersRouter = require("./routes/router_users")
const routerDocs = require("./routes/router_docs")

mongoose.connect(process.env.MONGODB_URL);

var app = express();
app.use(cors());

const limiter = rateLimit({
    windowMs: 20*60*1000,
    max: 600,
    message: {error: "Limite de requisições excedido, tente novamente mais tarde"},
    headers: true,
})

app.use(limiter);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/notes",notesRouter)
app.use("/users",usersRouter)
app.use("/api-docs",routerDocs)

module.exports = app;