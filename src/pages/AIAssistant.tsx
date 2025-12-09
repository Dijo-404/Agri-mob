import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Mic, MicOff, Send, User, Volume2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const sampleResponses = [
  "Based on your soil test results, I recommend applying 50kg of NPK fertilizer per acre. The optimal time would be before the next rainfall.",
  "For cotton cultivation in your region, the best sowing time is between June and July. Make sure the soil temperature is above 20°C.",
  "Your crop rotation plan looks good! Rotating between legumes and cereals will help maintain soil nitrogen levels naturally.",
  "The weather forecast shows rain in 3 days. I suggest postponing fertilizer application until after the rain to prevent nutrient runoff.",
  "For pest control in wheat, consider using neem-based organic pesticides. They're effective against aphids and safe for beneficial insects.",
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I'm your AI farming assistant. How can I help you today? Ask me about crops, soil, weather, or any farming-related questions.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Initialize Web Speech API
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-IN";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        handleSendMessage(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: sampleResponses[Math.floor(Math.random() * sampleResponses.length)],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 h-full flex flex-col"
    >
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">AI Assistant</h1>
        <p className="text-muted-foreground">Get instant farming advice and recommendations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
        {/* Chat Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-3 flex flex-col"
        >
          <Card className="flex-1 flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                <CardTitle>Chat with AI Assistant</CardTitle>
              </div>
              <CardDescription>Ask questions about farming, crops, soil, weather, and more</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 custom-scrollbar">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={cn(
                        "flex gap-3",
                        message.role === "user" ? "justify-end" : "justify-start"
                      )}
                    >
                      {message.role === "assistant" && (
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-primary" />
                        </div>
                      )}
                      <div
                        className={cn(
                          "max-w-[80%] rounded-lg p-4",
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-70 mt-2">
                          {message.timestamp.toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      {message.role === "user" && (
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div className="bg-muted rounded-lg p-4">
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type your question or use voice..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isListening || isLoading}
                  />
                  {isListening && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      <div className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                    </div>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={isListening ? stopListening : startListening}
                  disabled={isLoading}
                  className={cn(isListening && "bg-destructive/10")}
                >
                  {isListening ? (
                    <MicOff className="w-4 h-4 text-destructive" />
                  ) : (
                    <Mic className="w-4 h-4" />
                  )}
                </Button>
                <Button onClick={() => handleSendMessage()} disabled={!input.trim() || isLoading || isListening}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions & Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Voice Status */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-primary" />
                <CardTitle>Voice Input</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {isListening ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-destructive rounded-full animate-pulse" />
                    <p className="text-sm font-medium">Listening...</p>
                  </div>
                  <p className="text-xs text-muted-foreground">Speak your question now</p>
                  <Button size="sm" variant="destructive" onClick={stopListening} className="w-full">
                    Stop Listening
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Click the mic button to use voice input</p>
                  <Button size="sm" onClick={startListening} className="w-full" disabled={isLoading}>
                    <Mic className="w-4 h-4 mr-2" />
                    Start Voice
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Questions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                "Best time to sow wheat?",
                "How to improve soil fertility?",
                "Pest control for cotton?",
                "Fertilizer recommendations?",
                "Crop rotation benefits?",
              ].map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full text-left justify-start"
                  onClick={() => {
                    setInput(question);
                    handleSendMessage(question);
                  }}
                  disabled={isLoading || isListening}
                >
                  {question}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Capabilities */}
          <Card>
            <CardHeader>
              <CardTitle>I Can Help With</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  "Crop recommendations",
                  "Soil management",
                  "Fertilizer advice",
                  "Pest & disease control",
                  "Weather impact",
                  "Irrigation planning",
                  "Crop rotation",
                  "Harvest timing",
                ].map((capability, index) => (
                  <Badge key={index} variant="outline" className="mr-1 mb-1">
                    {capability}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Extend Window interface for Speech Recognition
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

