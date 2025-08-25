import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import AuthLayout from './layout/auth_layout/AuthLayout'
import About from './pages/About/Index'
import Login from './pages/Auth/Login/Login'
import Register from './pages/Auth/Register/Register'
import Home from './pages/Home/Home'
import Navbar from './layout/navbar/Index'
import Dashboard from './pages/Dashboard'
import Explore from './pages/Explore/Index'
import ExploreBooks from './pages/Explore/Books/ExploreBooks'
import ExploreAll from './pages/Explore/All/ExploreAll'
import ExploreArticles from './pages/Explore/Articles/ExploreArticles'
import ExploreResearchPapers from './pages/Explore/ResearchPapers/ExploreResearchPaper'
import ExploreThesis from './pages/Explore/Thesis/ExploreThesis'
import ExploreBlogs from './pages/Explore/Blogs/ExploreBlogs'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='/explore' element={<Explore />}>
          <Route index path='/explore/' element={<ExploreAll />} />
          <Route path='books' element={<ExploreBooks />} />
          <Route path='articles' element={<ExploreArticles />} />
          <Route path='blogs' element={<ExploreBlogs />} />
          <Route path='research-papers' element={<ExploreResearchPapers />} />
          <Route path='thesis' element={<ExploreThesis />} />
        </Route>
        <Route path="about" element={<About />} />

        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path='dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter >
  )
}

export default App
