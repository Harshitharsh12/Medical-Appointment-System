import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const Homepage = () => {
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getUserData",
        {},
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default Homepage;
