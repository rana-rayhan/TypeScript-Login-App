import React, { FormEventHandler, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import style from "../styles/Username.module.css";
import AppInput from "./reusable/AppInput";
import { useLocation, useNavigate } from "react-router-dom";
import { isValidOtp, recoverPassword } from "../apis/apiHelper";

const Recovery = () => {
  const [otp, setOtp] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const recoveryString = localStorage.getItem("recovery");
    const recovery = JSON.parse(recoveryString as string);
    if (!recovery) {
      navigate("/password");
    }
  }, [navigate]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const obj = { username: location.state, otp };
    const { data } = await isValidOtp(obj);
    if (data.success) {
      localStorage.setItem("otp", JSON.stringify(obj));
      navigate("/reset");
    } else {
      toast.error(data.message);
      console.log(data);
    }
  };

  // Password recover handler---**
  const handleRecover = async () => {
    const { data } = await recoverPassword(location?.state);
    if (data.success) {
      toast.success(data.message);
    } else {
      console.log(data);
      toast.error(data.message);
    }
  };

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" />
      <div className="flex justify-center items-center h-screen">
        <div className={style.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-3xl font-bold">Recovery</h4>
          </div>

          <form className="pt-5" onSubmit={handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="text-sm text-gray-500 py-4 mb-3">
                  Enter 4 dixit OTP sent to your Email address
                </span>

                <AppInput
                  name={"otp"}
                  // onBlur={handleBlur}
                  onChange={(e) => setOtp((e.target as HTMLInputElement).value)}
                  placeholder={"OTP"}
                  type={"text"}
                  value={otp}
                />
              </div>
              <button className={style.btn} type="submit">
                Recovery
              </button>
            </div>
          </form>
          <div className="text-center py-4">
            <span className="text-gray-500 text-sm">
              Can't Get OTP?{" "}
              <button
                onClick={handleRecover}
                className="text-blue-700 text-sm hover:text-red-500"
              >
                Resend
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
