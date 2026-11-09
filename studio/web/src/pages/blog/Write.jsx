import { useState, useRef, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { AppContext } from "../../contexts/appContext";
import { uploadToCloudinary } from "../../utils/upload";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const Write = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState(null);

  const inputRef = useRef(null);
  const blog = useLocation().state;

  const [value, setValue] = useState(blog?.desc || "");
  const [title, setTitle] = useState(blog?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(blog?.cat || "");

  // const [err, setError] = useState(null);

  const [messageQuill, setMessageQuill] = useState(false);
  const [message, setMessage] = useState(false);
  const navigate = useNavigate();
  const { logout, deletePostImage } = useContext(AppContext);

  const handleFileAndFileName = () => {
    if (inputRef.current.files[0].size > 3 * 1024 * 1024)
      alert("File size cannot exceed more than 3MB");
    if (inputRef.current.files.length !== 1) {
      alert("please upload only one file");
      return;
    }
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validImageTypes.includes(inputRef.current.files[0].type)) {
      alert("uploaded files must be valid image types (JPEG, PNG, GIF)");
      return;
    } else {
      setFile(inputRef.current.files[0]);
      setUploadedFileName(inputRef.current.files[0].name);
    }
  };

  const handleUploadImg = (e) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  const handleImageUpload = async (file, blog) => {
    let blogImage = null;

    if (file) {
      try {
        // Upload blog image
        blogImage = await uploadToCloudinary(file);
        if (!blogImage) {
          throw new Error("Unexpected API response: image upload failed.");
        }
      } catch (err) {
        console.error(err);
        alert(`An error occurred while uploading images: ${err.message}`);
        return null;
      }

      if (blog) {
        try {
          // Delete the existing image from Cloudinary
          await axios.post(
            `${import.meta.env.VITE_API_URL}/img/cloudinary/delete`,
            {
              public_ids: [blog.imgId], // Pass an array of public IDs for the images
            }
          );
        } catch (err) {
          console.error(err);
          alert("An error occurred while deleting images from Cloudinary");
        }
      }
    } else if (!blog) {
      alert("Please upload an image");
      return null;
    }

    return blogImage;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputRef.current.files.length === 0 && !!blog === false) {
      setMessage(true);
      return;
    }

    if (value.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
      setMessageQuill(true);
      return;
    }

    setIsLoading(true);

    const blogImage = await handleImageUpload(file, blog);

    if (!blogImage && !blog) {
      setIsLoading(false);
      return;
    }

    try {
      if (blog) {
        setIsLoading(true);
        await axios.put(`${import.meta.env.VITE_API_URL}/post/${blog.id}`, {
          title,
          desc: value,
          cat,
          imgUrl: file ? blogImage.url : blog.imgUrl,
          imgId: file ? blogImage.public_id : blog.imgId,
        });
        file && deletePostImage(blog.imgId);
      } else {
        setIsLoading(true);
        await axios.post(`${import.meta.env.VITE_API_URL}/post/`, {
          title,
          desc: value,
          cat,
          imgUrl: blogImage.url,
          imgId: blogImage.public_id,
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        });
      }
      setMessage(false);
      setMessageQuill(false);
      navigate("/posts");
    } catch (err) {
      // setError(err.response.data);
      alert(err.response.data.message);
      if (err.response.status === 401) {
        logout();
        navigate("/login");
      }
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <section className="py-5">
      <div className="container mx-auto max-w-4xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-center text-2xl font-bold mb-4">Write a Blog</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Blog Content */}
            <div className="md:col-span-2 mb-5">
              <input
                className="w-full border rounded px-3 py-2 mb-4 focus:outline-none focus:ring focus:border-blue-300"
                type="text"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
              />
              <ReactQuill
                style={{ height: "300px" }}
                value={value}
                onChange={setValue}
              />
              {messageQuill && (
                <div className="bg-red-500 text-white text-center mx-auto w-1/3 mt-2 p-2 rounded">
                  Please write some texts
                </div>
              )}
            </div>

            {/* Sidebar Settings */}
            <div>
              {/* File Upload */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Choose file:
                </label>
                <input
                  ref={inputRef}
                  onChange={handleFileAndFileName}
                  className="hidden"
                  type="file"
                  accept="image/*"
                />
                <button
                  onClick={handleUploadImg}
                  className={`px-4 py-2 rounded text-white ${
                    uploadedFileName
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  } transition`}
                >
                  {uploadedFileName ? uploadedFileName : "Upload"}
                </button>
                {message && (
                  <div className="bg-red-500 text-white mt-2 p-2 rounded">
                    Please upload a picture
                  </div>
                )}
              </div>

              {/* Category Selection */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Choose a category:
                </label>
                {["business", "culture", "technology", "quotidian"].map(
                  (category) => (
                    <div key={category} className="mb-2">
                      <input
                        type="radio"
                        id={category}
                        name="cat"
                        value={category}
                        checked={cat === category}
                        onChange={(e) => setCat(e.target.value)}
                        required
                        className="mr-2"
                      />
                      <label htmlFor={category} className="text-gray-700">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </label>
                    </div>
                  )
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition text-center"
              >
                {isLoading ? (
                  <div className="flex justify-center items-center py-10">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : (
                  "Publish"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Write;
