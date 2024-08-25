'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
   <div className='bg-[#001220]'>
     <div className="flex flex-col w-full max-w-md h-screen mx-auto bg-gray-100 shadow-lg">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`p-4 rounded-lg max-w-xs ${
              m.role === 'user' 
                ? 'bg-blue-500 text-white self-end rounded-br-none'
                : 'bg-gray-300 text-gray-800 self-start rounded-bl-none'
            }`}
          >
            {m.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form 
        onSubmit={handleSubmit} 
        className="p-4 border-t border-gray-300 bg-white flex items-center space-x-2"
      >
        <input
          className="flex-grow p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          placeholder="Type your message..."
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200"
        >
          Send
        </button>
      </form>
    </div>
   </div>
  );
}
