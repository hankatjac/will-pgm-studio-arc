import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const { currentUser, logout } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const [fetch, setFetch] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/comments?postId=" + postId);
        setComments(res.data);
        setFetch(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId, fetch]);

  console.log(comments);

  const handleClick = async (e) => {
    if (currentUser) {
      e.preventDefault();
      try {
        await axios.post("/comments", { desc, postId });
        setDesc("");
        setFetch(true);
      } catch (err) {
        console.log(err);
        alert(err.response.data);
        if (err.response.status === 401) {
          logout();
          navigate("/login");
        }
      }
      return;
    }
    alert("Please login");
  };

  return (
    <div className="comments">
 
        {/* <img src={"/upload/" + currentUser.profilePic} alt="" /> */}
        <form onSubmit={handleClick} className="write">
          <input
            type="text"
            placeholder="write a comment"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
          <button type="submit">Send</button>
        </form>
  

      {comments?.map((comment) => (
        <div key={comment.id} className="comment">
          {/* <img src={"/upload/" + comment.profilePic} alt="" /> */}
          <div className="info">
            <span>{comment.username}</span>
            <p>{comment.desc}</p>
          </div>
          <span className="date">{moment(comment.createdAt).fromNow()}</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
