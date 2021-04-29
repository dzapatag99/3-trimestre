const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cursosSchema = new Schema({
    nombre: {
        type: String
    }, 
    descripcion: {
        type: String
    }
}, 
{ versionKey: false }
);

module.exports = mongoose.model('Cursos', cursosSchema);