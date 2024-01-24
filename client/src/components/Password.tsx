import React, { FormEventHandler, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import avatart from "../assets/profile.png";
import style from "../styles/Username.module.css";
import AppInput from "./reusable/AppInput";
import { loginUser, recoverPassword } from "../apis/apiHelper";
import { useDispatch } from "react-redux";
import { addLoggedUser } from "../toolkit/userSlice";

const Password = () => {
  const [password, setpassword] = useState<string>("");
  const [user, setUser] = useState<any>(null); // Specify the type for user
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString as string);
    if (!user) {
      navigate("/");
    }
    if (user?.email) {
      navigate("/profile");
    }
    setUser(user);
  }, [navigate]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString as string);

    const { data } = await loginUser(user?.username, password);
    if (data.success) {
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(data?.payload));
      dispatch(addLoggedUser(data.payload));

      navigate("/profile");
    } else {
      toast.error(data.message);
      console.log(data);
    }
  };
  // Password recover handler---**
  const handleRecover = async () => {
    const { data } = await recoverPassword(user?.username);
    if (data.success) {
      // console.log(data);
    } else {
      toast.error(data.message);
      console.log(data);
    }
  };

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" />
      <div className="flex justify-center items-center h-screen">
        <div className={style.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-3xl font-bold">
              {user ? user?.username : "Hello"}
            </h4>
            <span className="py-4 text-sm w-2/3 text-center text-gray-500">
              Welcome Back
            </span>
          </div>

          <form className="py-1" onSubmit={handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img
                src={user?.profile || avatart}
                alt="avatar"
                className={style.profile_img}
              />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <AppInput
                name={"password"}
                // onBlur={handleBlur}
                onChange={(e) =>
                  setpassword((e.target as HTMLInputElement).value)
                }
                placeholder={"password"}
                type={"text"}
                value={password}
              />
              <button className={style.btn} type="submit">
                Signin
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500 text-sm">
                Forget Password?{" "}
                <Link
                  to={"/recovery"}
                  onClick={handleRecover}
                  className="text-blue-700 text-sm hover:text-red-500"
                  state={user?.username}
                >
                  Recover Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Password;
