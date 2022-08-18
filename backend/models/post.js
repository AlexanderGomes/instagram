const mongoose = require('mongoose')



const postSchema = mongoose.Schema (
    {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User'
        },
        img: {
            type: String
          },
        text: {
            type: String,
            required: [true, 'Please add a text value']
        },
        likes: {
            type: Array,
            default: [],
        },
        dislikes: {
            type: Array,
            default: [],
        },
    },
    {timestamps: true}
)


module.exports = mongoose.model('Post', postSchema)