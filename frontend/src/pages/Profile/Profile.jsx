import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";
import './Profile.css'

const Profile = () => {
  const [user, setUser] = useState({});
  const {username} = useParams()


  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/user/username/${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  console.log(user)

  return (
    <div>{user.name}</div>
  )
}

export default Profile