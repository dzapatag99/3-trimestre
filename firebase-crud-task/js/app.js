// Referencia a la base de datos firestore
const db = firebase.firestore();

// Elementos formulario y contenedor de tareas
const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");

// Variable tipo bandera para determinar si toca insertar o modificar una tarea
let editStatus = false;

let id = '';

// Código que se ejecuta al cargarse la página
window.addEventListener("DOMContentLoaded", async (e) => {

  // Se ejecuta onGetTasks pasandole la función de callback a ejecutar.
  // Función de firebase que se ejecuta cada vez que hay un cambio en al base de datos. 
  onGetTasks((querySnapshot) => {
    // Inicializamos el contenedor de tareas
    tasksContainer.innerHTML = "";

    // Objeto con los registros de la colección tarea actuales
    querySnapshot.forEach((doc) => {
      // datos de la tarea sin id
      const task = doc.data();
      tasksContainer.innerHTML += taskHTML(doc.id, task);
    });

    handleEditTasks();
    handleDeleteTasks();

  });

  taskForm.addEventListener("submit", sendData);

});

// Función que controla la acción de editar 
const handleEditTasks = () => {
  const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");
  
  // Para cada botón de las tareas configurar la acción de editar
  btnsEdit.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      try {
        const doc = await getTask(e.target.dataset.id);
        const task = doc.data();
        taskForm["task-title"].value = task.title;
        taskForm["task-description"].value = task.description;

        editStatus = true;
        id = doc.id;
        taskForm["btn-task-form"].innerText = "Modificar";

      } catch (error) {
        console.log(error);
      }
    });
  });
};

// Función que controla la acción de borrar de cada una de las tareas
const handleDeleteTasks = () => {
  const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
  // Para cada botón de las tareas configurar la acción de borrar
  btnsDelete.forEach((btn) =>
    btn.addEventListener("click", async (e) => {
      console.log(e.target.dataset.id);
      try {
        await deleteTask(e.target.dataset.id);
      } catch (error) {
        console.log(error);
      }
    })
  );
};

// Envia los datos de una tarea
const sendData = async (e) => {
  e.preventDefault();

  // Del formulario recuperamos los campos HTML
  const title = taskForm["task-title"];
  const description = taskForm["task-description"];

  if (title.value==="" || description.value===""){
    alert("Datos obligatorios");
    return false;
  }

  try {
    // Si la variable  es falsa se inserta una nueva tarea
    if (!editStatus) {
      await saveTask(title.value, description.value);
    } else {
      await updateTask(id, {title: title.value, description: description.value,});

      editStatus = false;
      id = '';
      taskForm['btn-task-form'].innerText = 'Insertar';
    }

    taskForm.reset();
    title.focus();
  } catch (error) {
    console.log(error);
  }
};


