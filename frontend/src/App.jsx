import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import Select from './pages/Select'
import CreatePost from './pages/createpost'
import Feed from './pages/feed'
import UpdateCaption from './pages/updatecaption'
import Delete from './pages/delete'
import Login from './pages/login'
import Signup from './pages/signup'

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route path="/select" element={
          <ProtectedRoute>
            <Select />
          </ProtectedRoute>
        } />

        <Route path="/feed" element={
          <ProtectedRoute>
            <Feed />
          </ProtectedRoute>
        } />

        <Route path="/createpost" element={
          <ProtectedRoute>
            <CreatePost />
          </ProtectedRoute>
        } />

        <Route path="/updatecaption" element={
          <ProtectedRoute>
            <UpdateCaption />
          </ProtectedRoute>
        } />

        <Route path="/delete" element={
          <ProtectedRoute>
            <Delete />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App