const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(morgan('dev'));
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

server.get('/', (req, res) => {
    res.send('Spring Challenge Authorization API')
});

server.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        message: 'Sorry, API is not responding',
        errorMessage: err.message
    })
})

module.exports = server;
