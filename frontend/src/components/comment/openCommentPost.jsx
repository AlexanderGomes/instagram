import React from 'react'
import './post2.css'

const openCommentPost = () => {
  return (

    <div className="post">
        <div className="post-feed">
            <div className="post-overlays">
                <img src="img/icon/red-heart.png" className="like-icon" alt=""/>
            </div>
            <div className="post-img-container">
                <img src="img/posts/post1.png" alt=""/>
            </div>
        </div>

        <div className="feed">
            <div class="post-header">
                <img src="img/user2.png" className="user-icon" alt=""/>
                <p class="username">@modernweb</p>
            </div>
            <div className="post-detail">
                <div className="detail-intracables">
                    <img src="img/icon/heart-nofill.png" className="like-btn" alt=""/>
                    <img src="img/icon/send-nofill.png" className="send-btn" alt=""/>
                    <img src="img/icon/comment-nofill.png" className="comment-btn" alt=""/>
                </div>
                <span className="likes">2.7k likes</span>
                <p className="username">@modernweb</p>
                <p className="post-des">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ipsa incidunt
                    obcaecati esse illo voluptates libero debitis nisi. Id tempora vel illum vitae temporibus commodi
                    non cupiditate atque voluptas. Ipsam.</p>

                <div className="comments-container">
                    <div className="comment-card">
                        <img src="img/user1.png" className="user-dp" alt=""/>
                        <div className="comment-body">
                            <span className="username">@modernweb</span>
                            <p className="comment">this is amazing 🔥</p>
                        </div>
                    </div>
                </div>

                <div className="comment-box">
                    <input type="text" id="comment-input" placeholder="Add a comment"/>
                    <button className="add-comment-btn"><img src="img/icon/comment-nofill.png" alt=""/></button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default openCommentPost