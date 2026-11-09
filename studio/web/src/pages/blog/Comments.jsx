import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../contexts/appContext";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const { currentUser, logout } = useContext(AppContext);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const [fetch, setFetch] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (fetch) {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/comment?postId=${postId}`
          );
          setComments(res.data);
        } catch (err) {
          console.log(err);
        }
      }
      setFetch(false);
    };
    fetchData();
  }, [postId, fetch]);

  console.log(comments);

  const handleClick = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      alert("You must be logged in to comment.");
      navigate("/login");
      return;
    }
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/comment`, {
        desc,
        postId,
      });
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
  };

  const handleDeleteClick = async (commentId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/comment/${commentId}`
      );
      setFetch(true);
    } catch (err) {
      console.log(err);
      alert(err.response.data);
      if (err.response.status === 401) {
        logout();
        navigate("/login");
      }
    }
  };

  return (
    <div className="comments space-y-4 max-w-2xl mx-auto p-4">
      <form onSubmit={handleClick} className="write flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Write a comment..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Send
        </button>
      </form>
      {comments?.map((comment) => (
        <div
          key={comment.id}
          className="comment p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex flex-col mb-2">
            <span className="text-lg font-semibold text-gray-800">
              {comment.username}
            </span>
            <p className="text-gray-600 mt-1">{comment.desc}</p>
          </div>
          <span className="text-xs text-gray-400">
            {moment(comment.createdAt).fromNow()}
          </span>

          {currentUser.id === comment.userId && (
            <MdDelete
              className="text-red-500 cursor-pointer text-2xl"
              onClick={() => handleDeleteClick(comment.id)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Comments;
