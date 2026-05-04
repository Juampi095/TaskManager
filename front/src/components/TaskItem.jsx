function TaskItem({ task, onDelete, onEdit }) {
  return (
    <li className="task-item">
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>
      <div className="task-actions">
        <button className="btn-edit" onClick={() => onEdit(task)}>
          Editar Tarea
        </button>
        <button className="btn-delete" onClick={() => onDelete(task.id)}>
          Eliminar Tarea
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
