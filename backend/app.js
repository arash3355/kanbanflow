

const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(taskRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "KanbanFlow Backend Running 🚀",
    });
});

// Test koneksi database
app.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            success: true,
            server_time: result.rows[0].now,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

app.listen(process.env.PORT, () => {
    console.log(
        `Server berjalan di http://localhost:${process.env.PORT}`
    );
});