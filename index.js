const express=require('express');
const app=express();
const cors=require('cors')
const path=require("path");

const port=process.env.PORT||1234;

app.use(cors())
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

const adminroutes= require('./apis/routes/adminroutes');

app.use('/admin',adminroutes);

app.use('**',express.static(path.join(__dirname, 'public/index.html')));

app.listen(port,function(){
    console.log('server up and running');
})