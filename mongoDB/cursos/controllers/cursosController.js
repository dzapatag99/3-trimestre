const Cursos = require('../models/Cursos');

// Muestra todos los cursos
exports.mostrarCursos = async (req, res, next) => {
    try {
        // obtener todos los cursos
        const cursos = await Cursos.find({});
        res.json(cursos);
    } catch (error) {
        console.log(error);
        next();
    }
};

// Muestra un curso en especifico por su ID
exports.mostrarCurso = async (req, res, next) => {
    const curso = await Cursos.findById(req.params.idCurso);

    if(!curso) {
        res.json({mensaje : 'Ese Curso no existe'});
        return next();
    }

    // Mostrar el curso
    res.json(curso);
};


// agrega un nuevo ingrediente
exports.nuevoCurso = async (req, res, next) => {
    const curso = new Cursos(req.body);
    try {
        // almacenar el registro
        await curso.save();
        res.json({ mensaje : 'Se agrego un nuevo curso' });
    } catch (error) {
        // si hay un error, console.log y next
        res.send(error);
        next();
    }
};

// Actualiza un curso via id
exports.actualizarCurso = async (req, res, next) => {
    try {
        console.log("datos", req.body);
        const curso = await Cursos.findOneAndUpdate(
            { _id : req.body.id }, 
            {
                nombre:req.body.nombre,
                descripcion:req.body.descripcion
            }, 
            //Opciones, devolver el nuevo objeto modificado
            {new : true}
        );
        res.json(curso);
    } catch (error) {
        res.send(error);
        next();
    }
};

// Elimina un curso via ID
exports.eliminarCurso = async (req, res, next) => {
    try {
        await Cursos.findByIdAndDelete({ _id : req.params.idCurso });
        res.json({mensaje : 'El Curso se ha eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
};
