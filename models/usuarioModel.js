const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Please enter name"]
        },
        password:{
            type: String,
            required: true,
            default: 0
        },
        image:{
            type:String,
            require:false
        }
        
    },
    {
        timestamps: true
    }
)

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.export = Usuario;