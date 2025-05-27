const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const expressSession = require('express-session');
const flash = require('connect-flash');

require('dotenv').config();

const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const indexRouter = require('./routes/index');
const { connectDb } = require('./middlewares/db.js');

app.use(express.json());
app.use(express.urlencoded({extended:true})); 
app.use(cookieParser());

app.use(
    expressSession({
        resave:false,// dont save it again 
        saveUninitialized : false,// dont create the session of someone who is not logged in 
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
);
app.use(flash()); // to use flash message, flash message is a temporary message stored in the session and removed after being displayed once. It is commonly used for notifications, success messages, or errors when redirecting users to another page


app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');

app.use('/',indexRouter);
app.use('/owners',ownersRouter);
app.use('/users',usersRouter);
app.use('/products',productsRouter);

app.listen(3000,()=>{
    connectDb();
    console.log('running');
});