import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/appContext";
import avatar from "../assets/img/logos/avatar_2x.png";

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { login } = useContext(AppContext);

  const submitForm = async (data) => {
    console.log(data);
    setIsLoading(true);
    setMessage("");

    try {
      await login(data);
      navigate("/");
    } catch (err) {
      setIsLoading(false);
      setMessage(err.response.data);
    }
  };

  return (
    <section className="max-w-md mx-auto py-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{t("login")}</h1>
        <img src={avatar} alt="profile-img" className="w-24 h-24 mx-auto rounded-full mt-4" />
      </div>

      <form onSubmit={handleSubmit(submitForm)} className="mt-6 space-y-4">
        <div>
          <label className="block text-gray-700">{t("username")}</label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            name="username"
            type="text"
            {...register("username", { required: true, maxLength: 10 })}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{t("Please enter your name.")}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700">{t("password")}</label>
          <input
            name="password"
            type="password"
            {...register("password", { required: true })}
            className={`w-full px-4 py-2 border rounded-md ${
              errors.password ? "border-red-500" : "border-gray-300"
            } focus:ring focus:ring-blue-200`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">Please enter your password</p>
          )}
        </div>

        <div className="text-center">
          <p className="text-red-500">{message}</p>
          {isLoading ? (
                  <div className="flex justify-center items-center py-10">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          ) : (
            <button
              className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200"
              type="submit"
            >
              {t("login")}
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default Login;