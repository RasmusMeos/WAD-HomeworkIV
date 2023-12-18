// server.js
const express = require('express');
const { pool, createPostTable, createUsertable, addPost, getAllPosts, getPostById, updatePost, deletePost, deleteAllPosts, userExists, addUser, getUserByEmail } = require('./database');
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;
const app = express();

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Creating the post table on server start
createPostTable().catch(console.error);

//Creating the users table on server start
createUsertable().catch(console.error);

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

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
    // Check if the user already exists
    const doesUserExist = await userExists(email);
    if(doesUserExist) {
        return res.status(400).send('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store the new user in the database
    const newUser = await addUser(email, hashedPassword);

    res.status(201).send(`User created with ID: ${newUser.id}`);
} catch (error) {
    res.status(500).json({ error: error.message });
}
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const userResult = await getUserByEmail(email);
        const user = userResult.rows[0];

        if (!user) {
            return res.status(400).send('User not found');
        }

        // Check if password is correct
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return res.status(400).send('Invalid password');
        }

        // Create JWT token
        const token = jwt.sign({ userId: user.id }, 'ourSecretKey', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



app.listen(port, () => {
    console.log("Server is listening to port " + port);
});
