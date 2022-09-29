import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {toast} from 'react-toastify'
import './PostForm.css'
import {AiFillCloseCircle} from 'react-icons/ai'



const PostForm = ({setClose}) => {
    const [file, setFile] = useState(null);
    const [text, setText] = useState(null);
    const { user } = useSelector((state) => state.auth);
    const [toggle, setToggle] = useState(false)


  const HandlePost = async (e) => {
    e.preventDefault()
   
       const data = new FormData();
       data.append("file", file);
       data.append("upload_preset", "uploads");
   
  
       try {
        if(!file) {
        const newPost = {
           userId: user._id,
           text
         };
         await axios.post("/api/post", newPost);
         setText('')
         window.location.reload();
        //  toast('reload the page')
        } else {
     const uploadRes = await axios.post(
           "https://api.cloudinary.com/v1_1/ddphqky8w/image/upload",
           data
         );
         const { url } = uploadRes.data;
   
         const newPost2 = {
           userId: user._id,
           text,
           img: url,
         };
        try {
          await axios.post("/api/post", newPost2);
          window.location.reload();
        } catch (err) {}
        }
       } catch (err) {
         console.log(err.message);
       }
     };


  return (
  <div className="form__post">
      <form onSubmit={HandlePost} className='post__form'>
      <div className="icon__position">
       <AiFillCloseCircle className="icon" size={20} onClick={() => setClose(false) } />
      </div>
        <label className="file__text">What are you thinking ?</label>
        <input
          type="text"
          name="text"
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
        className="file"
          type="file"
          id="file"
          accept=".png,.jpeg,.jpg,Screenshot"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className="btn__post" type="submit">make a post</button>
      </form>
    </div>
  )
}

export default PostForm