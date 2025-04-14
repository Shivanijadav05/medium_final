import { ChangeEvent } from "react";
import { Link,useNavigate } from "react-router-dom"
import { useState } from "react";
import { SignupInput } from "shivani-medium-common";
import axios from "axios"
import { BACKEND_URL } from "../config";


export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate=useNavigate();
    const [postInputs, setpostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    })
    async function sendRequest()
    {
        try{
            const response=await axios.post(`${BACKEND_URL}/api/v1/user/${type=="signup"?"signup":"signin"}`,postInputs)
            const jwt=response.data.token;
            console.log(jwt);
            localStorage.setItem("token",jwt);
             navigate("/blogs")
        } catch(e)
        {
            alert("error while signing up")
            console.log(e)
        }
    }

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="px-10">
                    <div className="text-3xl font-extrabold">
                        Create an account</div>
                    <div className="text-slate-400">{type == "signup" ? "Already have an account?" : "Don't have an account?"}
                        <Link className="underline" to={type == "signup" ? "/signin" : "/signup"}>{type == "signup" ? "signin" : "signup"}</Link></div>
                </div>
                <div>
                    {type=="signup"?<GenerateComponents label="Name" placeholder="Shivani Jadav" onChange={(e) => {
                        setpostInputs({
                            ...postInputs,
                            name: e.target.value
                        })
                    }}></GenerateComponents>:null}


                    <GenerateComponents label="Username" placeholder="shi@gmail.com " onChange={(e) => {
                        setpostInputs({
                            ...postInputs,
                            username: e.target.value
                        })
                    }}></GenerateComponents>

                    <GenerateComponents label="Password" placeholder="1234" onChange={(e) => {
                        setpostInputs({
                            ...postInputs,
                            password: e.target.value
                        })
                    }}></GenerateComponents>
                    <button onClick={sendRequest} type="button" className="w-full mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type == "signup" ? "Signup" : "Signin"}</button>
                </div>
            </div>
        </div>
    </div>
}
interface GenerateComponentsType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string
}



function GenerateComponents({ label, placeholder, onChange, type }: GenerateComponentsType) {
    return <div>
        <label className="block mb-2 text-sm font-bold text-black pt-5 ">{label}</label>
        <input onChange={onChange} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full max-w-lg p-2.5 " placeholder={placeholder} required />
    </div>



}