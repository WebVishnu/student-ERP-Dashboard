"use client"
import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Loader2, 
  Sparkles,
  Copy,
  Check,
  RotateCcw
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useParams } from 'next/navigation';



export default function Chat() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your School ERP AI Assistant. I can help you with information about students, faculty, courses, attendance, and more. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const params = useParams();
  const [input, setInput] = useState(params.query || '');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle sending messages
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call AI API (using Hugging Face's free inference API)
      const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: {
            past_user_inputs: messages
              .filter(m => m.role === 'user')
              .slice(-5)
              .map(m => m.content),
            generated_responses: messages
              .filter(m => m.role === 'assistant')
              .slice(-5)
              .map(m => m.content),
            text: input.trim()
          }
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      
      // Extract response text
      let aiResponse = data.generated_text || data.response || 'I apologize, but I encountered an issue. Please try again.';
      
      // If response is empty or invalid, provide fallback
      if (!aiResponse || aiResponse.trim() === '') {
        aiResponse = getFallbackResponse(input.trim());
      }

      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      
      // Fallback response if API fails
      const fallbackMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getFallbackResponse(input.trim()),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback responses for common queries
  const getFallbackResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('student') || lowerQuery.includes('students')) {
      return 'I can help you with student information! You can search for students by name, view their attendance records, check grades, or manage enrollment. What specific information about students would you like to know?';
    }
    
    if (lowerQuery.includes('faculty') || lowerQuery.includes('teacher')) {
      return 'I can assist with faculty-related queries. You can view faculty schedules, check their assigned classes, or get contact information. What would you like to know about the faculty?';
    }
    
    if (lowerQuery.includes('attendance')) {
      return 'For attendance information, I can help you view attendance records, mark attendance, or generate reports. Would you like to check attendance for a specific student or class?';
    }
    
    if (lowerQuery.includes('fee') || lowerQuery.includes('payment')) {
      return 'I can help with fee management. You can check fee status, view payment history, or process fee payments. What fee-related information do you need?';
    }
    
    if (lowerQuery.includes('course') || lowerQuery.includes('class')) {
      return 'I can provide information about courses and classes, including schedules, enrolled students, and assigned faculty. What would you like to know?';
    }
    
    return 'I understand your question. As your School ERP assistant, I can help you with students, faculty, attendance, fees, courses, and more. Could you please be more specific about what you\'re looking for?';
  };

  // Handle Enter key to send
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Copy message to clipboard
  const handleCopy = async (text, id) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Clear chat
  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: 'Hello! I\'m your School ERP AI Assistant. I can help you with information about students, faculty, courses, attendance, and more. How can I assist you today?',
        timestamp: new Date()
      }
    ]);
  };

  // Suggested prompts
  const suggestedPrompts = [
    "How do I check student attendance?",
    "Show me faculty information",
    "What are the fee payment options?",
    "Help me search for a student"
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-6 pb-30 pt-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <Avatar className={`w-10 h-10 ${message.role === 'assistant' ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gray-200'}`}>
                <AvatarFallback>
                  {message.role === 'assistant' ? (
                    <Bot className="w-5 h-5 text-black" />
                  ) : (
                    <User className="w-5 h-5 text-gray-600" />
                  )}
                </AvatarFallback>
              </Avatar>

              {/* Message Content */}
              <div className={`flex-1 max-w-2xl ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                <Card className={`p-4 ${
                  message.role === 'user' 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white border-gray-200'
                }`}>
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm leading-relaxed whitespace-pre-wrap ${
                      message.role === 'user' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {message.content}
                    </p>
                    {message.role === 'assistant' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 flex-shrink-0"
                        onClick={() => handleCopy(message.content, message.id)}
                      >
                        {copiedId === message.id ? (
                          <Check className="w-3 h-3 text-green-600" />
                        ) : (
                          <Copy className="w-3 h-3 text-gray-400" />
                        )}
                      </Button>
                    )}
                  </div>
                </Card>
                <span className="text-xs text-gray-400 mt-1 px-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex gap-4">
              <Avatar className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600">
                <AvatarFallback>
                  <Bot className="w-5 h-5 text-white" />
                </AvatarFallback>
              </Avatar>
              <Card className="p-4 bg-white border-gray-200">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                  <span className="text-sm text-gray-600">Thinking...</span>
                </div>
              </Card>
            </div>
          )}

          {/* Suggested prompts (only show when chat is empty) */}
          {messages.length === 1 && (
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Sparkles className="w-4 h-4" />
                <span>Try asking:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {suggestedPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="justify-start h-auto py-3 text-left hover:bg-blue-50 hover:border-blue-300"
                    onClick={() => {
                      setInput(prompt);
                      inputRef.current?.focus();
                    }}
                  >
                    <span className="text-sm text-gray-700">{prompt}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-6 py-4 fixed lg:bottom-0 bottom-10 lg:left-60 lg:w-[calc(100vw-15em)] w-screen">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 items-end">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask me anything about the school system..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                rows={1}
                style={{
                  minHeight: '44px',
                  maxHeight: '120px',
                  height: 'auto'
                }}
                onInput={(e) => {
                  const target = e.target;
                  target.style.height = 'auto';
                  target.style.height = Math.min(target.scrollHeight, 120) + 'px';
                }}
              />
              <div className="absolute right-3 bottom-3 text-xs text-gray-400">
                {input.length}/500
              </div>
            </div>
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="h-11 px-6 bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send
                </>
              )}
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Press Enter to send, Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}