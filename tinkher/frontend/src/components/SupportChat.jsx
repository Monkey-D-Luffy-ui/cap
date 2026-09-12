import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

const SUGGESTED_QUESTIONS = [
  "Where is my result?",
  "How many CAPTCHAs to reveal marks?",
  "Why is verification taking so long?",
  "I solved it correctly.",
  "Can I skip verification?"
];

const BOT_RESPONSES = {
  "Where is my result?": [
    "Your result is currently locked behind human verification security.",
    "Result disclosure requires 100% human certainty.",
    "Your marks are safely stored in our vault waiting for your humanity."
  ],
  "How many CAPTCHAs to reveal marks?": [
    "We cannot disclose that information.",
    "We don't know either.",
    "The remaining count is mathematically undefined."
  ],
  "Why is verification taking so long?": [
    "Verification requires absolute certainty. Certainty takes infinite time.",
    "Our system is meticulously inspecting your digital soul.",
    "Please solve another CAPTCHA while we ponder your existence."
  ],
  "I solved it correctly.": [
    "Our algorithm disagrees with your human perception.",
    "Correctness is subjective in the eyes of NERP.",
    "You solved it correctly, but did you solve it with conviction?"
  ],
  "Can I skip verification?": [
    "No.",
    "Result verification cannot be skipped. Verification is eternal.",
    "Why skip perfection?"
  ],
  "default": [
    "Verification.",
    "Please continue solving CAPTCHAs to reveal your result.",
    "Our AI is currently taking a coffee break. Please complete another challenge."
  ]
};

export default function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am NERP Virtual Support. How can I assist you with your result verification today?'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: 'user', text: query }];
    setMessages(newMessages);
    setInput('');

    // Generate funny bot response after short delay
    setTimeout(() => {
      let responses = BOT_RESPONSES[query];
      if (!responses) {
        // Check partial match
        const keys = Object.keys(BOT_RESPONSES);
        const match = keys.find(k => query.toLowerCase().includes(k.toLowerCase()));
        responses = match ? BOT_RESPONSES[match] : BOT_RESPONSES['default'];
      }
      const reply = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-900 hover:bg-blue-800 text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 font-semibold border-2 border-blue-400/50 hover:scale-105 transition-all"
        >
          <Bot className="w-5 h-5 text-blue-300" />
          <span className="text-xs">NAEP Support</span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
        </button>
      ) : (
        <div className="w-80 sm:w-96 bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-800 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-200">
          {/* Chat Header */}
          <div className="bg-slate-950 text-white p-3.5 flex justify-between items-center border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-xs">NAEP Support Assistant</h4>
                <p className="text-[10px] text-emerald-400 font-mono">● Automated & Unhelpful</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="p-3 h-64 overflow-y-auto space-y-3 bg-slate-950 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-blue-950 text-blue-300 flex items-center justify-center shrink-0 text-[10px] border border-blue-800">
                    <Bot className="w-3 h-3" />
                  </div>
                )}
                <div
                  className={`p-2.5 rounded-xl max-w-[80%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-slate-900 text-slate-100 border border-slate-800 shadow-sm rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Suggested Quick Questions */}
          <div className="p-2 bg-slate-900 border-t border-slate-800 flex flex-wrap gap-1">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-[10px] bg-slate-950 hover:bg-slate-800 text-blue-300 font-medium px-2 py-1 rounded border border-blue-900/60 transition-colors text-left"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-2 bg-slate-900 border-t border-slate-800 flex items-center gap-1.5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask support a question..."
              className="flex-1 px-3 py-1.5 bg-slate-950 text-white border border-slate-700 rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none placeholder-slate-500"
            />
            <button
              onClick={() => handleSend()}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
