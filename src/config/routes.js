const express = require ('express');
const routes = express.Router();
const UsersController =require ('../controllers/users.controller');

routes.put('/user', UsersController.create);
routes.post('/user/login', UsersController.login);
routes.post('/user/me', UsersController.me);

module.exports = routes;