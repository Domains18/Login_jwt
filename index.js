require('dotenv').config();
const express = require('express');
const api = express();
const jwt = require('jsonwebtoken')



api.use(express.json());

const posts = [
    {
        userName: 'John',
        title: 'Post 2'
    },
    {
        userName: 'Kyle',
        title: 'Post 3'
    },
    {
        userName: 'Bashir',
        title: 'Post 4'
    },
]


api.get('/posts', authenticateToken, (req, res) => {
    // console.log(req.user.name)
    res.json(posts.filter(post => post.userName === req.user.name))
});

function authenticateToken(req, res, next) {
    const authHeaders = req.headers['authorization']
    const token = authHeaders && authHeaders.split(' ')[1]
    // console.log(token)
    if (token === null) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) res.sendStatus(403);
        req.user = user;
        next();
    });

}



api.listen(3000, () => console.log('API running on port 3000'));
