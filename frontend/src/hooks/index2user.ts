// src/hooks/useUser.ts
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";



export const useUser = () => {
  const [name, setname] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    axios
      .post(`${BACKEND_URL}/api/v1/user/userinfo`,
        {},
         {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        
        setname(res.data.user.name)
       console.log(res.data.user) // adjust based on your API shape
      })
      .catch((err) => console.error(err))
  }, []);

  return name;
}