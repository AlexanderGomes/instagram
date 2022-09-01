
import { useEffect} from "react";
import './home.css'
import Navbar from '../../components/navbar/navbar'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Feed from '../../components/Feed/Feed'
import PostForm from "../../components/posts/PostForm";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    
  }, [user, navigate, dispatch]);
  


  return (
    <div>
   <div className="navbar">
    <Navbar />
   </div>
   <div className='feed'>
  <Feed />
   </div>
    </div>
  )
}

export default Home