export default function TaskCard({

    id,

    title,

    description,

    priority,

    dueDate,

    status,

    onEdit,

    onDelete

}) {

    const priorityClass = priority.toLowerCase();

    return (
        <div className="task-card card shadow-sm border-0 h-100">
            <div className="card-body">

                <h5 className="card-title fw-bold">
                    📌 {title}
                </h5>

                <p className="card-text text-secondary">{description}</p>

                <span

                    className={`badge ${priority === "High"

                        ?

                        "bg-danger text-light"

                        :

                        priority === "Medium"

                            ?

                            "bg-warning text-light"

                            :

                            "bg-success text-light"

                        }`}

                >

                    {priority}

                </span>

                <p className="small text-muted mt-3 mb-3">

                    📅 Due: {dueDate}

                </p>

                <div className="d-flex gap-2">

                    <button

                        className="btn btn-primary btn-sm flex-fill"

                        onClick={() => onEdit({

                            id,

                            title,

                            description,

                            priority,

                            dueDate,

                            status

                        })}

                    >

                        ✏ Edit

                    </button>

                    <button

                        className="delete-btn"

                        onClick={() => onDelete(id)}

                    >

                        🗑 Delete

                    </button>

                </div>

            </div>

        </div>
    );

}