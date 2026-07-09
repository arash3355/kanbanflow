const pool = require("../config/db");
const bcrypt = require("bcrypt");

const getUsers = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT id, name, email, username, created_at FROM users ORDER BY id ASC"
        );

        res.status(200).json(result.rows);

    } catch (err) {

        res.status(500).json({
            message: err.message,
        });

    }
};

const registerUser = async (req, res) => {

    const {
        name,
        email,
        username,
        password,
    } = req.body;

    if (!name || !email || !username || !password) {

        return res.status(400).json({
            message: "Semua field wajib diisi",
        });

    }

    try {

        const checkUser = await pool.query(
            "SELECT * FROM users WHERE email = $1 OR username = $2",
            [email, username]
        );

        if (checkUser.rows.length > 0) {

            return res.status(409).json({
                message: "Email atau Username sudah digunakan",
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(

            `INSERT INTO users
      (name,email,username,password)

      VALUES

      ($1,$2,$3,$4)

      RETURNING id,name,email,username,created_at`,

            [
                name,
                email,
                username,
                hashedPassword,
            ]
        );

        res.status(201).json({

            message: "Register berhasil",

            data: result.rows[0],

        });

    } catch (err) {

        res.status(500).json({
            message: err.message,
        });

    }

};

const loginUser = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {

        return res.status(400).json({
            message: "Email dan Password wajib diisi"
        });

    }

    try {

        const result = await pool.query(

            "SELECT * FROM users WHERE email = $1",

            [email]

        );

        if (result.rows.length === 0) {

            return res.status(404).json({

                message: "Email tidak ditemukan"

            });

        }

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(

            password,

            user.password

        );

        if (!isMatch) {

            return res.status(401).json({

                message: "Password salah"

            });

        }

        res.status(200).json({

            message: "Login berhasil",

            data: {

                id: user.id,

                name: user.name,

                email: user.email,

                username: user.username

            }

        });

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

module.exports = {
    registerUser,
    getUsers,
    loginUser

};