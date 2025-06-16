import {  useNavigate } from "react-router-dom"

export const Home=()=>
{
    const navigate=useNavigate();
    return(
           <div className="min-h-screen flex flex-col justify-between bg-white text-gray-800 px-6 py-10">
                {/* Hero Section */}
                <section className="text-center mb-6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Welcome to Medium Clone
                    </h1>
                    <p className="text-lg text-gray-600 max-w-xl mx-auto">
                    A place to read, write, and connect through powerful ideas and stories.
                    </p>
                    <div className="mt-6">
                    <button onClick={()=>{
                        navigate("/signup")
                    }} className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300">
                        Start Writing
                    </button>
                    </div>
                </section>

                  {/* Intro Section */}
                <section className="bg-gray-100 rounded-xl p-6 md:p-10 mb-6 shadow text-center">
                    <h2 className="text-2xl font-semibold mb-2">Why Choose Us?</h2>
                    <p className="text-gray-700 max-w-2xl mx-auto">
                    We believe everyone has a story worth sharing. Our platform empowers new voices and seasoned writers alike to make an impact through meaningful content.
                    </p>
                </section>

                     {/* What is Medium Section */}
                <section className="bg-gray-100 rounded-xl p-6 md:p-10 mb-6 shadow">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4">What is Medium?</h2>
                    <p className="text-gray-700 text-md md:text-lg leading-relaxed">
                    Medium is a platform where writers, thinkers, and storytellers can publish
                    their ideas and reach a global audience. Whether you’re a professional writer
                    or just someone with a story to share, Medium provides a clean, simple
                    interface and a thriving community to support your journey.
                    </p>
                </section>

                     {/* Footer */}
                <footer className="border-t pt-6 text-center text-gray-500 text-sm">
                    © 2025 Medium Clone. Built for learning and inspiration.
                </footer>
    </div>
    )
            


    
}