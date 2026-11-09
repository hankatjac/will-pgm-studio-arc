import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../contexts/appContext";

const Like = ({ cat, id }) => {
  const [filterPost, setFilterPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchPosts } = useContext(AppContext);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const posts = await fetchPosts(`?cat=${cat}`);
        setFilterPost(posts.filter((post) => post.id !== id));
      } catch (err) {
        console.log(err);
        alert(err.response?.data || "Error fetching posts");
      }
      setIsLoading(false);
    };
    fetchData();
  }, [cat, fetchPosts, id]);

  return (
    <div className="mb-4 p-4 bg-white rounded shadow">
      <div className="card-body">
        <h4 className="text-lg font-semibold mb-4">Similar Posts</h4>
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          filterPost.map((post) => (
            <div key={post.id} className="mb-4">
              <img
                className="w-full rounded-lg shadow-md"
                src={post.imgUrl}
                alt=""
              />
              <h6 className="text-md font-medium mt-2">{post.title}</h6>
              <Link
                className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                to={`/posts/${post.id}`}
                state={post}
              >
                Read More
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Like;
