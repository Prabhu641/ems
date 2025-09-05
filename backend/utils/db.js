// db.js
import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config(); // Load .env first

const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true
});

con.connect((err) => {
    if (err) {
        console.error("Database connection error:", err.message);
    } else {
        console.log("Database connected successfully!"); // ✅ This should print
    }
});

export default con;
