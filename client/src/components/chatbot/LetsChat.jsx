import React, { useState, useEffect, useRef } from "react";
import "./LetsChat.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LetsChatComponent = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChatClick = () => {
    setShowChat(!showChat);
    if (!showChat) {
      // Clear messages when closing the chat
      setMessages([]);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: "user",
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");

      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: "We’ll reply as soon as we can.",
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 1000);
    }
  };

  return (
    <div>
      <button className="chat-button" onClick={handleChatClick}>
        Let's Chat!
      </button>
      {showChat && (
        <div className="chat-box">
          <div className="chat-header">
            <h4>
              🙏 <b>Collab Vision Infosolutions</b>
            </h4>
            <button className="close-btn" onClick={handleChatClick}>
              ×
            </button>
          </div>
          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form className="chat-input" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button type="submit">Send</button>
          </form>
          <div className="chat-options">
            <button onClick={() => toast.info("Continuing here")}>
              Continue Here
            </button>
            <a
              href="https://api.whatsapp.com/send?phone=+918767421060&text=Hi, I have a question..."
              target="_blank"
              rel="noopener noreferrer"
            >
              <button>WhatsApp</button>
            </a>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default LetsChatComponent;
