// Importing and setting up express
const express = require('express');
const path = require('path');
const app = express()
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());

// Importing json file and defining projects variable
const routes = require('./routes/index');
const books = require('./routes/books');


// Setting up static route to public folder
app.use('/static', express.static(path.join(__dirname, '/public')))

//Set view Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', routes);
app.use('/books', books);

/* Error Handlers */

//404 page not found
app.use((req,res,next) => {
  const err = new Error("Sorry, we couldn't find the page you were looking for.");
  err.status = 404;
  next(err)
})

//Render Error Page
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('page-not-found', {header: "Page Not Found", style: '../static/stylesheets/style.css'});
})



app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

module.exports = app;