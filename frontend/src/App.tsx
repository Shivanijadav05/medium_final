
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import { Signin } from './pages/Signin'
import { Signup} from './pages/Signup'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { Publish } from './components/Publish'
import { Update } from './pages/Update'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'

function App() {
   
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}> </Route>
        <Route path="/profile" element={<Profile/>}> </Route>
        <Route path="/signup" element={<Signup/>}>SignUp</Route>
        <Route path="/signin" element={<Signin/>}>Signin</Route>
        <Route path="/blog/:id" element={<Blog/>}>Blog</Route>
        <Route path="/blogs" element={<Blogs/>}>BLOGS</Route>
        <Route path="/publish" element={<Publish/>}>PUBLISH</Route>
        <Route path="/update/:id" element={<Update/>}></Route>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
