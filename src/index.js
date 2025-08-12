import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  useSignIn,
} from '@clerk/clerk-react';
import App from './App';
import './index.css';
import logo from './assets/logo.png';
import ChatBot from './ChatBot';
import ZoomieHomePage from './ZoomieHomePage';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// --- Social‑only sign‑in (Google, GitHub, Facebook, Apple) ---
function SocialSignIn(props) {
  const { signIn } = useSignIn();
  const handleOAuth = (provider) => {
    // Trigger Clerk OAuth flow (e.g., 'google', 'github', 'facebook', 'apple')
    signIn.authenticateWithRedirect({
      strategy: `oauth_${provider}`,
      // optional: redirectUrl: '/',            // where Clerk should redirect first
      redirectUrlComplete: props?.path,   // where to end up after auth completes
    });
  };

  const btnStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: '1px solid #ccc',
    background: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontWeight: 600,
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '320px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        background: '#ffffff',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
      }}
    >
      <img
        src={logo}
        alt="App Logo"
        style={{ width: '128px', height: '128px', margin: '0 auto' }}
      />
      <h2 style={{ margin: 0, textAlign: 'center' }}>Sign in with</h2>

      <button style={btnStyle} onClick={() => handleOAuth('google')}>
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="" width="18" />
        Google
      </button>

      {/* <button style={btnStyle} onClick={() => handleOAuth('github')}>
        <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/github.svg" alt="" width="18" />
        GitHub
      </button>

      <button style={btnStyle} onClick={() => handleOAuth('facebook')}>
        <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/facebook.svg" alt="" width="18" />
        Facebook
      </button> */}

      <button style={btnStyle} onClick={() => handleOAuth('apple')}>
        <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/apple.svg" alt="" width="18" />
        Apple
      </button>
    </div>
  );
}
// --- End social sign‑in component ---

// CRA‑style env variable; define it in your .env file as REACT_APP_CLERK_PUBLISHABLE_KEY
// const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
const clerkPubKey = "pk_test_Y2xvc2luZy1yYXQtODAuY2xlcmsuYWNjb3VudHMuZGV2JA"

function Login(props) {
  const location = useLocation();

  return (<>
      <SignedIn>
        {props?.children}
      </SignedIn>

      <SignedOut>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: 'linear-gradient(to bottom right, #eef2ff, #ffffff)',
          }}
        >
          <SocialSignIn path={location.pathname}/>
        </div>
      </SignedOut>
        </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ClerkProvider publishableKey={clerkPubKey}>
      <Routes>
        <Route path="/" element={<ZoomieHomePage />} />
        <Route path="/chat" element={<Login><ChatBot /></Login>} />
      </Routes>
    </ClerkProvider>
    </BrowserRouter>
  </React.StrictMode>
);