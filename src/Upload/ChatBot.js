
import { useImmer } from "use-immer";
import React, { useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

function ChatBot(){
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useImmer([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function submitNewMessage() {
    // Implemented in the next section
    const trimmedMessage = newMessage.trim();
    console.log('message submitted' , trimmedMessage);
    setIsLoading(true)
    if (!trimmedMessage || isLoading) return;
  
  }


  return(
    <div className='relative grow flex flex-col gap-6 pt-6'>
        {messages.length === 0 && (
        <div className='mt-3 font-urbanist text-primary-blue text-xl font-light space-y-2'>
          <p>👋 Welcome!</p>
          <p>I am powered by the latest technology reports from leading institutions like the World Bank, the World Economic Forum, McKinsey, Deloitte and the OECD.</p>
          <p>Ask me anything about the latest technology trends.</p>
        </div>
      )}
       <ChatMessages
        messages={messages}
        isLoading={isLoading}
      />
       <ChatInput
        newMessage={newMessage}
        isLoading={isLoading}
        setNewMessage={setNewMessage}
        submitNewMessage={submitNewMessage}
      />
    </div>
  )
}

export default ChatBot;