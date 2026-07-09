export default function Button({
    children,
    className = "",
    type = "button",
}) {
    return (
        <button
            className={`btn btn-primary w-100 ${className}`}
            type={type}
        >
            {children}
        </button>
    );
}