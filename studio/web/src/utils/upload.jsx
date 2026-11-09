import axios from "axios";

export const uploadToCloudinary = async (file) => {
  if (!file || file.size === 0) {
    throw new Error("Invalid file - Please select a non-empty file");
  }

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "willpgm");

  try {
    const res = await axios.post(import.meta.env.VITE_UPLOAD_LINK, data, {
      withCredentials: false, // Ensure credentials are not included
      secure: true, // Use secure connection
    });
    console.log("Cloudinary response:", res.data);
    const { url, public_id } = res.data;
    return { url, public_id };
  } catch (err) {
    console.error("Cloudinary upload error:", err.response?.data || err.message);
    throw new Error("Failed to upload file");
  }
};

// export const uploadToS3 = async (file) => {
//   try {
//     const formData = new FormData();
//     formData.append("photo", file);
//     const res = await axios.post(`${import.meta.env.VITE_API_URL}/upload`, formData);
//     return res.data;
//   } catch (err) {
//     console.log(err);
//     alert("File Upload Error");
//   }
// };
