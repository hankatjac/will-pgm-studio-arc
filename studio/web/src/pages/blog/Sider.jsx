import { useState } from "react";
import { Link } from "react-router-dom";

const Sider = () => {
  const [keyword, setKeyword] = useState("");
  // const inputRef= useRef()

  const handleChange = (e) => setKeyword(e.target.value.trim().toLowerCase());

  return (
    <>
      {/* Sidebar with search */}
      <aside className="sidebar">
        <div className="mb-4 p-4 bg-white rounded shadow">
          <div className="flex space-x-2">
            <input
              type="search"
              placeholder="Search"
              className="border px-3 py-2 rounded w-full focus:outline-none focus:ring focus:border-blue-300"
              aria-label="Search"
              value={keyword}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && keyword) {
                  window.location.href = `/will-pgm-studio-vite/posts/?search=${keyword}`;
                }
              }}
            />
            {keyword && (
              <Link
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                to={`/posts/?search=${keyword}`}
              >
                Search
              </Link>
            )}
          </div>
        </div>
      </aside>

      {/* Sidebar with categories */}
      <aside className="sidebar sticky top-0">
        <div className="mb-4 p-4 bg-white rounded shadow">
          <div className="card-body">
            <h4 className="text-lg font-semibold mb-2">Categories</h4>
            <div className="flex flex-col items-start space-y-2">
              {["business", "culture", "technology", "quotidian"].map((cat) => (
                <Link
                  key={cat}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200 transition capitalize"
                  to={`/posts?cat=${cat}`}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Blog post button */}
      <aside>
        <div className="text-center">
          <Link
            className="bg-blue-700 text-white px-5 py-2.5 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition"
            to="/posts/write"
          >
            Post a Blog
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sider;
