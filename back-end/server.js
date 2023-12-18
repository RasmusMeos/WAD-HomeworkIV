// server.js
const express = require('express');
const { pool, createPostTable, addPost, getAllPosts, getPostById, updatePost, deletePost, deleteAllPosts } = require('./database');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;
const app = express();

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Create the post table on server start
createPostTable().catch(console.error);

// Route to add a new post
app.post('/posts', async (req, res) => {
    const { body } = req.body;
    try {
        const newPost = await addPost(body);
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get all posts
app.get('/posts', async (req, res) => {
    try {
        const posts = await getAllPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to get a single post by ID
app.get('/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await getPostById(id);
        if (post) {
            res.json(post);
        } else {
            res.status(404).send('Post not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to update a post
app.put('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const {body} = req.body;
    try {
        const updatedPost = await updatePost(id, body);
        if (updatedPost) {
            res.json(updatedPost);
        } else {
            res.status(404).send('Post not found');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to delete a post
app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await deletePost(id);
        res.status(204).send(); // No content to send back
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Authentication and other routes can be added here as needed

// Route to delete all posts
app.delete('/posts', async (req, res) => {
    try {
        await deleteAllPosts(); // Call the function to delete all posts
        res.status(200).send('All posts deleted successfully');
    } catch (error) {
        console.error('Error deleting posts:', error);
        res.status(500).send('Server error');
    }
});
app.listen(port, () => {
    console.log("Server is listening to port " + port);
});
