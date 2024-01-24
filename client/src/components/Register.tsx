import React, { ChangeEvent, FormEventHandler, useState } from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import avatart from "../assets/profile.png";
import style from "../styles/Username.module.css";
import AppInput from "./reusable/AppInput";
import { registerUser } from "../apis/apiHelper";

const Register = () => {
  const [file, setFile] = useState<string | null>();
  // const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    profile: file || "",
  });
  const fileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Data = e.target?.result as string;
        setFile(base64Data);
        setUser((prevUser) => ({ ...prevUser, profile: base64Data }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const userObj = {
      username: user.username.toLowerCase(),
      email: user.email.toLowerCase(),
      password: user.password,
      profile: user.profile,
    };
    const { data } = await registerUser(userObj);
    if (data.success) {
      toast.success(data.message);
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
            <h4 className="text-3xl font-bold">Register</h4>
            <span className="py-2 text-sm w-2/3 text-center text-gray-500">
              Happy To Join You
            </span>
          </div>

          <form className="py-1" onSubmit={handleSubmit}>
            <div className="profile flex justify-center py-2">
              <label htmlFor="profile">
                <img
                  src={file || avatart}
                  alt="avatar"
                  className={style.profile_img}
                />
              </label>
              <input
                type="file"
                onChange={fileUpload}
                name="profile"
                id="profile"
              />
            </div>

            {/* User registration form */}
            <div className="textbox flex flex-col items-center gap-4">
              <AppInput
                name={"username"}
                onChange={(e) =>
                  setUser({
                    ...user,
                    username: (e.target as HTMLInputElement).value,
                  })
                }
                placeholder={"Username"}
                type={"text"}
                value={user.username}
              />
              <AppInput
                name={"email"}
                onChange={(e) =>
                  setUser({
                    ...user,
                    email: (e.target as HTMLInputElement).value,
                  })
                }
                placeholder={"example@example.com"}
                type={"email"}
                value={user.email}
              />
              <AppInput
                name={"password"}
                onChange={(e) =>
                  setUser({
                    ...user,
                    password: (e.target as HTMLInputElement).value,
                  })
                }
                placeholder={"Password"}
                type={"text"}
                value={user.password}
              />
              <button className={style.btn} type="submit">
                Register
              </button>
            </div>
          </form>

          <div className="text-center py-4">
            <span className="text-gray-500 text-sm ">
              Already Register?{" "}
              <Link
                to={"/"}
                className="text-blue-700 text-sm hover:text-red-500"
                >
                Login Now
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
