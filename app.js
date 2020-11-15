const express=require('express');
const app=express();
const weatherRoute=require("./routes/weather")

app.set('view engine', 'ejs');

//Middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));

//Middleware route
app.use('/', weatherRoute);

const port=process.env.PORT || 3000;

app.listen(port, ()=>
    console.log(`Sever listening at ${port}`)
)