// import React,{ useState } from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./assets/pages/signin";
import Home from "./assets/pages/home";
import SignUp from "./assets/pages/signup";
import Dashboard from "./assets/pages/dashboard/dashboard";
import NavBar from "./assets/components/navbar";
import { AuthProvider } from "./AuthContext";
import Footer from "./assets/components/footer";
import NotFound from "./assets/pages/notFound";
import BlogSinglePage from "./assets/pages/singleBlog";
import ProtectedRoute from "./protectedRoutes";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/blogs/:id" element={<BlogSinglePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
