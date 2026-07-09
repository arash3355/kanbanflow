export default function KanbanColumn({
    title,
    children,
}) {
    return (
        <div className="card shadow-sm border-0 p-2">

            <div className="card-header bg-white">

                <h5 className="fw-bold mb-0">{title}</h5>

            </div>

            <div className="card-body d-flex flex-column gap-3">

                {children}

            </div>

        </div>
    );
}