import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Home from "./Pages/Home"
import Navbar from "./Components/Navbar"
import UserAuth from "./Components/UserAuth"
import ProtectedRoute from "./Components/ProtectedRoute"
import Bookmarks from "./Components/Bookmark"

const App = () => {
  const isAuthenticated = localStorage.getItem("userInfo")

  return (
    <Router>
      <Routes>
        {/* Public route - Login page */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <UserAuth />} />

        {/* Protected routes - require authentication */}
        <Route path="/" element={<ProtectedRoute><><Navbar/> <Home/> </> </ProtectedRoute>}/>
        
        <Route path="/home" element={<ProtectedRoute><><Navbar /> <Home /> </> </ProtectedRoute>} />

        <Route path="/category/:category" element={ <ProtectedRoute> <> <Navbar/><Home/> </></ProtectedRoute>}/>

        <Route path="/search/:searchTerm" element={ <ProtectedRoute> <> <Navbar/> <Home/> </> </ProtectedRoute>}/>

        <Route path="/bookmarks" element={<ProtectedRoute><><Navbar /> <Bookmarks /></></ProtectedRoute>} />


        {/* Catch all route - redirect to home or login based on auth status */}
        <Route path="*" element={isAuthenticated ? <Navigate to="/" replace /> : <Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App

