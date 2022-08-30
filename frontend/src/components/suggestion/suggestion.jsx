import React from 'react'
import './suggestion.css'
import user from '../../assets/user1.png'

const suggestion = () => {
  return (
    <div class="user-about-section">
    <h1 class="suggestion-heading">suggestions</h1>
    <div class="suggestion-container">
        <div class="user-card">
            <img src={user} class="user-dp" alt=""/>
            <p class="username">@john</p>
            <button class="follow-btn">follow</button>
        </div>
        
    </div>
</div>
  )
}

export default suggestion