import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../main";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const Signup = () => {
  let navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const dispatch = useDispatch();



const handleSignup = async (e) =>{
    e.preventDefault();
    setLoading(true);
    try {
      let result = await axios.post(`${SERVER_URL}/auth/signup`, {
        username, email, password
    },{withCredentials:true});

    dispatch(setUserData(result.data));

    
    setUsername("");
    setEmail("");
    setPassword("");
    setLoading(false);
    setErr("");

    } catch (error) {
      console.log(error.response.data);
      setErr(error?.response?.data.message);
    }
  }

  return (
    <div className="w-full h-[100vh] bg-slate-200 flex items-center justify-center px-1">
      <div className="w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[30px]">
        <div className="w-full h-[200px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center">
          <h1 className="text-gray-600 font-bold text-[30px]">
            Welcome to <span className="text-white">Bizivilty Chat</span>{" "}
          </h1>
        </div>
        <form onSubmit={handleSignup} className="w-full flex flex-col gap-[20px] items-center">
          <input
            className="w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white
        rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[19px]"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
          />
          <input
            className="w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white
        rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[19px]"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          />

          <div className="w-[90%] h-[50px] border-2 border-[#20c7ff] overflow-hidden rounded-lg shadow-gray-200 shadow-lg relative">
            <input
              className="w-full h-full outline-none px-[20px] py-[10px] bg-[white] text-gray-700 text-[19px]" 
              type={`${showPassword ? "text" : "password"}`}
              placeholder="password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
            <span className="absolute top-[10px] right-[20px] text-[19px] text-[#20c7ff] font-semibold cursor-pointer"
            onClick={() => setShowPassword(prev => !prev)}>
              {showPassword ? "hide" : "show"}
            </span>
          </div>

          {
            err && <p className="text-red-500 font-semibold">*{err}</p>
          }

          <button

            className="px-[20px] py-[10px] bg-[#20c7ff] text-white rounded-2xl shadow-gray-400 shadow-lg text-[20px] w-[200px]
        mt-[20px] font-semibold hover:shadow-inner hover:cursor-pointer"
        disabled={loading}
          >
            {loading ? "Loading..." :  "Signup"}
          </button>
          <p className="cursor-pointer" onClick={() => navigate("/login")}>
            Already have an Account ?{" "}
            <span className="text-[#20c7ff] font-semibold hover:cursor-pointer">
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
