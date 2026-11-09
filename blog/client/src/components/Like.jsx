import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Like = ({ cat, id }) => {
 
  const [filterPost, setFilterPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/?cat=${cat}`);
        let posts = res.data
        setFilterPost(
          posts.filter(post => 
            post.id != id
          )
        );
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat, id]);

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h4 className="card-title">Similar Post</h4>
        {filterPost.map((post) => (
          <div className="post" key={post.id}>
            {post.img && (
              <img
                className="img-fluid"
                src={`../upload/${post?.img}`}
                alt=""
              />
            )}
            <h6>{post.title}</h6>
            <Link
              className="btn btn-primary btn-sm mb-2"
              to={`/post/${post.id}`}
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Like;
