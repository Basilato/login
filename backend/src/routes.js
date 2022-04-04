const express = require('express');
const UserController = require('./controllers/UserController');
const SessionController = require('./controllers/SessionController')

const routes = express.Router();


routes.post('/sessions', SessionController.create);

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);
routes.delete('/users/:id', UserController.delete);

module.exports = routes;