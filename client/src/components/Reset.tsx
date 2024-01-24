import React, { FormEventHandler, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import style from "../styles/Username.module.css";
import AppInput from "./reusable/AppInput";
import { resetPassword } from "../apis/apiHelper";
import { useNavigate } from "react-router-dom";

const Reset = () => {
  const otpString = localStorage.getItem("otp");
  const navigate = useNavigate();
  const user = JSON.parse(otpString as string);
  const [password, setPwd] = useState("");
  const [cPassword, setCpwd] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/password");
    }
  }, [navigate, user]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (password === cPassword) {
      const obj = { username: user?.username, otp: user?.otp, password };
      const { data } = await resetPassword(obj);
      if (data.success) {
        localStorage.removeItem("otp");
        toast.success(data.message);
        navigate("/password");
      } else {
        toast.error(data.message);
        console.log(data);
      }
    } else {
      toast.error("Password not match...!");
    }
  };

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" />
      <div className="flex justify-center items-center h-screen">
        <div className={style.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-3xl font-bold text-white">Reset Password</h4>
            <span className="py-4 text-sm w-2/3 text-center text-gray-500">
              Enter New Password
            </span>
          </div>

          <form className="pt-5" onSubmit={handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <AppInput
                name={"password"}
                // onBlur={handleBlur}
                onChange={(e) => setPwd((e.target as HTMLInputElement).value)}
                placeholder={"password"}
                type={"text"}
                value={password}
              />
              <AppInput
                name={"confirmPassword"}
                // onBlur={handleBlur}
                onChange={(e) => setCpwd((e.target as HTMLInputElement).value)}
                placeholder={"Confirm Password"}
                type={"text"}
                value={cPassword}
              />
              <button className={style.btn} type="submit">
                Set Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reset;
