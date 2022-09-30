const mongoose = require('mongoose')



const notificationSchema = mongoose.Schema (
    {
       recipient: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        eventId: {
            type: mongoose.Schema.Types.ObjectId
        },
        sender: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        type: {
          type: String
        },
    },
    {timestamps: true}
)


module.exports = mongoose.model('Notification', notificationSchema)