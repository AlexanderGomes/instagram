import React from 'react'
import './home.css'
import Navbar from '../../components/navbar/navbar'
import Post from '../../components/posts/post'
import Suggestion from '../../components/suggestion/suggestion'


const home = () => {
  return (
    <div>
    <Navbar />
    <Post />
    <Suggestion />
    </div>
  )
}

export default home