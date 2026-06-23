'use client'

import { useState, useEffect, useRef } from 'react'
import { MessageCircle, X, Send, Bot, User, Phone, Clipboard, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface Message {
  role: 'user' | 'assistant'
  content: string
  isTool?: boolean
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasGreeted, setHasGreeted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 1. Auto-greet after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasGreeted) {
        setMessages([
          {
            role: 'assistant',
            content: "Hi! Welcome to Yashobhagya Enterprises. How can I help you today with biofuels or salts?"
          }
        ])
        setHasGreeted(true)
        // Optionally auto-open the widget
        setIsOpen(true)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [hasGreeted])

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // Custom function to handle streaming response and tool actions
  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim()) return

    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role, content: m.content })) })
      })

      if (!response.ok) {
        throw new Error("Failed to connect to assistant")
      }

      // Check if it's a standard JSON response (like our mock fallback)
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json()
        setIsLoading(false)
        if (data.content) {
          setMessages(prev => [...prev, { role: 'assistant', content: data.content }])
        } else if (data.role === 'assistant') {
          setMessages(prev => [...prev, { role: 'assistant', content: data.content || "Sorry, I couldn't process that." }])
        } else if (data.error) {
          setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, something went wrong. Please use our Contact form or call us at +91 81918 50001." }])
        }
        return
      }

      // It is a streaming response, read the stream
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      if (!reader) {
        setIsLoading(false)
        return
      }

      let assistantResponse = ''
      setIsLoading(false) // Turn off general loading, stream is drawing

      // Add placeholder assistant message that will be populated
      setMessages(prev => [...prev, { role: 'assistant', content: '' }])

      let done = false
      while (!done) {
        const { value, done: readerDone } = await reader.read()
        done = readerDone
        if (value) {
          const chunk = decoder.decode(value, { stream: !done })
          // Parse Vercel AI SDK text protocol format
          // The protocol prefixes chunks, typically: 0:"text chunk"
          const lines = chunk.split('\n')
          for (const line of lines) {
            if (line.startsWith('0:')) {
              // Standard text block
              const text = line.slice(2).replace(/"/g, '').replace(/\\n/g, '\n')
              assistantResponse += text
              setMessages(prev => {
                const list = [...prev]
                if (list.length > 0) {
                  list[list.length - 1].content = assistantResponse
                }
                return list
              })
            } else if (line.startsWith('9:')) {
              // Tool execution message/status
              try {
                const toolData = JSON.parse(line.slice(2))
                if (toolData.toolName === 'submitLead') {
                  setMessages(prev => [
                    ...prev,
                    {
                      role: 'assistant',
                      content: `✅ Inquiry lead recorded for ${toolData.args.name}. Our sales team will connect with you.`,
                      isTool: true
                    }
                  ])
                }
              } catch (e) {
                // Ignore parsing issues for partial lines
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Chatbot communication error:", error)
      setIsLoading(false)
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry, I encountered a connection error. Please use our Contact Us form, email us at pundirranjeet@gmail.com, or send a WhatsApp message."
        }
      ])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 50 }}
            transition={{ type: 'spring', damping: 20, stiffness: 260 }}
            className="bg-white rounded-xl shadow-2xl border border-gray-200/80 w-80 sm:w-96 h-[500px] flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-[#1A3C2E] p-4 flex items-center justify-between border-b border-[#E8D5B0]/20">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#E8D5B0] flex items-center justify-center text-[#1A3C2E]">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-title text-sm font-semibold text-white">Yashobhagya Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-white/60">Sales & Supply AI</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white p-1 rounded-full transition hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Message History */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F9F6F0]/40">
              {messages.map((msg, index) => {
                const isSystem = msg.role === 'assistant'
                return (
                  <div
                    key={index}
                    className={`flex gap-2 max-w-[85%] ${isSystem ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs ${
                        isSystem ? 'bg-[#1A3C2E]/10 text-[#1A3C2E]' : 'bg-[#C4862A]/10 text-[#C4862A]'
                      }`}
                    >
                      {isSystem ? <Bot size={14} /> : <User size={14} />}
                    </div>
                    <div
                      className={`rounded-lg px-3 py-2 text-sm leading-relaxed ${
                        msg.isTool
                          ? 'bg-[#1A3C2E] text-white font-medium border border-[#E8D5B0]/20 shadow-sm'
                          : isSystem
                            ? 'bg-white text-[#2D2D2D] border border-gray-100 shadow-sm'
                            : 'bg-[#C4862A] text-white'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                )
              })}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex gap-2 mr-auto max-w-[80%]">
                  <div className="w-7 h-7 rounded-full bg-[#1A3C2E]/10 text-[#1A3C2E] flex items-center justify-center shrink-0">
                    <Bot size={14} />
                  </div>
                  <div className="bg-white rounded-lg px-3 py-2.5 border border-gray-100 shadow-sm flex items-center gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
              <button onClick={() => sendMessage("I need a price quote.")} className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-md text-xs hover:border-[#C4862A] hover:text-[#C4862A] transition font-medium text-gray-600 shadow-sm">Get Quote 📋</button>
              <button onClick={() => sendMessage("What firewood varieties do you supply?")} className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-md text-xs hover:border-[#C4862A] hover:text-[#C4862A] transition font-medium text-gray-600 shadow-sm">Firewood 🪵</button>
              <button onClick={() => sendMessage("What briquettes do you supply?")} className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-md text-xs hover:border-[#C4862A] hover:text-[#C4862A] transition font-medium text-gray-600 shadow-sm">Briquettes 🔥</button>
              <button onClick={() => sendMessage("Tell me about your salt products.")} className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-md text-xs hover:border-[#C4862A] hover:text-[#C4862A] transition font-medium text-gray-600 shadow-sm">Salts 🧂</button>
              <button onClick={() => sendMessage("Where do you deliver?")} className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-md text-xs hover:border-[#C4862A] hover:text-[#C4862A] transition font-medium text-gray-600 shadow-sm">Delivery 🚚</button>
              <button onClick={() => sendMessage("What is your minimum order quantity?")} className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-md text-xs hover:border-[#C4862A] hover:text-[#C4862A] transition font-medium text-gray-600 shadow-sm">Min Order 📦</button>
              <button onClick={() => sendMessage("What are your payment terms?")} className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-md text-xs hover:border-[#C4862A] hover:text-[#C4862A] transition font-medium text-gray-600 shadow-sm">Payment 💳</button>
              <button onClick={() => sendMessage("Where is your office located?")} className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-md text-xs hover:border-[#C4862A] hover:text-[#C4862A] transition font-medium text-gray-600 shadow-sm">Our Office 📍</button>
              <button onClick={() => sendMessage("How can I contact you?")} className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-md text-xs hover:border-[#C4862A] hover:text-[#C4862A] transition font-medium text-gray-600 shadow-sm">Contact Us 📞</button>
              <button onClick={() => sendMessage("Do you have ready stock?")} className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-md text-xs hover:border-[#C4862A] hover:text-[#C4862A] transition font-medium text-gray-600 shadow-sm">Ready Stock 🏭</button>
              <button onClick={() => sendMessage("Do you provide GST invoice?")} className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-md text-xs hover:border-[#C4862A] hover:text-[#C4862A] transition font-medium text-gray-600 shadow-sm">GST Invoice 🧾</button>
              <button onClick={() => sendMessage("Tell me about your eco friendly products.")} className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-md text-xs hover:border-[#C4862A] hover:text-[#C4862A] transition font-medium text-gray-600 shadow-sm">Eco Friendly 🌿</button>
              <button onClick={() => sendMessage("I want bulk wholesale supply.")} className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-md text-xs hover:border-[#C4862A] hover:text-[#C4862A] transition font-medium text-gray-600 shadow-sm">Bulk Order 🏗️</button>
              <button onClick={() => sendMessage("Can I get a sample?")} className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-md text-xs hover:border-[#C4862A] hover:text-[#C4862A] transition font-medium text-gray-600 shadow-sm">Get Sample 🎁</button>
              <button onClick={() => sendMessage("What packaging options do you offer?")} className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-md text-xs hover:border-[#C4862A] hover:text-[#C4862A] transition font-medium text-gray-600 shadow-sm">Packaging 📦</button>
              <button onClick={() => sendMessage("Tell me about your quality standards.")} className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-md text-xs hover:border-[#C4862A] hover:text-[#C4862A] transition font-medium text-gray-600 shadow-sm">Quality 🏅</button>
              <button onClick={() => sendMessage("What products are good for industrial boilers?")} className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-md text-xs hover:border-[#C4862A] hover:text-[#C4862A] transition font-medium text-gray-600 shadow-sm">Industrial Use ⚙️</button>
              <button onClick={() => sendMessage("Can you customize products as per my requirement?")} className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-md text-xs hover:border-[#C4862A] hover:text-[#C4862A] transition font-medium text-gray-600 shadow-sm">Custom Order 🎯</button>
              <button onClick={() => sendMessage("Tell me about your company.")} className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-md text-xs hover:border-[#C4862A] hover:text-[#C4862A] transition font-medium text-gray-600 shadow-sm">About Us 🏢</button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-200 flex gap-2 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about products, orders, transport..."
                className="flex-1 bg-[#F9F6F0] rounded-lg px-3 py-2 text-sm border border-gray-200 focus:outline-none focus:border-[#1A3C2E] focus:ring-1 focus:ring-[#1A3C2E]"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-9 h-9 rounded-lg bg-[#1A3C2E] hover:bg-[#28503e] text-white flex items-center justify-center shrink-0 disabled:bg-gray-300 disabled:text-gray-400 transition"
              >
                <Send size={16} />
              </button>
            </form>

            {/* Subtle Footer */}
            <div className="bg-[#1C1C1C] py-1.5 text-center border-t border-gray-100 flex items-center justify-center gap-1.5">
              <span className="text-[10px] text-white/40 tracking-wider uppercase font-semibold">
                Powered by AI Sales Intelligence
              </span>
              <span className="text-[#E8D5B0]/30">•</span>
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="text-[10px] text-[#E8D5B0] hover:text-white flex items-center gap-0.5 transition font-semibold"
              >
                Full Form <ArrowRight size={8} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#1A3C2E] text-white flex items-center justify-center shadow-xl hover:bg-[#28503e] transition z-50 border border-[#E8D5B0]/20"
      >
        {isOpen ? <X size={26} /> : <MessageCircle size={26} />}
      </motion.button>
    </div>
  )
}
