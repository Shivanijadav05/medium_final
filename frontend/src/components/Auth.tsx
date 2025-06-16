import { ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SignupInput } from "shivani-medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    });

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type}`, postInputs);
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (e) {
            alert("Error while signing up");
            console.log(e);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
           <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300">

                <h2 className="text-3xl font-bold mb-2 text-center text-gray-900">
                    {type === "signup" ? "Create an Account" : "Welcome Back"}
                </h2>
                <p className="text-sm text-gray-600 mb-6 text-center">
                    {type === "signup"
                        ? "Already have an account? "
                        : "Don't have an account? "}
                    <Link to={type === "signup" ? "/signin" : "/signup"} className="text-blue-600 hover:underline">
                        {type === "signup" ? "Sign in" : "Sign up"}
                    </Link>
                </p>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        sendRequest();
                    }}
                    className="space-y-4"
                >
                    {type === "signup" && (
                        <InputField
                            label="Name"
                            placeholder="Shivani Jadav"
                            onChange={(e) =>
                                setPostInputs({ ...postInputs, name: e.target.value })
                            }
                        />
                    )}
                    <InputField
                        label="Email"
                        placeholder="shi@gmail.com"
                        onChange={(e) =>
                            setPostInputs({ ...postInputs, username: e.target.value })
                        }
                    />
                    <InputField
                        label="Password"
                        placeholder="••••••••"
                        type="password"
                        onChange={(e) =>
                            setPostInputs({ ...postInputs, password: e.target.value })
                        }
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        {type === "signup" ? "Sign Up" : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
};

interface InputFieldProps {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

function InputField({ label, placeholder, onChange, type = "text" }: InputFieldProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                required
               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-500 hover:shadow-sm transition duration-300"

            />
        </div>
    );
}
