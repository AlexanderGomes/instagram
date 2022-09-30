import React, {useState, useEffect} from 'react'
import './Notifications.css'
import axios from 'axios'


const Notifications = ({noti}) => {
    
    const [sender, setSender] = useState([])
    const [post, setPost] = useState([])
    const [comment, setComment] = useState([])

    const GetSender = async () => {
        useEffect(() => {
          axios.get(`/api/user/` + noti.sender)
            .then((res) => {
              setSender(res.data);
            })
            .catch((error) => {
              console.log(error.message);
            });
        }, [setSender]);
      };
      GetSender();

    //   console.log(sender.name)

      const GetPost = async () => {
        useEffect(() => {
          axios.get(`/api/post/` + noti.eventId)
            .then((res) => {
              setPost(res.data);
            })
            .catch((error) => {
              console.log(error.message);
            });
        }, [setPost]);
      };
      GetPost();


  


  return (
    <div>
        <p>{sender&&sender.name} {noti&&noti.type} {post ? post.text : ' this post was deleted'}</p>
    </div>
  )
}

export default Notifications