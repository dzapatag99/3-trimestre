const express = require('express');
const router = express.Router();

const cursosController = require('../controllers/cursosController');

module.exports = function() {
     
    // Muestra todos los cursos
    router.get('/cursos',cursosController.mostrarCursos);

    // muestra un Curso en especifico por su ID
    router.get('/cursos/:idCurso',  cursosController.mostrarCurso);

    // nuevo Curso
    router.post('/cursos', cursosController.nuevoCurso);    

    // Actualizar Cursos
    router.put('/cursos', cursosController.actualizarCurso);

    // Eliminar Cursos
    router.delete('/cursos/:idCurso', cursosController.eliminarCurso);

    return router;
};
