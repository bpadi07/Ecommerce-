import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LetsChatComponent from "./components/chatbot/LetsChat.jsx"; // Import the LetsChatComponent

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container py-3 mx-auto flex-grow">
        {/* This is where the routed components will be rendered */}
        <Outlet />
        
        {/* Toast notifications */}
        <ToastContainer />

        {/* Add the LetsChatComponent here */}
        <LetsChatComponent /> {/* Chat functionality */}
      </main>
      
      <Footer />
    </div>
  );
}
