const express = require ('express');
const multer = require('multer');
const UsersController = require ('../controllers/users.controller');
const PostsController = require('../controllers/posts.controller');
const auth = require ('../middlewares/auth');
const routes = express.Router();
const upload = multer({ dest: 'public/posts' });

routes.put('/user', UsersController.create);
routes.post('/user/login', UsersController.login);
routes.post('/user/me', auth, UsersController.me);
routes.get('/user/check', UsersController.check);
routes.post('/user/:id/follow', auth, UsersController.follow);
routes.post('user/edit', auth, UsersController.edit);
routes.get('user/:username/posts', UsersController.posts);
routes.get('/user', auth, UsersController.getAll);

routes.get('/post/:id/comment', auth, PostsController.getComments);
routes.get('/post', auth, PostsController.feed);
routes.put('/post/:id/comment',auth, PostsController.addComment);
routes.put('/post', auth, upload.single('image'), PostsController.create);
routes.get('/post/:id', auth, PostsController.get);
routes.post('/posts/:id/like', PostsController.like);


module.exports = routes;