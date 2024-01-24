import React, { FormEventHandler, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import avatart from "../assets/profile.png";
import style from "../styles/Username.module.css";
import AppInput from "./reusable/AppInput";
import { isUserExist } from "../apis/apiHelper";

const Username = () => {
  const [userName, setUsername] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString as string);
    if (user) {
      navigate("/profile");
    }
  }, [navigate]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const { data } = await isUserExist(userName);
    if (data?.success) {
      localStorage.setItem("user", JSON.stringify(data?.payload));
      localStorage.setItem("recovery", JSON.stringify(data?.success));
      navigate("/password");
    } else {
      toast.error(data?.message);
    }
  };

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" />
      <div className="flex justify-center items-center h-screen">
        <div className={style.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-3xl font-bold">Login System</h4>
            <span className="py-4 text-sm w-2/3 text-center text-gray-500">
              Secure Your Life...
            </span>
          </div>

          <form className="py-1" onSubmit={handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={avatart} alt="avatar" className={style.profile_img} />
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <AppInput
                name={"username"}
                // onBlur={handleBlur}
                onChange={(e) =>
                  setUsername((e.target as HTMLInputElement).value)
                }
                placeholder={"username"}
                type={"text"}
                value={userName}
              />
              <button className={style.btn} type="submit">
                Let's Go
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500 text-sm">
                Dont have account?{" "}
                <Link
                  className="text-blue-700 text-sm hover:text-red-500"
                  to={"/register"}
                >
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Username;
