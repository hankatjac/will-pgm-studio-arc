import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Sider from "./Sider";

const Search = () => {
  const location = useLocation();
  const from = location.state?.from;
  console.log(from);
  // console.log(typeof from);

  const [searchedPosts, setSearchedPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let tempPosts = [];
      try {
        const res = await axios.get("/posts");

        tempPosts = res.data.filter(
          (post) =>
            post.title.toLowerCase().includes(from) ||
            post.desc.toLowerCase().includes(from)
        );

        setSearchedPost(tempPosts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [from]);

  console.log(searchedPosts);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <section className="overflow-hidden pt-4">
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            {searchedPosts.map((post) => (
              <div key={post.id} className="card mb-4">
                <Link
                  className="text-muted text-decoration-none"
                  to={`/post/${post.id}`}
                >
                  <h1>{post.title}</h1>
                  {post.img && (
                    <img
                      className="img-fluid"
                      src={`../upload/${post.img}`}
                      alt=""
                    />
                  )}
                </Link>
                <p>{getText(post.desc).substring(0, 200)}</p>
              </div>
            ))}
          </div>
          <div className="col-md-3 ms-auto">
            <Sider />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
