export default function Input({
    type = "text",
    placeholder,
    name,
    value,
    onChange,
}) {
    return (
        <input
            className="form-control mb-3"
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
        />
    );
}