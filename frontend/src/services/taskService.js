const API_URL = "http://localhost:3001/tasks";

function getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
}

// ==============================
// GET TASKS
// ==============================

export async function getTasks() {

    const user = getCurrentUser();

    const response = await fetch(
        `${API_URL}?userId=${user.id}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }

    return response.json();
}

// ==============================
// CREATE TASK
// ==============================

export async function createTask(task) {

    const user = getCurrentUser();

    const response = await fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            ...task,

            userId: user.id

        })

    });

    if (!response.ok) {

        throw new Error("Failed to create task");

    }

    return response.json();

}

// ==============================
// UPDATE TASK
// ==============================

export async function updateTask(task) {

    const user = getCurrentUser();

    const response = await fetch(
        `${API_URL}/${task.id}`,
        {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                ...task,

                userId: user.id

            })

        }
    );

    if (!response.ok) {

        throw new Error("Failed to update task");

    }

    return response.json();

}

// ==============================
// DELETE TASK
// ==============================

export async function deleteTask(id) {

    const user = getCurrentUser();

    const response = await fetch(

        `${API_URL}/${id}`,

        {

            method: "DELETE",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                userId: user.id

            })

        }

    );

    if (!response.ok) {

        throw new Error("Failed to delete task");

    }

    const result = await response.json();

    return result.data;

}