// Componente tarea
const taskHTML = (id, task) => {
    return `<div class="card card-body mt-2 border-primary">
        <h3 class="h5">${task.title}</h3>
        <p>${task.description}</p>
        <div>
          <button class="btn btn-primary btn-delete" data-id="${id}">
            <i class="bi bi-trash-fill"></i> Borrar
          </button>
          <button class="btn btn-secondary btn-edit" data-id="${id}">
            <i class="bi bi-pencil-fill"></i> Editar
          </button>
        </div>
      </div>`;
  };