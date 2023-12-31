// database.js
const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "homeworkiv",
    database: "homeworkIV",
    host: "localhost",
    port: "5432"
});

// Function to create the post table
const createPostTable = async () => {
    const client = await pool.connect();
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS posttable (
                id SERIAL PRIMARY KEY,
                time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                body VARCHAR(200) NOT NULL
            );
        `);
    } finally {
        client.release();
    }
};
const createUsertable = async () => {
    const client = await pool.connect();
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
            `);
        } finally {
            client.release();
        }
    };


// Add a new post
const addPost = async (body) => {
    const result = await pool.query(
        'INSERT INTO posttable (body) VALUES ($1) RETURNING *;',
        [body]
    );
    return result.rows[0];
};

// Get all posts
const getAllPosts = async () => {
    const result = await pool.query(`SELECT id, body, to_char(time, 'Mon DD, YYYY') as time FROM posttable;`);
    return result.rows;
};

// Get a single post by ID
const getPostById = async (id) => {
    const result = await pool.query('SELECT * FROM posttable WHERE id = $1;', [id]);
    return result.rows[0];
};

// Update a post
const updatePost = async (id, body) => {
    const result = await pool.query(
        'UPDATE posttable SET body = $2 WHERE id = $1 RETURNING *;',
        [id, body]
    );
    return result.rows[0];
};

// Delete a post
const deletePost = async (id) => {
    await pool.query('DELETE FROM posttable WHERE id = $1;', [id]);
};

const deleteAllPosts = async () => {
    await pool.query('DELETE FROM posttable');
};

// Function to check if a user exists
const userExists = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rowCount > 0;
};

// Function to add a new user
const addUser = async (email, hashedPassword) => {
    const result = await pool.query(
        'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id',
        [email, hashedPassword]
    );
    return result.rows[0];
};

// Function to get a user by email
const getUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
};

module.exports = {
    pool,
    createPostTable,
    createUsertable,
    addPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    deleteAllPosts,
    userExists,
    addUser,
    getUserByEmail
};
