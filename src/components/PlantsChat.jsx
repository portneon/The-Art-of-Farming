import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";

const PlantChat = ({ plantName }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: `System Ready. Accessing ${plantName} knowledge base. How can I assist with this specimen?`,
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    const userMsg = { role: "user", text: userText };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      // Build conversation history (exclude the initial system greeting)
      const history = messages
        .filter((_, idx) => idx > 0) // skip the first canned greeting
        .map((m) => ({ role: m.role === "ai" ? "model" : "user", text: m.text }));

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/chat/plant`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            plantName,
            message: userText,
            conversationHistory: history,
          }),
        }
      );

      const data = await response.json();

      const reply = data.reply || "I couldn't process that. Please try again.";
      setMessages((prev) => [...prev, { role: "ai", text: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Connection error. Please check the server and try again." },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#1A2F1C]/10 shadow-sm h-full flex flex-col">
      {/* Header */}
      <div className="bg-[#1A2F1C] p-4 flex items-center justify-between rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="bg-[#4A6741] text-white p-1.5 rounded-lg">
            <Sparkles size={16} />
          </div>
          <div>
            <h3 className="font-mono text-sm text-white font-bold uppercase tracking-wider">Botanical AI</h3>
            <p className="text-[10px] text-gray-400">Powered by Gemini • Online</p>
          </div>
        </div>
        <div className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F4F5F0]/50 min-h-[300px]">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${msg.role === "ai" ? "bg-[#1A2F1C] text-white" : "bg-[#C77D63] text-white"
                }`}
            >
              {msg.role === "ai" ? <Bot size={16} /> : <User size={16} />}
            </div>

            <div
              className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed ${msg.role === "ai"
                  ? "bg-white border border-gray-200 text-[#1A2F1C] rounded-tl-none shadow-sm"
                  : "bg-[#1A2F1C] text-white rounded-tr-none"
                }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#1A2F1C] text-white flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div className="bg-white border border-gray-200 p-3 rounded-xl rounded-tl-none flex gap-1">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#1A2F1C]/5 flex gap-2 rounded-b-2xl">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about care, watering, pests..."
          className="flex-1 bg-[#F4F5F0] border-none rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-[#1A2F1C] focus:outline-none text-[#1A2F1C] placeholder-gray-400 font-mono"
          disabled={isTyping}
        />
        <button
          type="submit"
          className="bg-[#1A2F1C] text-white p-2 rounded-lg hover:bg-[#C77D63] transition-colors disabled:opacity-50"
          disabled={!input.trim() || isTyping}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default PlantChat;