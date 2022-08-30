import React from 'react'
import './post.css'

import user from '../../assets/user2.png'
import heart from '../../assets/icon/red-heart.png'
import post1 from '../../assets/posts/post1.png'
import icon1 from '../../assets/icon/heart-nofill.png'
import icon2 from '../../assets/icon/send-nofill.png'
import icon3 from '../../assets/icon/comment-nofill.png'





const Post = () => {
  return (
    <div className="post-container">
    <div className="post">
    <div className="post-header">
        <img src={user}className="user-icon" alt=""/>
        <p className="username">@modernweb</p>
    </div>
    <div className="post-feed">
        <div className="post-overlays">
            <img src={heart} className="like-icon" alt=""/>
            <div className="share-window">
                <h1 className="title">share the post with others</h1>
                <div className="share-link-container">
                    <input type="text" id="share-link" value="https://www.socialize.com/post/234234234234" disabled/>
                    <button className="copy-btn">copy</button>
                </div>
            </div>
        </div>
        <div className="post-img-container">
            <img src={post1} alt=""/>
        </div>
    </div>
    <div className="post-detail">
        <div class="detail-intracables">
            <img src={icon1} className="like-btn" alt=""/>
            <img src={icon2} className="send-btn" alt=""/>
            <img src={icon3} className="comment-btn" alt=""/>
        </div>
        <span className="likes">2.7k likes</span>
        <p className="username">@modernweb</p>
        <p className="post-des">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ipsa incidunt obcaecati esse illo voluptates libero debitis nisi. Id tempora vel illum vitae temporibus commodi non cupiditate atque voluptas. Ipsam.</p>

        <div class="comment-box">
            <input type="text" id="comment-input" placeholder="Add a comment"/>
            <button className="add-comment-btn"><img src={icon3} alt=""/></button>
        </div>

        <span className="comment-count">300 comments</span>
    </div>
</div>
</div>
  )
}

export default Post