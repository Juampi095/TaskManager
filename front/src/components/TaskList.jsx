import TaskItem from "./TaskItem";

function TaskList({ tasks, onDelete, onEdit }) {
  if (!tasks || tasks.length === 0) {
    return <p className="empty-msg">No hay tareas aún</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default TaskList;
