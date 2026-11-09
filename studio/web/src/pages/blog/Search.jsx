import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Sider from "./Sider";
import DOMPurify from "dompurify";
import { useContext } from "react";
import { AppContext } from "../../contexts/appContext";

const Search = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchPosts } = useContext(AppContext);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const posts = await fetchPosts(search);
        setPosts(posts);
      } catch (err) {
        console.log(err);
        alert(err.response?.data || "Error fetching posts");
      }
      setIsLoading(false);
    };
    fetchData();
  }, [search, fetchPosts]);

  // tempPosts = res.data.filter(
  //   (post) =>
  //     post.title.toLowerCase().includes(from) ||
  //     post.desc.toLowerCase().includes(from)
  // );
  // console.log(searchedPosts);

  return (
    <section className="overflow-hidden pt-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full md:w-3/4">
            {isLoading ? (
              <div className="flex justify-center items-center py-10">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="mb-4 p-4 border border-gray-300 rounded-lg shadow-sm"
                >
                  <Link
                    className="text-gray-500 hover:text-gray-700 no-underline"
                    to={`/posts/${post.id}`}
                    state={post}
                  >
                    <h1 className="text-xl font-bold">{post.title}</h1>
                    <img
                      className="w-full h-auto rounded-md mt-2"
                      src={post.imgUrl}
                      alt={post.title}
                    />
                  </Link>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(post.desc?.substring(0, 300)),
                    }}
                    className="mt-2 text-gray-600"
                  ></p>
                </div>
              ))
            )}
          </div>
          <div className="w-full md:w-1/4 md:ml-auto">
            <Sider />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
