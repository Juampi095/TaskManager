import { useEffect, useState } from "react";

function TaskForm({ onSubmit, initialData }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título de la tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">
        {initialData ? "Actualizar tarea" : "Crear tarea"}
      </button>
    </form>
  );
}

export default TaskForm;
