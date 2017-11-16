const express=require('express');
const app=express();
const path=require('path');

app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');
app.set('views','views');

const port=process.env.PORT||3000;
app.get('/',(req,res)=>{
    res.render('index');
})

app.listen(port,(err)=>{
    if(err) throw err;
    console.log('listenning on port '+ port);
})


