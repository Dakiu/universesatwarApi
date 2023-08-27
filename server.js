const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Usuario = require('./models/usuarioModel')
const port = process.env.PORT ?? 3000;

app.use(express.json())

mongoose.connect('mongodb+srv://admin:9fr2pJfgbNHJ1NVG@cluster0.xbfx86x.mongodb.net/node-api?retryWrites=true&w=majority')
.then(()=> {
    console.log('connected to mongoDB')
    app.listen(port, ()=>{
        console.log(`node running port ${port}`);
    });
    
}).catch((error)=>{
    console.log(error)
});




//routes
app.get('/', (req, res) =>{
    res.status(200).send('jjj');
});

app.post('/usuario', async (req, res) =>{
   // console.log(req.body)
   // res.send(req.body);

   try{
    const usuario = await Usuario.create(req.body)
    res.status(200).json(usuario);
    //res.send('ok')

   }catch(error){
        console.log(error.message);
        res.status(500).send('fallo');
        //req.status(500).json({message: error.message})

   }

});

