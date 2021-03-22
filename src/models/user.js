const mongoose= require('mongoose');

const User = mongoose.model('User', {
    username: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    email: {
        type:String,
        required:true,
        unique: true
    },
    bio: String,
    avatar: String,
    followers: [mongoose.ObjectId],
    creatAt: {
        type: Date,
        required: true,
        default: ()=> new Date()
    }
});

module.exports= User;