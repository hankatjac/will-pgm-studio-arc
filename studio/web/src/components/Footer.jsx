import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { useContext } from "react";
import { AppContext } from "../contexts/appContext";

const Footer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const { fetchPosts } = useContext(AppContext);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const posts = await fetchPosts();
        setPosts(posts);
      } catch (err) {
        console.log(err);
        alert(err.response?.data || "Error fetching posts");
      }
      setIsLoading(false);
    };
    fetchData();
  }, [fetchPosts]);

  return (
    <footer className="bg-gray-800 text-white">
      {/* Footer Bottom */}
      <div className="bg-gray-900 py-3">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
          <p className="text-gray-400">
            Copyright &copy; Will-PGM studio {new Date().getFullYear()} - All
            rights reserved
          </p>

          <ul className="flex space-x-4 mt-4 sm:mt-0">
            <li>
              <a
                href="https://www.facebook.com/hankbymeta/"
                className="hover:text-blue-400 transition-colors"
              >
                <FaFacebookF size={20} />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/hang-ruan/"
                className="hover:text-blue-600 transition-colors"
              >
                <FaLinkedinIn size={20} />
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-red-500 transition-colors">
                <FaGoogle size={20} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
