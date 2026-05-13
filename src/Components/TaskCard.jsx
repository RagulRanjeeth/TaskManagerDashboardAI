export default function TaskCard({ task, onDelete, onEdit }) {

    const getStatusColor = (status) => {
        switch (status) {
            case "DONE":
                return "#22c55e";
            case "IN_PROGRESS":
                return "#3b82f6";
            default:
                return "#f59e0b";
        }
    };

    return (
        <div style={card}>
            {/* HEADER */}
            <div style={header}>
                <h3 style={title}>{task?.title}</h3>

                <span
                    style={{
                        ...badge,
                        backgroundColor: getStatusColor(task?.status),
                    }}
                >
                    {task?.status}
                </span>
            </div>

            {/* DESCRIPTION */}
            <p style={desc}>
                {task?.description || "No description provided"}
            </p>

            {/* ACTIONS */}
            <div style={footer}>
                <button style={editBtn} onClick={() => onEdit?.(task)}>
                    Edit
                </button>

                <button style={deleteBtn} onClick={() => onDelete?.(task.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
}

/* STYLES */
const card = {
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    transition: "all 0.2s ease-in-out",
    cursor: "pointer",
};

const header = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
};

const title = {
    margin: 0,
    fontSize: 18,
    fontWeight: 600,
    color: "#111827",
};

const desc = {
    marginTop: 8,
    fontSize: 14,
    color: "#6b7280",
    lineHeight: "1.4",
};

const footer = {
    marginTop: 14,
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
};

const badge = {
    fontSize: 12,
    padding: "4px 10px",
    borderRadius: 999,
    color: "#fff",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
};

const editBtn = {
    padding: "6px 12px",
    border: "none",
    borderRadius: 8,
    background: "#3b82f6",
    color: "#fff",
    cursor: "pointer",
    transition: "0.2s",
};

const deleteBtn = {
    padding: "6px 12px",
    border: "none",
    borderRadius: 8,
    background: "#ef4444",
    color: "#fff",
    cursor: "pointer",
    transition: "0.2s",
};