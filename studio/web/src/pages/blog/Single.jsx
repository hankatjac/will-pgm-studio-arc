import { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Like from "./Like";
import axios from "axios";
import moment from "moment";
import DOMPurify from "dompurify";
import Sider from "./Sider";
import { AppContext } from "../../contexts/appContext";
import { MdDelete } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import Confirm from "../../components/Confirm";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdOutlineTextsms } from "react-icons/md";
import Comments from "./Comments";

const Single = () => {
  const { id } = useParams();
  const [readMore, setReadMore] = useState(false);
  const navigate = useNavigate();
  // const location = useLocation();
  // const postId = location.pathname.split("/")[2];
  // console.log(location.pathname.split("/"))
  const { logout, deletePostImage, currentUser } = useContext(AppContext);
  const post = useLocation().state;
  const [openDialog, setOpenDialog] = useState(false);
  const [likes, setLikes] = useState([]);
  const [commentOpen, setCommentOpen] = useState(false);
  const [fetch, setFetch] = useState(true);

  useEffect(() => {
    const fetchLikeData = async () => {
      if (!id) return; // Ensure id is defined
      if (fetch) {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/like?postId=${id}`
          );
          setLikes(res.data);
        } catch (err) {
          console.log(err);
        }
        setFetch(false);
      }
      // console.log("Fetching likes for post ID:", id);
    };
    fetchLikeData();
  }, [id, fetch]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/post/${post.id}`);
      navigate("/posts");
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        logout();
        navigate("/login");
      }
      return;
    }
    deletePostImage(post.imgId);
  };

  const handleLike = async () => {
    if (!currentUser) {
      alert("You must be logged in to like a post.");
      navigate("/login");
      return;
    }
    let liked = likes.includes(currentUser.id);
    // console.log(liked);
    if (liked) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/like?postId=${id}`);
        setFetch(true); // Only trigger fetch after API call completes
      } catch (err) {
        // console.log(err);
        alert(err.response.data);
        if (err.response.status === 401) {
          logout();
          navigate("/login");
        }
      }
    } else {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/like`, {
          postId: id,
        });
        setFetch(true); // Only trigger fetch after API call completes
      } catch (err) {
        // console.log(err);
        alert(err.response.data);
        if (err.response.status === 401) {
          logout();
          navigate("/login");
        }
      }
    }
  };

  if (!post) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center text-gray-500">Post not found.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/4 bg-white p-6 rounded shadow">
          <div className="flex justify-between items-center">
            <div>
              <span className="capitalize font-semibold">{post.username}</span>
              <p className="text-gray-500 text-sm">
                Posted {moment(post.date).fromNow()}
              </p>
            </div>
            {currentUser?.username === post.username && (
              <div className="flex space-x-3">
                <Link
                  className="text-blue-500 hover:text-blue-600"
                  to={`/posts/write/${post.id}`}
                  state={post}
                >
                  <GrEdit className="w-6 h-6 cursor-pointer" />
                </Link>
                <MdDelete
                  className="text-red-500 hover:text-red-600 w-6 h-6 cursor-pointer"
                  onClick={() => setOpenDialog(true)}
                  title="Delete Post"
                />
              </div>
            )}
          </div>
          <h1 className="text-2xl font-bold my-4">{post.title}</h1>
          <div className="my-4 flex justify-center">
            <img
              className="w-xl rounded-lg shadow-md"
              src={post?.imgUrl}
              alt=""
            />
          </div>

          <div className="my-4">
            {readMore ? (
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.desc),
                }}
              ></p>
            ) : (
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.desc?.substring(0, 1000)),
                }}
              ></p>
            )}
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              onClick={() => setReadMore(!readMore)}
            >
              {readMore ? "Show less" : "Show more"}
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {/* Like Button Section */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              {likes.includes(currentUser?.id) ? (
                <AiFillHeart
                  onClick={handleLike}
                  className="text-rose-500 text-2xl cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200"
                />
              ) : (
                <AiOutlineHeart
                  onClick={handleLike}
                  className="text-gray-500 text-2xl cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200 hover:text-rose-400"
                />
              )}
              <span className="text-sm font-medium text-gray-600">
                {likes?.length} {likes?.length === 1 ? "Like" : "Likes"}
              </span>
            </div>

            {/* Comments Toggle */}
            <button
              className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-lg hover:bg-gray-50 w-fit"
              onClick={() => setCommentOpen(!commentOpen)}
            >
              <MdOutlineTextsms className="text-xl" />
              <span className="text-sm font-medium">
                {commentOpen ? "Hide Comments" : "See Comments"}
              </span>
            </button>

            {/* Comments Section */}
            {commentOpen && (
              <div className="mt-2">
                <Comments postId={id} />
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:w-1/4 md:ml-auto">
          <Sider />
          <Like cat={post.cat} id={post.id} />
        </div>
      </div>
      <Confirm
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        description="Are you sure you want to delete this event? This action cannot be undone."
      />
    </div>
  );
};

export default Single;
