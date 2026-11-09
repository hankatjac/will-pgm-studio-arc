import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import axios from "axios";

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const submitForm = async (data) => {
    setMessage("");
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, data);
      navigate("/login");
      setSuccessful(true);
    } catch (err) {
      // setError(err.response.data);
      setMessage(err.response.data);
      setSuccessful(false);
    }
  };

  return (
<section className="container mx-auto max-w-md py-10" id="register">
  <div className="text-center">
    <h1 className="font-bold text-xl capitalize">{t("sign up")}</h1>
    <img
      src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
      alt="profile-img"
      className="mx-auto w-24 h-24 rounded-full"
    />
  </div>

  <form
    onSubmit={handleSubmit(submitForm)}
    id="loginForm"
    name="sentMessage"
    className="space-y-6"
  >
    {!successful && (
      <div>
        <div className="mb-4">
          <label className="block text-gray-700">{t("username")}</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            name="username"
            type="text"
            {...register("username", { required: true, maxLength: 10 })}
          />
          {errors.username && (
            <p className="text-sm text-red-600">{t("Please enter your name.")}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">{t("email")}</label>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
            id="email"
            type="email"
            {...register("email", {
              required: true,
              pattern: /^\w+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/,
            })}
          />
          {errors.email && errors.email.type === "required" && (
            <p className="text-sm text-red-600">{t("Please enter your email.")}</p>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <p className="text-sm text-red-600">{t("Please enter a valid email")}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">{t("password")}</label>
          <input
            name="password"
            type="password"
            {...register("password", { required: true })}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 ${
              errors.password ? "border-red-600" : ""
            }`}
          />
          {errors.password && (
            <p className="text-sm text-red-600">Please enter your password</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">{t("confirm password")}</label>
          <input
            name="confirmPwd"
            type="password"
            {...register("confirmPwd", {
              required: true,
              validate: (value) =>
                value === password.current || "The passwords do not match",
            })}
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 ${
              errors.confirmPwd ? "border-red-600" : ""
            }`}
          />
          {errors.confirmPwd && (
            <p className="text-sm text-red-600">{errors.confirmPwd?.message}</p>
          )}
        </div>

        <div className="text-center">
          <button
            id="sendMessageButton"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            type="submit"
          >
            {t("register")}
          </button>
        </div>
      </div>
    )}

    <div className="text-center text-green-600" id="success">
      {message}
    </div>
  </form>
</section>
  );
};

export default Register;
