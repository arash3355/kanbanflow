"use client";


import Navbar from "@/components/layout/Navbar";
import toast from "react-hot-toast";
import KanbanColumn from "@/components/kanban/KanbanColumn";
import TaskCard from "@/components/kanban/TaskCard";
import TaskModal from "@/components/modal/TaskModal";

import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/services/taskService";
import { createTask } from "@/services/taskService";
import { updateTask } from "@/services/taskService";
import { deleteTask } from "@/services/taskService";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function DashboardPage() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [priorityFilter, setPriorityFilter] = useState("All");

    const queryClient = useQueryClient();

    const {

        data: tasks = [],

        isPending,

        error,

        refetch,

    } = useQuery({

        queryKey: ["tasks"],

        queryFn: getTasks

    });

    const createMutation = useMutation({

        mutationFn: createTask,

        onSuccess: () => {

            toast.success("Task berhasil ditambahkan!");

            queryClient.invalidateQueries({

                queryKey: ["tasks"]

            });

            setSelectedTask(null);

            setIsModalOpen(false);

        },
        onError: (error) => {

            toast.error(error.message);

        }

    });

    const updateMutation = useMutation({

        mutationFn: updateTask,

        onSuccess: () => {

            toast.success("Task berhasil diperbarui!");

            queryClient.invalidateQueries({

                queryKey: ["tasks"]

            });

            setSelectedTask(null);

            setIsModalOpen(false);

        },
        onError: (error) => {

            toast.error(error.message);

        }

    });

    const deleteMutation = useMutation({

        mutationFn: deleteTask,

        onSuccess: () => {

            toast.success("Task berhasil dihapus!");

            queryClient.invalidateQueries({

                queryKey: ["tasks"]

            });

        },
        onError: (error) => {

            toast.error(error.message);

        }

    });

    const filteredTasks = tasks.filter((task) => {

        const keyword = search.toLowerCase();

        const matchesSearch =

            task.title.toLowerCase().includes(keyword) ||

            task.description?.toLowerCase().includes(keyword);

        const matchesStatus =

            statusFilter === "All" ||

            task.status === statusFilter;

        const matchesPriority =

            priorityFilter === "All" ||

            task.priority === priorityFilter;

        return (

            matchesSearch &&

            matchesStatus &&

            matchesPriority

        );

    });

    if (isPending) {

        return (

            <h2>

                Loading Tasks...

            </h2>

        )

    }

    if (error) {

        return (

            <h2>

                {error.message}

            </h2>

        )

    }



    return (
        <>
            <Navbar />

            <main className="container py-4">

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

                    <div>

                        <h1 className="display-6 fw-bold mb-1">

                            Dashboard

                        </h1>

                        <p className="text-secondary mb-0">

                            Manage your daily tasks

                        </p>

                    </div>

                </div>

                <div className="row g-3 mb-4 align-items-end">

                    <div className="col-lg-4 col-md-12">

                        <input

                            className="form-control"
                            type="text"
                            placeholder="🔍 Search task..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </div>

                    <div className="col-lg-2 col-md-6">

                        <select

                            className="form-select"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="All">All Status</option>
                            <option value="Todo">Todo</option>
                            <option value="Doing">Doing</option>
                            <option value="Done">Done</option>
                        </select>

                    </div>

                    <div className="col-lg-2 col-md-6">

                        <select

                            className="form-select"

                            value={priorityFilter}

                            onChange={(e) => setPriorityFilter(e.target.value)}

                        >

                            <option value="All">

                                All Priority

                            </option>

                            <option value="High">

                                High

                            </option>

                            <option value="Medium">

                                Medium

                            </option>

                            <option value="Low">

                                Low

                            </option>

                        </select>

                    </div>

                    <button
                        className="btn btn-primary col-lg-3 col-md-6 ms-auto w-auto px-4 me-2"

                        onClick={() => {

                            setSelectedTask(null);

                            setIsModalOpen(true);

                        }}
                    >
                        + New Task
                    </button>

                </div>

                {filteredTasks.length === 0 ? (

                    <div className="empty-state">

                        <div className="empty-icon">

                            🔍

                        </div>

                        <h2>

                            No tasks found

                        </h2>

                        <p>

                            Try changing your search or filter.

                        </p>

                    </div>

                ) : (

                    <div className="row g-4">

                        {(statusFilter === "All" || statusFilter === "Todo") && (
                            <div className="col-xl-4 col-lg-4 col-md-6 col-12">

                                <KanbanColumn title="Todo">

                                    {filteredTasks

                                        .filter((task) => task.status === "Todo")

                                        .map((task) => (

                                            <TaskCard
                                                key={task.id}

                                                id={task.id}

                                                title={task.title}

                                                description={task.description}

                                                priority={task.priority}

                                                dueDate={task.dueDate}

                                                status={task.status}

                                                onEdit={(task) => {

                                                    setSelectedTask(task);

                                                    setIsModalOpen(true);

                                                }}
                                                onDelete={(id) => {

                                                    const confirmDelete = window.confirm(

                                                        "Yakin ingin menghapus task ini?"

                                                    );

                                                    if (!confirmDelete) return;

                                                    deleteMutation.mutate(id);

                                                }}

                                            />

                                        ))}



                                </KanbanColumn>

                            </div>
                        )}


                        {(statusFilter === "All" || statusFilter === "Doing") && (

                            <div className="col-xl-4 col-lg-4 col-md-6 col-12">

                                <KanbanColumn title="Doing">



                                    {filteredTasks

                                        .filter((task) => task.status === "Doing")

                                        .map((task) => (

                                            <TaskCard
                                                key={task.id}

                                                id={task.id}

                                                title={task.title}

                                                description={task.description}

                                                priority={task.priority}

                                                dueDate={task.dueDate}

                                                status={task.status}

                                                onEdit={(task) => {

                                                    setSelectedTask(task);

                                                    setIsModalOpen(true);

                                                }}
                                                onDelete={(id) => {

                                                    const confirmDelete = window.confirm(

                                                        "Yakin ingin menghapus task ini?"

                                                    );

                                                    if (!confirmDelete) return;

                                                    deleteMutation.mutate(id);

                                                }}

                                            />

                                        ))}



                                </KanbanColumn>
                            </div>
                        )}

                        {(statusFilter === "All" || statusFilter === "Done") && (

                            <div className="col-xl-4 col-lg-4 col-md-6 col-12">

                                <KanbanColumn title="Done">



                                    {filteredTasks

                                        .filter((task) => task.status === "Done")

                                        .map((task) => (

                                            <TaskCard
                                                key={task.id}

                                                id={task.id}

                                                title={task.title}

                                                description={task.description}

                                                priority={task.priority}

                                                dueDate={task.dueDate}

                                                status={task.status}

                                                onEdit={(task) => {

                                                    setSelectedTask(task);

                                                    setIsModalOpen(true);

                                                }}
                                                onDelete={(id) => {

                                                    const confirmDelete = window.confirm(

                                                        "Yakin ingin menghapus task ini?"

                                                    );

                                                    if (!confirmDelete) return;

                                                    deleteMutation.mutate(id);

                                                }}

                                            />
                                        ))}



                                </KanbanColumn>
                            </div>
                        )}

                    </div>)}

            </main>
            {
                isModalOpen && (

                    <TaskModal

                        task={selectedTask}

                        onClose={() => {

                            setSelectedTask(null);

                            setIsModalOpen(false);

                        }}

                        onSave={(task) => {

                            if (task.id) {

                                updateMutation.mutate(task);

                            } else {

                                createMutation.mutate(task);

                            }

                        }}

                    />

                )
            }


        </>
    );
}