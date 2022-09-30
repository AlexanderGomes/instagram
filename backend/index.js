// packages
const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const dbConnect = require('./utils/dbConnect')

//folders
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const commentRoutes = require('./routes/comment')
const replyRoutes = require('./routes/reply')
const notiRoutes = require('./routes/notification')


//calling packages
const app = express();



//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//routes
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)
app.use('/api/comment', commentRoutes)
app.use('/api/reply', replyRoutes)
app.use('/api/noti', notiRoutes)





app.listen(port, async () => {
    await dbConnect()
    console.log('mongodb connected')
    console.log(`server on port ${port}`)
})