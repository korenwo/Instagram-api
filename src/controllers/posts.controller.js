const fs = require('fs').promises;
const Post = require ('../models/post');

class PostsController {

    static async feed(req, res) {
        try {
            const posts= await Post
                .find()
                .populate('userId', ['username', 'avatar'])
                .sort({ createAt: req.query.sort})
            res.send(posts);
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    }

    static async create(req, res) {
        const fileName = req.file.filename;
        try {
            const imageBase64 = await fs.readFile('public/posts/' + fileName, {encoding: 'base64'});
            const post = new Post({
                description: req.body.description,
                image: imageBase64,
                userId: req.user._id
            });
            const createdPost = await post.save();
            res.status(201).send(createdPost);
        } catch(err) {
            console.log(err);
            res.sendStatus(400);
        }    
    }

    static async get(req, res) {
        try {
            const post= await Post
                .findById(req.params.id)
                .populate('user', ['username', 'avatar']);
            if(!post) {
                res.sendStatus(404);
                return;
            }
            res.json(post);
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    }

    static async like (req, res) {
        try {
            const post= await Post.findById(req.params.id);
            post.likes++;
            const createdPost = await post.save();
            res.status(201).send(createdPost);
        }
        catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    }

    static async addComment(req, res) {
        const postId= req.params.id;
        const { content } =req.body;
        const userId = req.user._id;
        
        try {
            const comment = new Comment({
                postId,
                content,
                user:userId
            });
            const savedComment = await comment.save();
            res.status(201).send(savedComment);
        } catch(err) {
            console.log(err);
            res.sendStatus(400);
        }
    }    
    
    static async getComments(req,res) {
        const postId = req.params.id;
        try {
            const comments = await Comment.find({ postId })
                .populate('user', ['username', 'avatar'])
            res.send(comments);    
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
}
module.exports = PostsController;
