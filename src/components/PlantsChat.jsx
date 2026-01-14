import React, { useState } from "react";
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

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add User Message
    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI Response
    setTimeout(() => {
      const aiMsg = {
        role: "ai",
        text: generateMockResponse(input, plantName),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const generateMockResponse = (query, name) => {
    const q = query.toLowerCase();
    if (q.includes("water")) return `Hydration Protocol: ${name} requires a dry-down period. Wait until substrate moisture is <20% (top inch dry) before re-watering.`;
    if (q.includes("sun") || q.includes("light")) return `Photosynthesis Requirements: Optimal lux levels are found in bright, indirect zones. Avoid direct solar exposure to prevent foliar scorching.`;
    if (q.includes("soil")) return `Substrate Composition: A chunky aroid mix (Orchid bark, perlite, coco coir) provides necessary root aeration for this species.`;
    return `Query acknowledged regarding ${name}. My database suggests focusing on consistent environmental humidity. Shall I elaborate on pest prevention?`;
  };

  return (
    <div className="bg-white rounded-2xl border border-[#1A2F1C]/10 shadow-sm overflow-hidden h-full flex flex-col">

      {/* Header */}
      <div className="bg-[#1A2F1C] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#4A6741] text-white p-1.5 rounded-lg">
            <Sparkles size={16} />
          </div>
          <div>
            <h3 className="font-mono text-sm text-white font-bold uppercase tracking-wider">Botanical AI</h3>
            <p className="text-[10px] text-gray-400">v2.4.0 • Online</p>
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
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${msg.role === "ai" ? "bg-[#1A2F1C] text-white" : "bg-[#C77D63] text-white"
              }`}>
              {msg.role === "ai" ? <Bot size={16} /> : <User size={16} />}
            </div>

            <div className={`max-w-[85%] p-3 rounded-xl text-sm leading-relaxed ${msg.role === "ai"
                ? "bg-white border border-gray-200 text-[#1A2F1C] rounded-tl-none shadow-sm"
                : "bg-[#1A2F1C] text-white rounded-tr-none"
              }`}>
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
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-[#1A2F1C]/5 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about care metrics..."
          className="flex-1 bg-[#F4F5F0] border-none rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-[#1A2F1C] focus:outline-none text-[#1A2F1C] placeholder-gray-400 font-mono"
        />
        <button
          type="submit"
          className="bg-[#1A2F1C] text-white p-2 rounded-lg hover:bg-[#C77D63] transition-colors disabled:opacity-50"
          disabled={!input.trim()}
        >
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};

export default PlantChat;