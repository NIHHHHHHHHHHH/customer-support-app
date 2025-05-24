import { useState, useEffect, useCallback } from 'react';

export const useChatMessages = (conversation, autoRespond) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Initialize messages when conversation changes
  useEffect(() => {
    if (conversation) {
      setMessages([
        {
          id: 1,
          sender: 'customer',
          message: conversation.lastMessage,
          timestamp: new Date(Date.now() - 60000),
          status: 'delivered'
        },
        {
          id: 2,
          sender: 'agent',
          message: `Let me just look into this for you, ${conversation.name.split(' ')[0]}.`,
          timestamp: new Date(Date.now() - 30000),
          status: 'seen'
        }
      ]);
    }
  }, [conversation]);

 const sendMessage = useCallback(async (messageText) => {
  if (!messageText.trim()) return;

  const newMessage = {
    id: messages.length + 1,
    sender: 'agent',
    message: messageText,
    timestamp: new Date(),
    status: 'sending'
  };

  setMessages(prev => [...prev, newMessage]);

  // Simulate message being sent
  setTimeout(() => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === newMessage.id
          ? { ...msg, status: 'delivered' }
          : msg
      )
    );

    // Auto-respond if enabled
    if (autoRespond) {
      const refundPolicyText = `We understand that sometimes a purchase may not meet your expectations, and you may need to request a refund. To assist you with your refund request, could you please provide your order ID and proof of purchase. Please note: We can only refund orders placed within the last 60 days, and your item must meet our requirements for condition to be returned. Please check when you placed your order before proceeding. Once I've checked these details, if everything looks OK, I will send a returns QR code which you can use to post the item back to us. Your refund will be automatically issued once you put it in the post.`;

      setIsTyping(true);
      setTimeout(() => {
        const lastMessage = newMessage.message;
        const isRefundPolicy = lastMessage.trim() === refundPolicyText.trim();

        const autoResponse = {
          id: messages.length + 2,
          sender: 'customer',
          message: isRefundPolicy
            ? 'I placed the order over 60 days ago 😥,Could you make an exception, please?'
            : 'Thank you for the information! Let me check my order details.',
          timestamp: new Date(),
          status: 'delivered'
        };

        setMessages(prev => [...prev, autoResponse]);
        setIsTyping(false);
      }, 2000);
    }
  }, 1000);
}, [messages.length, autoRespond]);


  return {
    messages,
    sendMessage,
    isTyping
  };
};