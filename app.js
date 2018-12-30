var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

//set up view engine
app.set('view engine', 'ejs');

//for static files
app.use(express.static('./public'));

//fire controllers
todoController(app);

//port listen
app.listen(3000);
console.log('listening on port 3000');
