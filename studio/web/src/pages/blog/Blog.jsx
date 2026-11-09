import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Sider from "./Sider";
import DOMPurify from "dompurify";
import { useContext } from "react";
import { AppContext } from "../../contexts/appContext";


const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const cat = useLocation().search;
  console.log(cat);

  const { fetchPosts } = useContext(AppContext);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const posts = await fetchPosts(cat);
        setPosts(posts);
      } catch (err) {
        console.log(err);
        alert(err.response?.data || "Error fetching posts");
      }
      setIsLoading(false);
    };
    fetchData();
  }, [cat, fetchPosts]);

  return (
    <section className="overflow-hidden pt-4">
      <div className="max-w-screen-lg mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            {isLoading ? (
              <div className="flex justify-center items-center py-10">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white shadow-md rounded-lg p-5 mb-4"
                >
                  <Link
                    to={`/posts/${post.id}`}
                    state={post}
                    className="text-gray-700 hover:underline"
                  >
                    <h1 className="text-xl font-semibold">{post.title}</h1>
                    <img
                      className="w-full h-auto rounded-md mt-3"
                      src={post.imgUrl}
                      alt=""
                    />
                  </Link>
                  <p
                    className="mt-3 text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(post.desc?.substring(0, 500)),
                    }}
                  ></p>
                </div>
              ))
            )}
          </div>
          <div className="md:col-span-1">
            <Sider />
          </div>
        </div>
      </div>
   
    </section>
  );
};

export default Blog;
