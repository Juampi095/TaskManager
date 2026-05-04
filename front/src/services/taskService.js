const API_URL = "http://localhost:3000/tasks";

export const getTasks = async () => {
  const res = await fetch(API_URL);
  const data = await res.json();
  return Array.isArray(data) ? data : [];
};

export const createTask = async (task) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
};

export const updateTask = async (id, task) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
};

export const deleteTask = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
