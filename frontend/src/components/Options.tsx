import { Menu } from "@headlessui/react";
import { MoreVertical } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";




export const Options=({id}:{id:number})=>{
  const navigate=useNavigate();
  return <div>
     <Menu as="div" className="relative">
          <Menu.Button className="p-1 rounded-full hover:bg-gray-100">
            <MoreVertical className="w-5 h-5 text-gray-500" />
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none z-10">
            <div className="p-1">
              <Menu.Item>
                {({ active }) => (
                  <button onClick={()=>{
                     navigate(`/update/${id}`)
                  }}
                    className={`${
                      active ? "bg-gray-100" : ""
                    } w-full text-left px-4 py-2 text-sm text-gray-700`}
                  >
                    Edit
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-gray-100" : ""
                    } w-full text-left px-4 py-2 text-sm text-red-600`}
                  >
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Menu>
    </div>
  
}