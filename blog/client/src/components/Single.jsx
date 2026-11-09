import React, { useEffect, useState } from "react";
import Edit from "../assets/img/edit.png";
import Delete from "../assets/img/delete.png";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Like from "./Like";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";
import Sider from "./Sider";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdOutlineTextsms } from "react-icons/md";
import Comments from "./Comments";
import { IconContext } from "react-icons";

const Single = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [readMore, setReadMore] = useState(false);
  const [likes, setLikes] = useState([]);
  const [commentOpen, setCommentOpen] = useState(false);
  const [fetch, setFetch] = useState(true);

  const navigate = useNavigate();

  // const location = useLocation();
  // const postId = location.pathname.split("/")[2];
  // console.log(location.pathname.split("/"))

  const { currentUser, logout, deleteImage } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/likes?postId=" + id);
        setLikes(res.data);
      } catch (err) {
        console.log(err);
      }
      setFetch(false);
    };
    fetchData();
  }, [id, fetch]);

  // const deleteImage = async () => {
  //   try {
  //     await axios.delete(`/photos/${post.img}`);
  //   } catch (err) {
  //     console.log(err);
  //     alert(err.response.data.message);
  //   }
  // };

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${id}`);
      navigate("/");
    } catch (err) {
      console.log(err);
      alert(err.response.data);
      if (err.response.status === 401) {
        logout();
        navigate("/login");
      }
      return;
    }
    deleteImage(post.img);
  };

  // const getText = (html) => {
  //   const doc = new DOMParser().parseFromString(html, "text/html");
  //   return doc.body.textContent;
  // };

  const handleLike = async () => {
    if (currentUser) {
      let liked = likes.includes(currentUser.id);
      console.log(liked);
      if (liked) {
        try {
          await axios.delete("/likes?postId=" + id);
          setFetch(true);
        } catch (err) {
          console.log(err);
          alert(err.response.data);
          if (err.response.status === 401) {
            logout();
            navigate("/login");
          }
          return;
        }
      } else {
        try {
          await axios.post("/likes", { postId: id });
          setFetch(true);
        } catch (err) {
          console.log(err);
          alert(err.response.data);
          if (err.response.status === 401) {
            logout();
            navigate("/login");
          }
          return;
        }
      }
      return;
    }
    alert("Please login");
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="user">
              {/* {post.userImg && <img
                src={post.userImg}
                alt=""
              />} */}
              <div className="info">
                <span>{post.username}</span>
                <span>Posted {moment(post.date).fromNow()}</span>
              </div>
              {currentUser?.username === post.username && (
                <div>
                  <Link to={`/write?edit=${id}`} state={post} className="me-3">
                    <img src={Edit} alt="" />
                  </Link>
                  <img onClick={handleDelete} src={Delete} alt="" />
                </div>
              )}
            </div>
            <h1>{post.title}</h1>
            <div>
              {post.img && (
                <img
                  className="img-fluid"
                  src={`../upload/${post?.img}`}
                  alt=""
                />
              )}
            </div>

            {readMore ? (
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.desc),
                }}
              ></p>
            ) : (
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.desc?.substring(0, 500)),
                }}
              ></p>
              // (`${getText(post.desc).substring(0, 200)}...`)
            )}
            <div>
              <button onClick={() => setReadMore(!readMore)}>
                {readMore ? "show less" : "  show more"}
              </button>
            </div>

            <div className="info">
              <IconContext.Provider value={{ color: "red" }}>
                <div className="item">
                  {likes.includes(currentUser?.id) ? (
                    <AiFillHeart onClick={handleLike} />
                  ) : (
                    <AiOutlineHeart onClick={handleLike} />
                  )}
                  {likes?.length} Likes
                </div>
              </IconContext.Provider>
              <div
                className="item"
                onClick={() => setCommentOpen(!commentOpen)}
              >
                <MdOutlineTextsms />
                See Comments
              </div>
            </div>
            {commentOpen && <Comments postId={id} />}
          </div>

          <div className="col-md-3 ms-auto">
            <Sider />
            <Like cat={post.cat} id={id} />
            {/* <Menu cat={post.cat} /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Single;
