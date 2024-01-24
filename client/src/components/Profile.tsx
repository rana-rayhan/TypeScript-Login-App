import React, {
  ChangeEvent,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import avatar from "../assets/profile.png";
import style from "../styles/Username.module.css";
import AppInput from "./reusable/AppInput";
import { useSelector } from "react-redux";
import { logoutUser, updateUser } from "../apis/apiHelper";

interface RootState {
  user: any | null;
}

const Profile = () => {
  const [file, setFile] = useState<string | null>();
  const navigate = useNavigate();
  const getUser = useSelector((state: RootState) => state.user);
  const [user, setUser] = useState({
    email: getUser?.user?.email || "",
    firstName: getUser?.user?.firstName || "",
    lastName: getUser?.user?.lastName || "",
    mobile: getUser?.user?.mobile || "",
    address: getUser?.user?.address || "",
    profile: getUser?.user?.profile || file,
  });
  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user = JSON.parse(userString as string);
    if (!user?.email) {
      navigate("/password");
    }
  }, [navigate]);

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

    const { data } = await updateUser(user, getUser.user._id);
    if (data.success) {
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(data?.payload));
      toast.success(data.message);
    } else {
      toast.error(data.message);
      console.log(data);
    }
  };

  const handleLogout = async () => {
    const { data } = await logoutUser();
    if (data.success) {
      localStorage.removeItem("user");
      localStorage.removeItem("recovery");
      navigate("/");
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
            <h4 className="text-3xl font-bold">Profile</h4>
            <span className="py-2 text-sm w-2/3 text-center text-gray-500">
              You can update the details
            </span>
          </div>

          <form className="py-1" onSubmit={handleSubmit}>
            <div className="profile flex justify-center py-2">
              <label htmlFor="profile">
                <img
                  src={user?.profile || file || avatar}
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
              <div className="name flex w-3/4 gap-10">
                <AppInput
                  name={"firstName"}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      firstName: (e.target as HTMLInputElement).value,
                    })
                  }
                  placeholder={"First name"}
                  type={"text"}
                  value={user?.firstName}
                />
                <AppInput
                  name={"lastName"}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      lastName: (e.target as HTMLInputElement).value,
                    })
                  }
                  placeholder={"Last name"}
                  type={"text"}
                  value={user?.lastName}
                />
              </div>
              <div className="name flex w-3/4 gap-10">
                <AppInput
                  name={"mobile"}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      mobile: (e.target as HTMLInputElement).value,
                    })
                  }
                  placeholder={"Mobile"}
                  type={"text"}
                  value={user?.mobile}
                />
                <AppInput
                  name={"address"}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      address: (e.target as HTMLInputElement).value,
                    })
                  }
                  placeholder={"Address"}
                  type={"text"}
                  value={user?.address}
                />
              </div>
              <AppInput
                name={"email"}
                onChange={(e) =>
                  setUser({
                    ...user,
                    email: (e.target as HTMLInputElement).value,
                  })
                }
                placeholder={"Email"}
                type={"text"}
                value={user.email}
              />
              <button className={style.btn} type="submit">
                Update
              </button>
            </div>
          </form>

          <div className="text-center py-4">
            <span className="text-gray-500 text-sm">
              Come back later?{" "}
              <button
                onClick={handleLogout}
                className="text-blue-700 text-sm hover:text-red-500"
                >
                Logout
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
