
import { useState } from "react";

function AIChatbot() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! 👋 I'm Travelora AI. Ask me anything about destinations, places to visit, food, or travel tips.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userMessage },
    ]);

    setInput("");
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

      if (!apiKey) {
        throw new Error("Gemini API key is missing.");
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are Travelora AI, a helpful travel assistant.
Give concise and useful answers about destinations, attractions,
food, activities, travel tips and itineraries.

User question: ${userMessage}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get AI response.");
      }

      const data = await response.json();

      const aiReply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't generate a response.";

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: aiReply,
        },
      ]);
    } catch (error) {
      console.error("Gemini API Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Sorry, I'm unable to respond right now. Please check your API configuration.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="assistant-section" id="assistant">

      <div className="assistant-heading">
        <p>TRAVEL WITH AI</p>

        <h2>
          Your personal
          <br />
          travel assistant.
        </h2>
      </div>

      <div className="chatbot">

        <div className="chat-header">

          <div>
            <span className="ai-status"></span>
            <strong>Travelora AI</strong>
          </div>

          <span>✦ AI Assistant</span>

        </div>

        <div className="chat-messages">

          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${message.sender}`}
            >
              <div className="message-bubble">
                {message.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="chat-message ai">
              <div className="message-bubble">
                Travelora AI is thinking...
              </div>
            </div>
          )}

        </div>

        <div className="chat-input-area">

          <input
            type="text"
            placeholder="Ask about a destination..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />

          <button
            onClick={sendMessage}
            disabled={loading}
          >
            {loading ? "..." : "Send"}
          </button>

        </div>

      </div>

    </section>
  );
}

export default AIChatbot;
