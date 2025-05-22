/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios"
import { useEffect } from "react"
import { SERVER_URL } from "../main"
import { useDispatch, useSelector } from "react-redux"
import { setUserData } from "../redux/userSlice"

const getCurrentUser = () => {
  let dispatch = useDispatch();

  let {userData} = useSelector(state => state.user);

  useEffect(() =>{
    const fetchUser = async() => {
        try {
          let result = await axios.get(`${SERVER_URL}/user/current`, {withCredentials:true});
          dispatch(setUserData(result.data));
        } catch (error) {
            console.log(error);
        }
    }
    fetchUser();

  },[userData]);
}

export default getCurrentUser;