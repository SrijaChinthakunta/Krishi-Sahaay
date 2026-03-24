import { useState } from "react";

function AskAI({ language, setLanguage }) {

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const typeMessage = (text) => {
    let index = 0;

    const interval = setInterval(() => {
      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (!last) return prev;
        last.text = text.slice(0, index + 1);
        return updated;
      });

      index++;
      if (index >= text.length) clearInterval(interval);
    }, 20);
  };

  const askBackend = async () => {
    console.log("Asking backend:", question, "Language:", language);
    if (!question.trim()) return;

    const currentQuestion = question; // ✅ FIX

    setMessages((prev) => [...prev, { type: "user", text: currentQuestion }]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await fetch(
        `https://krishi-backend-bx6e.onrender.com/ask?question=${encodeURIComponent(currentQuestion)}&lang=${language}`
      );

      const data = await res.json();

      setMessages((prev) => [...prev, { type: "ai", text: "" }]);

      typeMessage(data.answer);

    } catch (err) {
      console.error(err);
      alert("Backend connection error");
    }

    setLoading(false);
  };

  const speak = (text) => {
    const clean = text.replace(/[*•\-]/g, "").replace(/\n/g, ". ");
    const speech = new SpeechSynthesisUtterance(clean);
    speech.lang = language === "Telugu" ? "te-IN" : "en-IN";
    window.speechSynthesis.speak(speech);
  };

  return (
    <div style={main}>

      {/* LANGUAGE */}
      <div style={topBar}>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={dropdown}
        >
          <option>English</option>
          <option>Telugu</option>
          <option>Hindi</option>
        </select>
      </div>

      <h1 style={title}>🤖 Krishi Chat</h1>

      <div style={chatBox}>

        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: msg.type === "user" ? "flex-end" : "flex-start"
            }}
          >
            <div style={{
              ...bubble,
              background: msg.type === "user" ? "#1b5e20" : "rgba(255,255,255,0.4)",
              color: msg.type === "user" ? "white" : "black"
            }}>
              <p style={{ whiteSpace: "pre-line" }}>{msg.text}</p>

              {msg.type === "ai" && msg.text && (
                <button onClick={() => speak(msg.text)} style={speakBtn}>
                  🔊
                </button>
              )}
            </div>
          </div>
        ))}

        {loading && <p>AI is typing...</p>}

      </div>

      <div style={inputArea}>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          style={input}
          placeholder="Ask your question..."
        />
        <button onClick={askBackend} style={btn}>Send</button>
      </div>

    </div>
  );
}

export default AskAI;

/* STYLES */

const main = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#c8f7c5,#7bd389)",
  padding: "20px"
};

const topBar = {
  position: "absolute",
  top: "20px",
  right: "20px"
};

const dropdown = {
  padding: "10px",
  borderRadius: "10px"
};

const title = {
  textAlign: "center"
};

const chatBox = {
  height: "60vh",
  overflowY: "auto",
  padding: "20px"
};

const bubble = {
  padding: "15px",
  borderRadius: "15px",
  margin: "10px",
  maxWidth: "70%"
};

const inputArea = {
  display: "flex",
  justifyContent: "center",
  gap: "10px"
};

const input = {
  padding: "10px",
  width: "300px"
};

const btn = {
  padding: "10px 20px",
  background: "#1b5e20",
  color: "white",
  border: "none"
};

const speakBtn = {
  marginTop: "10px"
};