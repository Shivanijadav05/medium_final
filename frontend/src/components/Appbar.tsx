import { Link, useNavigate } from "react-router-dom"
import { Avatar } from "./BlogCard"
import { useUser } from "../hooks/index2user"


export const Appbar = () => {
    const user=useUser("a");
  
    console.log(user);
    const navigate=useNavigate();
    return <div className="border-b py-4 flex justify-between px-10">
        <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer ">
            Medium
       
        </Link>
        <div>
        <Link to="/publish">
            <button type="button" className=" mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">NEW BLOG</button>
         </Link>
         
            <Avatar size={"big"} name={user} onClick={()=>{
                navigate("/profile");
            }} ></Avatar>
    </div>
    </div>
}