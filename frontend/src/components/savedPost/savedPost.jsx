import React, { useState, useEffect } from "react";
import axios from "axios";
import "./savedPost.css";


//need to get the user by the userId of the savedPost you're recieving

//you already have the information of the post, you're just trying to fetch the information of the user

//to-do// display the information of the saved posts

const SavedPost = ({ saved }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const GetUserSaved = async () => {
      const res = await axios.get(`/api/user/${saved.userId}`);
      setUsers(res.data);
    };
    GetUserSaved();
  }, [setUsers]);

  console.log(saved);

  return <div>{saved.text}</div>;
};

export default SavedPost;
