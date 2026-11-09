import { useState } from "react";

import { useForm } from "react-hook-form";
import axios from "axios";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form submitted:", data);
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/contact/willpgm`,
        data
      );
      const result = response.data;
      alert(result);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again.");
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <div className="py-5 flex justify-center">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold">Get in Touch</h1>
          <p className="text-gray-600">We'd love to hear from you!</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Input */}
          <div className="mb-3">
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name..."
              {...register("name", { required: "A name is required" })}
              className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email Input */}
          <div className="mb-3">
            <label className="block text-gray-700 font-medium">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              {...register("email", { required: "An email is required" })}
              className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Phone Number Input */}
          <div className="mb-3">
            <label className="block text-gray-700 font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="(123) 456-7890"
              {...register("phone", { required: "A phone number is required" })}
              className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          {/* Message Input */}
          <div className="mb-3">
            <label className="block text-gray-700 font-medium">Message</label>
            <textarea
              rows="4"
              placeholder="Enter your message here..."
              {...register("message", { required: "A message is required" })}
              className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
              disabled={loading}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
