// This component checks if the user is authenticated
// If authenticated, it renders the children (protected content)

import { Navigate } from "react-router-dom"

// If not authenticated, it redirects to the login page
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("userInfo")

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />
  }

  // Render the protected content if authenticated
  return children
}

export default ProtectedRoute

