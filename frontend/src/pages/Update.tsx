import { Appbar } from "../components/Appbar";
import { ChangeEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";




export const Update = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
 
        const handleUpdate=async()=>{
  
                    try{
                    
                            const response=await axios.put(`${BACKEND_URL}/api/v1/blog`,{
                                id:Number(id),
                                title,
                                content,
                            },{
                                headers:{
                                    Authorization:localStorage.getItem("token") ?? "",
                                    "Content-Type":"application/json",
                                },
                            } )
                            navigate(`/blog/${response.data.id}`);
                            }
                            catch(e)
                            {
                            console.log(localStorage.getItem("token"))
                            console.error("Error updating blog:", e);
                                alert("Failed to update bllllog.");
                            }
}

  return <div>
    <Appbar />
    <div className="flex justify-center w-full pt-8">

      <div className="flex flex-col items-center w-full space-y-4" >
        <div className="max-w-screen-lg w-full">
          <input onChange={(e) => {
            setTitle(e.target.value);
          }} type="text" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Title" ></input>
        </div>
        <div className="max-w-screen-lg w-full"><TextEditor onChange={(e) => {
          setContent(e.target.value);
        }}></TextEditor>
        </div>
        <div className="pt-9">
          <button onClick={handleUpdate} type="button" className="  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
        </div>
      </div>
    </div>
  </div>
}


function TextEditor({ onChange }: { onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void }) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Content
      </label>
      <textarea
        id="large-input"
        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500"
        placeholder="Content"
        onChange={onChange}
      />
    </div>
  );
}