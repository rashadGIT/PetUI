// src/ChatBot.jsx
import React, { useState, useEffect, useRef } from 'react';
import OpenAI from 'openai';
import { v4 as uuid } from 'uuid'; // just for keys in lists
import { SignOutButton, useUser } from '@clerk/clerk-react';

const OPENAI_API_KEY="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"

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // <-- browsers can’t keep secrets; OK in dev
});

export default function ChatBot() {
  // ─────────────────── state ────────────────────
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recorder, setRecorder] = useState(null);

  const scrollRef = useRef(null);
  const { user } = useUser();

  // Read any text aloud using the browser SpeechSynthesis API
  const speak = (text) => {
    if (!text) return;
    window.speechSynthesis.cancel(); // stop anything already speaking
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  // autoscroll on new message
  useEffect(() => {
    // console.log("fdsjfiowejfowe");
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ───────────── text → GPT ──────────────
  async function sendMessage() {
    if (!input.trim()) return;
    const userMsg = { id: uuid(), role: 'user', content: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              "You are a helpful assistant specialized in pet care. Only answer questions related to pet care, such as animal health, nutrition, grooming, training, and behavior. If a question is unrelated to pet care, respond with 'I can only answer questions related to pet care.'",
          },
          ...messages.map(({ role, content }) => ({ role, content })),
          { role: 'user', content: userMsg.content },
        ],
      });

      const botMsg = {
        id: uuid(),
        role: 'assistant',
        content: completion.choices[0].message.content || '',
      };
      setMessages((m) => [...m, botMsg]);
    } catch (err) {
      console.error(err);
      alert('Error contacting OpenAI');
    } finally {
      setIsLoading(false);
    }
  }

  // ───────────── browser voice capture ──────────────
  async function startRecording() {
    if (!navigator.mediaDevices) {
      alert('MediaRecorder not supported in this browser.');
      return;
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const chunks = [];

    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      await transcribe(blob);
      stream.getTracks().forEach((t) => t.stop());
    };

    mediaRecorder.start();
    setRecorder(mediaRecorder);
  }

  function stopRecording() {
    recorder?.stop();
    setRecorder(null);
  }

  async function transcribe(blob) {
    setIsLoading(true);
    try {
      const form = new FormData();
      form.append('file', blob, 'voice.webm');
      form.append('model', 'whisper-1');

      const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
        body: form,
      });
      const json = await res.json();
      setInput(json.text || '');
    } catch (e) {
      console.error(e);
      alert('Transcription failed');
    } finally {
      setIsLoading(false);
    }
  }

  // ─────────────────── UI ────────────────────
  return (
    <div style={styles.wrapper}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
        <SignOutButton>
          <button style={styles.signOut}>Sign out</button>
        </SignOutButton>
      </div>
      <div style={styles.chatBox}>
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              display: 'flex',
              justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
              alignItems: 'flex-end',
              marginBottom: 10,
            }}
          >
            {m.role === 'user' ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={styles.bubbleContainer}>
                  <div style={{ ...styles.bubble, ...styles.user }}>{m.content}</div>
                </div>
                <img
                  // src="https://i.pravatar.cc/40?img=3"
                  src={user?.imageUrl || 'https://cdn-icons-png.flaticon.com/512/4712/4712109.png'}
                  alt="User"
                  style={styles.avatar}
                />
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
                  alt="Bot"
                  style={styles.avatar}
                />
                <div>
                  <div style={{ ...styles.bubble, ...styles.bot }}>{m.content}</div>
                  <button
                    onClick={() => speak(m.content)}
                    style={styles.readBtn}
                  >
                    🔊 Read
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      <div style={styles.inputRow}>
        <input
          style={styles.input}
          value={input}
          placeholder="Ask about pet care..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />

        <button style={styles.btn} onClick={sendMessage} disabled={isLoading}>
          Send
        </button>

        {recorder ? (
          <button style={styles.btn} onClick={stopRecording}>
            ⏹️
          </button>
        ) : (
          <button style={styles.btn} onClick={startRecording}>
            🎙️
          </button>
        )}
      </div>
    </div>
  );
}

// ─────────────────── simple inline “styles” object ───────────────────
const styles = {
  wrapper: {
    maxWidth: 600,
    margin: '0 auto',
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    borderRadius: 20,
    background: '#1f1f1f',
  },
  chatBox: {
    flex: 1,
    overflowY: 'auto',
    paddingBottom: 10,
  },
  bubble: {
    padding: '12px 16px',
    borderRadius: '18px',
    margin: '8px 0',
    maxWidth: '70%',
    fontSize: '15px',
    lineHeight: 1.4,
  },
  user: {
    alignSelf: 'flex-end',
    background: '#d9eaff',
    color: '#000',
  },
  bot: {
    alignSelf: 'flex-start',
    background: '#2f2f2f',
    color: '#fff',
  },
  inputRow: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    background: '#2c2c2c',
    padding: '10px 12px',
    borderRadius: 12,
  },
  input: {
    flex: 1,
    padding: 10,
    border: 'none',
    borderRadius: 8,
    fontSize: 15,
    background: '#fff',
  },
  btn: {
    padding: '8px 12px',
    border: 'none',
    background: '#4f46e5',
    color: '#fff',
    borderRadius: 6,
    fontSize: 14,
    cursor: 'pointer',
  },
  signOut: {
    padding: '6px 10px',
    background: '#e11d48',
    color: '#fff',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: '50%',
  },
  bubbleContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  readBtn: {
    marginTop: 4,
    background: 'transparent',
    color: '#9ca3af',
    border: 'none',
    cursor: 'pointer',
    fontSize: 14,
  },
};