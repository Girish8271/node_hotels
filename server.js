// const express = require('express');
// const app = express();

// const bodyParser = require('body-parser');

// app.use(bodyParser.json());

// app.listen(3000, () =>{
//     console.log('Server is running on port 3000')
// });

// app.get('/', (requst, response) => {
//     response.send('Hello World, kese ho sare');
// });

// app.post('/api/cars', (resuest, pesponse) =>{
//    const {name, brand} = request.body;
//    console.log(name);
//    console.log(brand);
//    res.send("cars submitted successfully.")
// })

// const add = (a,b) =>{return a+b};
// const add = (a,b) => a+b;

// const result = add(5,11);
// console.log(result);

// Run Automatically This Functions
// (function(){
//     return console.log("This is Girish Kumar");
// }())

// function callback (){
//     return console.log("CallBack Functions is Calling");

// }

// const add =  function(a,b,callback){
//     var result = a+b
//     console.log("Result",result);
//     callback();
// }

// add(4,5,callback)

// var _ = require('lodash');
// var fs = require('fs');
// var os = require('os');

// const user = os.userInfo();
// fs.appendFile('greating.txt', 'Hi'+ user.username, ()=>{
//     console.log('Greeting saved!');
// })

// const arr = ['Geeta',1,3,4,'Potato','1','3',4,3,2,1];

// const uniqueArr = _.uniq(arr);

// console.log(uniqueArr)

const express = require("express");
const app = express();
const db = require("./db");

const bodyParser = require('body-parser')
app.use(bodyParser.json());

const personRoute = require('./routes/personRoute');
const menuRoute = require('./routes/menuRoute');
app.use('/person',personRoute)
app.use('/menu',menuRoute)


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
