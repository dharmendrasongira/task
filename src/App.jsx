import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState(() => {
    
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [form, setForm] = useState({
    title: "",
    category: "",
    dueDate: "",
    notes: "",
  });

  
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      alert("Task title is required 🚨");
      return;
    }
    const newTask = {
      id: Date.now(),
      ...form,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setForm({ title: "", category: "", dueDate: "", notes: "" });
  };

  
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  
  const removeTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  
  const completed = tasks.filter((t) => t.completed).length;
  const total = tasks.length;

  return (
    <div className="h-screen w-screen bg-gray-700 py-10">
      <div className="container mx-auto w-1/2 rounded-xl bg-yellow-50 p-6 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold">Task Manager</h1>

        <p className="mb-4">
          Progress: {completed} / {total} tasks completed
        </p>

        <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-3">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter task title"
            className="rounded border p-2"
            required
          />
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Task category"
            className="rounded border p-2"
            required
          />
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="rounded border p-2"
            required
          />
          <input
            type="text"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Optional notes"
            className="rounded border p-2"
          />
          <button
            type="submit"
            className="rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
          >
            Add Task
          </button>
        </form>

        <ul className="flex flex-col gap-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex items-center justify-between rounded border p-3 ${
                task.completed ? "bg-green-100" : "bg-white"
              }`}
            >
              <div>
                <h2
                  className={`font-semibold ${
                    task.completed ? "line-through" : ""
                  }`}
                >
                  {task.title}
                </h2>
                <p className="text-sm text-gray-600">
                  {task.category} | Due: {task.dueDate || "N/A"}
                </p>
                {task.notes && (
                  <p className="text-xs text-gray-500">{task.notes}</p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleComplete(task.id)}
                  className="rounded bg-green-500 px-2 py-1 text-white"
                >
                  {task.completed ? "Undo" : "Done"}
                </button>
                <button
                  onClick={() => removeTask(task.id)}
                  className="rounded bg-red-500 px-2 py-1 text-white"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
