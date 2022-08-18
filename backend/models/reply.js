const mongoose = require('mongoose')


const replySchema = mongoose.Schema (
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Post'
        },
        commentId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Comment'
        },
        desc: {
            type: String,
            required: true,
        },
        likes: {
            type: Array,
            default: [],
        },
        deslikes: {
            type: Array,
            default: [],
        },
    },
{timestamps: true}
)


module.exports = mongoose.model('Reply', replySchema)