"use client";

import { useEffect, useState } from "react";

export default function TaskModal({
    onClose,
    onSave,
    task
}) {

    const [form, setForm] = useState({

        title: "",

        description: "",

        priority: "Low",

        dueDate: "",

        status: "Todo"

    });

    useEffect(() => {

        if (task) {

            setForm({

                id: task.id,

                title: task.title ?? "",

                description: task.description ?? "",

                priority: task.priority ?? "Low",

                dueDate: task.dueDate ?? "",

                status: task.status ?? "Todo"

            });

        } else {

            setForm({

                title: "",

                description: "",

                priority: "Low",

                dueDate: "",

                status: "Todo"

            });

        }

    }, [task]);

    function handleChange(e) {

        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    function handleSubmit(e) {
        e.preventDefault();

        onSave(form);
    }

    return (

        <div className="modal modal-overlay">


            <div className="modal-dialog modal-dialog-centered">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">

                            {task ? "Edit Task" : "New Task"}

                        </h5>

                        <button

                            className="btn-close"

                            onClick={onClose}

                        />

                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <input
                                className="form-control mb-3"
                                name="title"
                                placeholder="Title"
                                value={form.title}
                                onChange={handleChange}
                            />

                            <textarea
                                className="form-control mb-3"
                                rows={4}
                                name="description"
                                placeholder="Description"
                                value={form.description}
                                onChange={handleChange}
                            />

                            <select
                                className="form-select mb-3"
                                name="priority"
                                value={form.priority}
                                onChange={handleChange}
                            >
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>

                            <input
                                className="form-control mb-3"
                                type="date"
                                name="dueDate"
                                value={form.dueDate}
                                onChange={handleChange}
                            />

                            <select
                                className="form-select mb-3"
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                            >
                                <option>Todo</option>
                                <option>Doing</option>
                                <option>Done</option>
                            </select>

                            <div className="modal-footer">

                                <button

                                    type="button"

                                    className="btn btn-secondary"

                                    onClick={onClose}

                                >

                                    Cancel

                                </button>

                                <button

                                    type="submit"

                                    className="btn btn-primary"

                                >

                                    {task ? "Update Task" : "Save Task"}

                                </button>

                            </div>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}