import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask, updateTask } from "../Api/Tasks";
import TaskCard from "../components/TaskCard";

export default function Dashboard() {

    const [tasks, setTasks] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("PENDING");

    const [editingTask, setEditingTask] = useState(null);

    const [darkMode, setDarkMode] = useState(false);

    const userId = localStorage.getItem("userId");

    const loadTasks = async () => {
        const res = await getTasks(userId);
        setTasks(res.data);
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const addTask = async () => {

        if (!title || !description) return;

        if (editingTask) {

            await updateTask(editingTask.id, {
                ...editingTask,
                title,
                description,
                status
            });

            setEditingTask(null);

        } else {

            await createTask({
                title,
                description,
                status,
                userId
            });
        }

        setTitle("");
        setDescription("");
        setStatus("PENDING");

        loadTasks();
    };

    const removeTask = async (id) => {
        await deleteTask(id);
        loadTasks();
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
    };

    return (
        <div style={{
            ...container,
            background: darkMode ? "#0f172a" : "#f8fafc",
            color: darkMode ? "#fff" : "#000"
        }}>

            {/* HEADER */}
            <div style={topBar}>
               <h2 style={heading}>Task Dashboard</h2>

                <button
                    style={toggleBtn}
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {darkMode ? "Light Mode" : "Dark Mode"}
                </button>
            </div>

            {/* MAIN LAYOUT */}
            <div style={layout}>

                {/* LEFT - FORM */}
                <div style={{
                    ...leftPanel,
                    background: darkMode ? "#1e293b" : "#ffffff"
                }}>

                    <h3>{editingTask ? "Edit Task" : "Add Task"}</h3>

                    <input
                        style={input}
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <input
                        style={input}
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <select
                        style={input}
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option>PENDING</option>
                        <option>IN_PROGRESS</option>
                        <option>DONE</option>
                    </select>

                    <button style={button} onClick={addTask}>
                        {editingTask ? "Update Task" : "Add Task"}
                    </button>

                </div>

                {/* RIGHT - TASKS */}
                <div style={{
                    ...rightPanel,
                    background: darkMode ? "#0f172a" : "#f1f5f9"
                }}>

                    {tasks.map((t) => (
                        <TaskCard
                            key={t.id}
                            task={t}
                            onDelete={removeTask}
                            onEdit={handleEdit}
                        />
                    ))}

                </div>

            </div>

        </div>
    );
}
const container = {
    minHeight: "100vh",
    padding: 20,
    transition: "0.3s ease"
};

const heading = {
    fontSize: "30px",
    fontWeight: "800",
    background: "linear-gradient(90deg, #2563eb, #9333ea)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "20px",
    textAlign: "center",
    marginLeft: "130px"
};

const topBar = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
};

const layout = {
    display: "flex",
    gap: 20
};

const leftPanel = {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    transition: "0.3s ease"
};

const rightPanel = {
    flex: 2,
    padding: 20,
    borderRadius: 12,
    minHeight: "80vh",
    transition: "0.3s ease"
};

const input = {
    padding: 12,
    borderRadius: 8,
    border: "1px solid #ccc",
    outline: "none"
};

const button = {
    padding: 12,
    borderRadius: 8,
    border: "none",
    background: "#2563eb",
    color: "white",
    cursor: "pointer"
};

const toggleBtn = {
    padding: "8px 12px",
    borderRadius: 8,
    border: "none",
    cursor: "pointer"
};