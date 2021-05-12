// Recupera una tarea en concreto de Firestore
const getTask = (id) => db.collection("tasks").doc(id).get();

/**
 * Inserta una nueva tarea en Firestore
 * @param {string} title Título de la tarea
 * @param {string} description Descripción de la tarea
 */
 const saveTask = (title, description) =>  
            db.collection("tasks").doc().set({
                title,
                description,
            });

// Obtiene todas tareas de la base de datos
const getTasks = () => db.collection("tasks").get();

// Función que se queda escuchando todo el tiempo si hay un cambio para refrescar la lista
const onGetTasks = (callback) => db.collection("tasks").onSnapshot(callback);

// Modifica una tarea
const updateTask = (id, updatedTask) => db.collection('tasks').doc(id).update(updatedTask);

// Borra una tarea
const deleteTask = (id) => db.collection("tasks").doc(id).delete();

