const pool = require("../config/db");

const getTasks = async (req, res) => {
    const { userId } = req.query;

    if (!userId) {

        return res.status(400).json({

            message: "User ID wajib dikirim"

        });

    }

    try {
        const result = await pool.query(`
            SELECT
    id,
    title,
    description,
    priority,
    due_date AS "dueDate",
    status,
    user_id AS "userId",
    created_at AS "createdAt"
FROM tasks
WHERE user_id = $1
ORDER BY id ASC`, [userId]);

        res.status(200).json(result.rows);

    } catch (err) {

        res.status(500).json({
            message: err.message,
        });

    }
};


const createTask = async (req, res) => {

    const {
        title,
        description,
        priority,
        dueDate,
        status,
        userId,
    } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "Title wajib diisi",
        });
    }

    if (!userId) {
        return res.status(400).json({
            message: "User ID wajib dikirim",
        });
    }

    try {

        const result = await pool.query(
            `
            INSERT INTO tasks
(
    title,
    description,
    priority,
    due_date,
    status,
    user_id
)
VALUES
($1,$2,$3,$4,$5,$6)

RETURNING
    id,
    title,
    description,
    priority,
    due_date AS "dueDate",
    status,
    user_id AS "userId",
    created_at AS "createdAt"
            `,
            [
                title,
                description,
                priority,
                dueDate,
                status,
                userId,
            ]
        );

        res.status(201).json({
            message: "Task berhasil ditambahkan",
            data: result.rows[0],
        });

    } catch (err) {

        res.status(500).json({
            message: err.message,
        });

    }
};

const updateTask = async (req, res) => {

    const { id } = req.params;

    const {
        title,
        description,
        priority,
        dueDate,
        status,
        userId,
    } = req.body;

    if (!userId) {

        return res.status(400).json({

            message: "User ID wajib dikirim"

        });

    }

    try {

        const result = await pool.query(
            `
            UPDATE tasks

            SET

            title=$1,

            description=$2,

            priority=$3,

            due_date=$4,

            status=$5

            WHERE

            id=$6

            AND user_id=$7

            RETURNING
                id,
                title,
                description,
                priority,
                due_date AS "dueDate",
                status,
                user_id AS "userId",
                created_at AS "createdAt"
            `,
            [
                title,
                description,
                priority,
                dueDate,
                status,
                id,
                userId
            ]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Task tidak ditemukan",
            });

        }

        res.status(200).json({
            message: "Task berhasil diupdate",
            data: result.rows[0],
        });

    } catch (err) {

        res.status(500).json({
            message: err.message,
        });

    }
};

const deleteTask = async (req, res) => {

    const { id } = req.params;

    const { userId } = req.body;

    if (!userId) {

        return res.status(400).json({

            message: "User ID wajib dikirim"

        });

    }

    try {

        const result = await pool.query(
            `
            DELETE FROM tasks

WHERE

id = $1

AND

user_id = $2

RETURNING
    id,
    title,
    description,
    priority,
    due_date AS "dueDate",
    status,
    user_id AS "userId",
    created_at AS "createdAt"
            `,
            [id, userId]
        );

        if (result.rows.length === 0) {

            return res.status(404).json({
                message: "Task tidak ditemukan",
            });

        }

        res.status(200).json({
            message: "Task berhasil dihapus",
            data: result.rows[0],
        });

    } catch (err) {

        res.status(500).json({
            message: err.message,
        });

    }
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
};