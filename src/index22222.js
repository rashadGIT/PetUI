import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ZoomieHomePage from "./ZoomieHomePage";
import ChatBot from "./ChatBot"; // create this component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ZoomieHomePage />} />
        <Route path="/chat" element={<ChatBot />} />
      </Routes>
    </BrowserRouter>
  );
}

// export default App;

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode>
    <App />
  </React.StrictMode>)