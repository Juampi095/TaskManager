import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "./services/taskService";
function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch(() => toast.error("Error al cargar tareas"));
  }, []);

  const handleCreate = async (taskData) => {
    const newTask = await createTask(taskData);
    setTasks([...tasks, newTask]);
    toast.success("Tarea creada correctamente!");
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((t) => t.id !== id));
    if (editingTask?.id === id) setEditingTask(null);
    toast.success("Tarea eliminada correctamente!");
  };

  const confirmDelete = (id) => {
    toast(
      ({ closeToast }) => (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p style={{ fontWeight: 600 }}>¿Eliminar esta tarea?</p>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => {
                handleDelete(id);
                closeToast();
              }}
              style={{
                padding: "6px 14px",
                background: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Eliminar
            </button>
            <button
              onClick={closeToast}
              style={{
                padding: "6px 14px",
                background: "#334155",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      { autoClose: false, closeButton: false },
    );
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleUpdate = async (taskData) => {
    const updated = await updateTask(editingTask.id, taskData);
    setTasks(tasks.map((t) => (t.id === editingTask.id ? updated : t)));
    setEditingTask(null);
    toast.success("Tarea actualizada!");
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Task Manager</h1>
        <p>Organizá tu trabajo, una tarea a la vez.</p>
      </header>
      <TaskForm
        onSubmit={editingTask ? handleUpdate : handleCreate}
        initialData={editingTask}
      />
      <div className="tasks-header">
        <span className="tasks-count">
          <span>{tasks.length}</span> {tasks.length === 1 ? "tarea" : "tareas"}
        </span>
      </div>
      <TaskList
        tasks={tasks}
        onDelete={confirmDelete}
        onEdit={handleEdit}
        editingId={editingTask?.id}
      />
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
