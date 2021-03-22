const mongoose= require('mongoose');

const Post = mongoose.model('Post', {
    userId: {
        type: mongoose.ObjectId,
        required: true,
        ref: 'User'
    },
    description: String,
    image: {
        type: String,
        required:true,
    },
    createdAt: {
        type: Date,
        required:true,
        default:()=> new Date()
    },
    like: {
        type: [mongoose.ObjectId],
        default:[]
    }

});

module.exports= Post;