//React
import React, { useEffect, useState } from "react";
//React-Router_Dom Library
import { useParams, useNavigate } from "react-router-dom";
//Axios for data fetching
import axios from "axios";

function UserDetailPage() {
  //hook to keep user id to navigate to user detail page
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const navigator = useNavigate();
  const handleButtonClick = () => {
    // Use navigate(-1) to navigate back
    navigator(-1);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3030/users/${userId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [userId]);

  if (!user) {
    return <div>Loading user details...</div>;
  }

  return (
    <>
  <div className="block mx-[42%] my-10 p-2 border border-solid border-gray-300 font-bold 
  shadow-md text-center w-full sm:w-64 bg-gradient-to-r from-purple-300 to-pink-400 animate-gradient">
    <div className="absolute left-1/2 transform -translate-x-2/3 -translate-y-1/2">
      <img
        src={user.image}
        className="overflow-hidden w-20 h-30 bg-gray-300 rounded-full"
      />
    </div>

    <div>
      <h2 className="mb-3 mt-20 text-lg flex mx-5 text-cyan-200">
        This is <strong className="text-red-800"> {user.name}</strong>'s
        profile
      </h2>
      <label className="flex font-bold ml-10 text-sm text-cyan-200">
        Name:
        <div className="w-full sm:w-20 mb-5 ml-5 border-gray-300 rounded-md">
          {user.name}
        </div>
      </label>

      <label className="flex font-bold ml-10 text-sm text-cyan-200">
        Phone:
        <div className="w-full sm:w-30 mb-5  border-gray-300 rounded-md">
          {user.phone}
        </div>
      </label>

      <label className="flex font-bold ml-10 text-sm text-cyan-200">
        Email:
        <div className="w-full sm:w-40 mb-5 border-gray-300 rounded-md">
          {user.email}
        </div>
      </label>

      
    </div>
    <button
      type="button"
      onClick={handleButtonClick}
      className="w-full sm:w-85 px-5 mb-6 font-mono text-md bg-slate-600 text-cyan-200 border-none rounded-sm cursor-pointer"
    >
      back
    </button>
  </div>
</>

  );
}

export default UserDetailPage;
