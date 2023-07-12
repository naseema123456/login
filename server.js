const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const session = require('express-session');
const {v4 : uuidv4} =require('uuid');
const cookieParser = require('cookie-parser');

const router = require('./router')

const port = process.env.PORT || 4000;

//middlewares
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended : true}))

//view Engine
app.set('view engine', 'ejs');


app.use(session({
    secret: uuidv4(),  // secret uuid data
    resave: false,
    saveUninitialized: true,
  }));

  app.use(cookieParser());


  app.use((req, res, next) => {
    res.set("Cache-control", "no-store,no-cache");
    next();
  });

app.use('/route',router)

//home route
app.get('/', (req, res) => {
  if(req.session.user && req.cookies.password =='1234'){
    res.render('dashboard',{user:req.session.user, title: "Dashboard"})
} else {
    res.render('base', { title: "Login Page" });
}
})

app.listen(port, () => { console.log("Server started on : http://localhost:4000") })