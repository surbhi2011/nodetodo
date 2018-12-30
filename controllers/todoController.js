const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://test_surbhi:surbhi20@ds119343.mlab.com:19343/todo_surbhi');

//create a schema - blueprint
var todoSchema = mongoose.Schema({
  item : String
});

//create a model
var Todo = mongoose.model('Todo', todoSchema);

//create a data
// var itemOne = Todo({item : 'buy flowers' }).save(function(err){
//   if(err) throw err;
//   console.log('item saved');
// });

// var data = [{item: 'milk'}, {item: 'water'}, {item: 'fire'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});
//todo module
module.exports = function(app){

//for get requests
app.get('/todo',function(req,res){
  //get data from mongodb and pass it to view
  Todo.find({}, function(err, data){
    if(err) throw err;
    res.render('todo',{todos : data});
  });
});

//for post requests
app.post('/todo',urlencodedParser, function(req, res){
  //get data from the view and add it to mongodb
  var itemOne = Todo(req.body).save(function(err, data){
    if(err) throw err;
    //console.log('item saved');
    res.json(data);
  });
});

app.delete('/todo/:item',function(req,res){
  //delete the requested item from mongodb
  Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if(err) throw err;
      res.json(data);
  });
});

};
