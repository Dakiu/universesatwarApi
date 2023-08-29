const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Usuario = require('./models/usuarioModel')
const port = process.env.PORT ?? 3000;

app.use(express.json())

//routes
app.get('/', (req, res) =>{
    res.status(200).send('jjj');
});
//crea Usuario
app.post('/usuario', async (req, res) =>{

   try{
    const usuario = await Usuario.create(req.body)
    res.status(200).json(usuario);

   }catch(error){
        console.log(error.message);
        //res.status(500).send('fallo');
        res.status(500).json({message: error.message})

   }
});

//get Usuarios

app.get('/usuarios', async(req, res) =>{
    try{
        const usuarios = await Usuario.find({});
        res.status(200).json(usuarios);
    }catch(error){
        res.status(500).json({message: error.message});
    }
})

app.get('/usuarios/:id', async (req, res) =>{

    try{
        const {id} = req.params;
        const usuario = await Usuario.findById(id)
        res.status(200).json(usuario);
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//update
app.put('/usuarios/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const usuario = await Usuario.findByIdAndUpdate(id, req.body);
        // we cannot find any usuario in database
        if(!usuario){
            return res.status(404).json({message: `cannot find any usuario with ID ${id}`})
        }
        const updatedUsuario = await Usuario.findById(id);
        res.status(200).json(updatedUsuario);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//delete
app.delete('/usuario/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const usuario = await Usuario.findByIdAndDelete(id);
        if(!usuario){
            return res.status(404).json({message: `cannot find any usuario with ID ${id}`})
        }
        res.status(200).json(usuario);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.connect('mongodb+srv://admin:9fr2pJfgbNHJ1NVG@cluster0.xbfx86x.mongodb.net/node-api?retryWrites=true&w=majority')
.then(()=> {
    console.log('connected to mongoDB')
    app.listen(port, ()=>{
        console.log(`node running port ${port}`);
    });
    
}).catch((error)=>{
    console.log(error)
});

