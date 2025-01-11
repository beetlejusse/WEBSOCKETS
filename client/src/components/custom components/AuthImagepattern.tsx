'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Code2, Sparkles, Bot, User } from 'lucide-react'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'

interface Message {
  id: number
  sender: string
  content: string
  isCode: boolean
}

interface ChatProps {
  title: string
  subtitle: string
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function Chat({ title, subtitle }: ChatProps) {
  const [mounted, setMounted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')

  useEffect(() => {
    setMounted(true)
    const initialMessages: Message[] = [
      { id: 1, sender: 'System', content: 'Welcome to CHAT! Ask any coding question.', isCode: false },
      { id: 2, sender: 'User', content: 'How do I create a simple Express server?', isCode: false },
      { id: 3, sender: 'Assistant', content: "Here's a basic Express server setup:", isCode: false },
      {
        id: 4,
        sender: 'Assistant',
        content: `import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, DevChat!');
});

app.listen(port, () => {
  console.log('Server running at Port: http://localhost:' + port);
});`,
        isCode: true,
      },
      { id: 5, sender: 'User', content: 'Thanks! How do I add a new route?', isCode: false },
    ]
    setMessages(initialMessages)
  }, [])

  if (!mounted) return null

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: 'User',
        content: inputMessage,
        isCode: false,
      }
      setMessages([...messages, newMessage])
      setInputMessage('')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <Card className="w-full max-w-4xl border border-gray-800 bg-black/40 backdrop-blur-xl shadow-2xl">
        <CardHeader className="space-y-1 bg-gradient-to-b from-gray-900 to-black border-b border-gray-800/50">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">{title}</h1>
              <p className="text-sm text-gray-400">{subtitle}</p>
            </div>
          </motion.div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[65vh] px-6 py-4">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  variants={item}
                  className={cn(
                    "flex",
                    message.sender === 'User' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl p-4",
                      message.sender === 'User' 
                        ? 'bg-gradient-to-br from-violet-600 to-violet-700 text-white' 
                        : 'bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100'
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {message.sender === 'User' ? (
                        <User className="w-4 h-4 text-violet-200" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                      <Badge variant={message.sender === 'User' ? 'secondary' : 'default'} className="text-xs">
                        {message.sender}
                      </Badge>
                      {message.isCode && (
                        <Badge variant="default" className="bg-black/20 text-white">
                          <Code2 className="w-3 h-3 text-white mr-1" />
                          Code
                        </Badge>
                      )}
                    </div>
                    {message.isCode ? (
                      <pre className="mt-2 p-3 bg-black/50 rounded-xl overflow-x-auto">
                        <code className="text-sm font-mono text-emerald-400">{message.content}</code>
                      </pre>
                    ) : (
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-4 border-t border-gray-800/50 bg-gradient-to-b from-black to-gray-900">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
            className="flex w-full items-center gap-2"
          >
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message or code..."
              className="flex-1 bg-gray-900/50 border-gray-800 text-gray-100 placeholder:text-gray-500 focus-visible:ring-violet-500"
            />
            <Button 
              type="submit" 
              size="icon"
              className="bg-violet-600 hover:bg-violet-700 text-white"
            >
              <Send className="w-4 h-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

