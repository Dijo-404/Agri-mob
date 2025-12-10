import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, MessageCircle, Share2, Bug, Sprout, Tractor, Droplets, Landmark, Search, X, Send, Mail, MessageSquare } from "lucide-react";
import { forumPosts, forumCategories, govSchemes } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const categoryIcons: Record<string, typeof Bug> = {
  "Pest Control": Bug,
  "Seeds & Varieties": Sprout,
  "Farm Machinery": Tractor,
  "Irrigation": Droplets,
  "Government Help": Landmark,
};

interface Message {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface Conversation {
  farmer: string;
  avatar: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
}

export default function Community() {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [upvotedPosts, setUpvotedPosts] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFarmer, setSelectedFarmer] = useState<string | null>(null);
  const [showChatPanel, setShowChatPanel] = useState(true);
  const [messageInput, setMessageInput] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatSearchQuery, setChatSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUser = "Ravi Patel"; // Current logged-in user

  // Load conversations, messages, and upvotes from localStorage
  useEffect(() => {
    const savedConversations = localStorage.getItem("farmerConversations");
    const savedMessages = localStorage.getItem("farmerMessages");
    const savedUpvotes = localStorage.getItem("farmerUpvotes");
    
    if (savedConversations) {
      try {
        setConversations(JSON.parse(savedConversations));
      } catch (e) {
        console.error("Failed to load conversations", e);
      }
    }
    
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })));
      } catch (e) {
        console.error("Failed to load messages", e);
      }
    }

    if (savedUpvotes) {
      try {
        setUpvotedPosts(JSON.parse(savedUpvotes));
      } catch (e) {
        console.error("Failed to load upvotes", e);
      }
    }
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedFarmer]);

  const handleMessageFarmer = (farmerName: string, avatar: string) => {
    setSelectedFarmer(farmerName);
    setShowChatPanel(true);
    
    // Mark messages as read
    const updatedMessages = messages.map(m => 
      (m.from === farmerName && m.to === currentUser && !m.read) 
        ? { ...m, read: true } 
        : m
    );
    setMessages(updatedMessages);
    localStorage.setItem("farmerMessages", JSON.stringify(updatedMessages));
    
    // Update conversations
    updateConversations();
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedFarmer) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      from: currentUser,
      to: selectedFarmer,
      content: messageInput.trim(),
      timestamp: new Date(),
      read: false,
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setMessageInput("");
    localStorage.setItem("farmerMessages", JSON.stringify(updatedMessages));
    
    updateConversations();
    
    toast({
      title: "Message sent",
      description: `Message sent to ${selectedFarmer}`,
    });
  };

  const updateConversations = () => {
    const farmerSet = new Set<string>();
    messages.forEach(m => {
      if (m.from === currentUser) farmerSet.add(m.to);
      if (m.to === currentUser) farmerSet.add(m.from);
    });

    const updatedConversations: Conversation[] = Array.from(farmerSet).map(farmer => {
      const conversationMessages = messages.filter(
        (m) => 
          (m.from === currentUser && m.to === farmer) ||
          (m.from === farmer && m.to === currentUser)
      ).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      
      const lastMessage = conversationMessages[0];
      const unread = messages.filter(
        m => m.from === farmer && m.to === currentUser && !m.read
      ).length;

      // Get avatar from forum posts or use initials
      const post = forumPosts.find(p => p.author === farmer);
      const avatar = post?.avatar || farmer.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

      return {
        farmer,
        avatar,
        lastMessage: lastMessage?.content || "No messages yet",
        timestamp: lastMessage?.timestamp || new Date(),
        unread,
      };
    }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    setConversations(updatedConversations);
    localStorage.setItem("farmerConversations", JSON.stringify(updatedConversations));
  };

  const getCurrentConversationMessages = () => {
    if (!selectedFarmer) return [];
    return messages.filter(
      (m) => 
        (m.from === currentUser && m.to === selectedFarmer) ||
        (m.from === selectedFarmer && m.to === currentUser)
    ).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  };

  const filteredConversations = useMemo(() => {
    if (!chatSearchQuery.trim()) return conversations;
    const query = chatSearchQuery.toLowerCase();
    return conversations.filter(conv =>
      conv.farmer.toLowerCase().includes(query) ||
      conv.lastMessage.toLowerCase().includes(query)
    );
  }, [conversations, chatSearchQuery]);

  // Get all unique farmers from posts for quick messaging
  const allFarmers = useMemo(() => {
    const farmers = new Set<string>();
    forumPosts.forEach(post => {
      if (post.author !== currentUser) {
        farmers.add(post.author);
      }
    });
    return Array.from(farmers).map(farmer => {
      const post = forumPosts.find(p => p.author === farmer);
      return {
        name: farmer,
        avatar: post?.avatar || farmer.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2),
      };
    });
  }, []);

  const handleUpvote = (postId: number) => {
    setUpvotedPosts(prev => {
      const isUpvoted = prev.includes(postId);
      const updated = isUpvoted
        ? prev.filter(id => id !== postId)
        : [...prev, postId];
      
      // Save to localStorage
      localStorage.setItem("farmerUpvotes", JSON.stringify(updated));
      
      // Show toast notification
      toast({
        title: isUpvoted ? "Removed like" : "Liked post",
        description: isUpvoted 
          ? "You removed your like from this post" 
          : "You liked this post",
      });
      
      return updated;
    });
  };

  const handleShare = async (post: typeof forumPosts[0]) => {
    const postUrl = `${window.location.origin}/community?post=${post.id}`;
    const shareData = {
      title: post.title,
      text: `${post.title}\n\n${post.content.substring(0, 100)}...`,
      url: postUrl,
    };

    try {
      // Try Web Share API first (works on mobile and modern browsers)
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        toast({
          title: "Shared successfully",
          description: "Post shared via native share",
        });
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(postUrl);
        toast({
          title: "Link copied!",
          description: "Post link copied to clipboard. Share it with others!",
        });
      }
    } catch (error: any) {
      // User cancelled or error occurred
      if (error.name !== "AbortError") {
        // Fallback: Copy to clipboard
        try {
          await navigator.clipboard.writeText(postUrl);
          toast({
            title: "Link copied!",
            description: "Post link copied to clipboard",
          });
        } catch (clipboardError) {
          toast({
            title: "Share failed",
            description: "Unable to share. Please try again.",
            variant: "destructive",
          });
        }
      }
    }
  };

  const filteredPosts = useMemo(() => {
    let posts = selectedCategory
      ? forumPosts.filter(post => post.category === selectedCategory)
      : forumPosts;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.author.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
      );
    }

    return posts;
  }, [selectedCategory, searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Community Forum</h1>
          <p className="text-muted-foreground">Connect with fellow farmers and share knowledge</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full sm:w-auto flex items-center justify-center gap-2"
          onClick={() => setShowChatPanel(!showChatPanel)}
        >
          <MessageSquare className="w-4 h-4" />
          {showChatPanel ? "Hide Chat" : "Show Chat"}
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search posts, topics, authors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            onClick={() => setSearchQuery("")}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className={cn(
        "grid gap-4 sm:gap-6 transition-all duration-300",
        showChatPanel ? "grid-cols-1 lg:grid-cols-12" : "grid-cols-1 lg:grid-cols-12"
      )}>
        {/* Categories Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className={cn(
            "lg:col-span-3",
            showChatPanel && "hidden lg:block"
          )}
        >
          <div className="glass-card rounded-xl p-4 sticky top-4">
            <h3 className="font-display font-semibold text-foreground mb-4 text-base">Categories</h3>
            <div className="space-y-2">
              <Button
                variant={selectedCategory === null ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start text-sm h-9",
                  selectedCategory === null && "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
                onClick={() => setSelectedCategory(null)}
              >
                All Topics
              </Button>
              {forumCategories.map((category) => {
                const Icon = categoryIcons[category.name] || Bug;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.name ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start text-sm h-9",
                      selectedCategory === category.name && "bg-primary text-primary-foreground hover:bg-primary/90"
                    )}
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    <span className="flex items-center gap-2 flex-1 min-w-0">
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{category.name}</span>
                    </span>
                  </Button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Posts Feed */}
        <div className={cn(
          "space-y-4",
          showChatPanel ? "lg:col-span-5" : "lg:col-span-9"
        )}>
          {filteredPosts.length === 0 ? (
            <div className="glass-card rounded-xl p-12 text-center">
              <Search className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No posts found</h3>
              <p className="text-muted-foreground">
                {searchQuery 
                  ? `No posts match your search "${searchQuery}". Try different keywords.`
                  : "No posts in this category yet."}
              </p>
              {searchQuery && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setSearchQuery("")}
                >
                  Clear Search
                </Button>
              )}
            </div>
          ) : (
            filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="glass-card-hover rounded-xl p-6 bg-card border border-border/50"
            >
              {/* Post Header */}
              <div className="flex items-start gap-3 mb-4">
                <Avatar className="flex-shrink-0 w-10 h-10">
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                    {post.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-semibold text-foreground text-base">{post.author}</span>
                    <Badge variant="outline" className="text-xs flex-shrink-0 bg-primary/10 text-primary border-primary/20">
                      {post.category}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{post.timeAgo}</span>
                </div>
              </div>

              {/* Post Content */}
              <h3 className="text-lg font-bold text-foreground mb-3 break-words leading-tight">{post.title}</h3>
              <p className="text-muted-foreground mb-4 break-words whitespace-pre-wrap leading-relaxed">{post.content}</p>

              {/* Post Image */}
              {post.image && (
                <div className="rounded-lg overflow-hidden mb-4 w-full">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-auto max-h-96 object-cover"
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-4 sm:gap-6 pt-4 border-t border-border/50 mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleUpvote(post.id)}
                  className={cn(
                    "transition-all duration-200 flex items-center gap-2 h-9 px-3",
                    upvotedPosts.includes(post.id) 
                      ? "text-primary hover:text-primary/80" 
                      : "text-muted-foreground hover:text-primary"
                  )}
                >
                  <motion.div
                    animate={upvotedPosts.includes(post.id) ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ duration: 0.3 }}
                    className="flex items-center"
                  >
                    <ThumbsUp className={cn(
                      "w-4 h-4 transition-all",
                      upvotedPosts.includes(post.id) && "fill-current"
                    )} />
                  </motion.div>
                  <span className="font-medium text-sm">
                    {post.upvotes + (upvotedPosts.includes(post.id) ? 1 : 0)}
                  </span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-muted-foreground hover:text-primary flex items-center gap-2 h-9 px-3"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="font-medium text-sm">{post.comments}</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleMessageFarmer(post.author, post.avatar)}
                  className="text-muted-foreground hover:text-primary flex items-center gap-2 h-9 px-3"
                >
                  <Mail className="w-4 h-4" />
                  <span className="font-medium text-sm">Message</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleShare(post)}
                  className="text-muted-foreground hover:text-primary flex items-center gap-2 h-9 px-3"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="font-medium text-sm">Share</span>
                </Button>
              </div>
            </motion.div>
            ))
          )}
        </div>

        {/* Chat Panel - Always Visible */}
        {showChatPanel && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-6 hidden lg:flex flex-col"
          >
            <Card className="flex-1 flex flex-col h-full min-h-[600px] max-h-[calc(100vh-200px)]">
              <CardHeader className="border-b pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <CardTitle>Chat with Farmers</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={() => setShowChatPanel(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                {/* Chat Search */}
                <div className="relative mt-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={chatSearchQuery}
                    onChange={(e) => setChatSearchQuery(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  {chatSearchQuery && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                      onClick={() => setChatSearchQuery("")}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>

              <div className="flex-1 flex overflow-hidden">
                {/* Conversations List */}
                <div className={cn(
                  "w-full lg:w-80 border-r border-border flex flex-col transition-all",
                  selectedFarmer && "hidden lg:flex"
                )}>
                  <div className="p-3 border-b">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Conversations</h4>
                    <Badge variant="outline" className="text-xs">
                      {conversations.length} chats
                    </Badge>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {filteredConversations.length === 0 ? (
                      <div className="p-6 text-center">
                        <Mail className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-4">No conversations yet</p>
                        <p className="text-xs text-muted-foreground mb-4">Click "Message" on any post to start chatting</p>
                        
                        {/* Quick Start - List of Farmers */}
                        <div className="mt-4">
                          <p className="text-xs font-medium text-foreground mb-2">Start a conversation:</p>
                          <div className="space-y-2">
                            {allFarmers.slice(0, 5).map((farmer) => (
                              <Button
                                key={farmer.name}
                                variant="outline"
                                size="sm"
                                className="w-full justify-start"
                                onClick={() => handleMessageFarmer(farmer.name, farmer.avatar)}
                              >
                                <Avatar className="w-6 h-6 mr-2">
                                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                    {farmer.avatar}
                                  </AvatarFallback>
                                </Avatar>
                                {farmer.name}
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-2 space-y-1">
                        {filteredConversations.map((conv, index) => (
                          <motion.div
                            key={conv.farmer}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.03 }}
                            className={cn(
                              "p-3 rounded-lg cursor-pointer transition-colors",
                              selectedFarmer === conv.farmer 
                                ? "bg-primary/10 border border-primary/20" 
                                : "bg-muted/30 hover:bg-muted/50"
                            )}
                            onClick={() => handleMessageFarmer(conv.farmer, conv.avatar)}
                          >
                            <div className="flex items-start gap-3">
                              <Avatar className="w-10 h-10 flex-shrink-0">
                                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                  {conv.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0 flex flex-col gap-1">
                                <div className="flex items-center justify-between gap-2">
                                  <p className="font-medium text-sm text-foreground truncate">{conv.farmer}</p>
                                  {conv.unread > 0 && (
                                    <Badge variant="destructive" className="text-xs h-5 w-5 p-0 flex items-center justify-center flex-shrink-0">
                                      {conv.unread}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                                <p className="text-xs text-muted-foreground">
                                  {conv.timestamp.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Chat Window */}
                <div className={cn(
                  "flex-1 flex flex-col",
                  !selectedFarmer && "hidden lg:flex"
                )}>
                  {!selectedFarmer ? (
                    <div className="flex-1 flex items-center justify-center p-6">
                      <div className="text-center">
                        <MessageSquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">Select a farmer to chat</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Choose a conversation from the list or click "Message" on any post
                        </p>
                        {allFarmers.length > 0 && (
                          <div className="space-y-2 max-w-md mx-auto">
                            {allFarmers.slice(0, 3).map((farmer) => (
                              <Button
                                key={farmer.name}
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => handleMessageFarmer(farmer.name, farmer.avatar)}
                              >
                                <Avatar className="w-8 h-8 mr-2">
                                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                    {farmer.avatar}
                                  </AvatarFallback>
                                </Avatar>
                                Start chat with {farmer.name}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Chat Header */}
                      <div className="p-4 border-b flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {selectedFarmer.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-foreground">{selectedFarmer}</p>
                            <p className="text-xs text-muted-foreground">Online</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedFarmer(null)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Messages Area */}
                      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-muted/20">
                        <AnimatePresence>
                          {getCurrentConversationMessages().map((message) => {
                            const isOwn = message.from === currentUser;
                            return (
                              <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className={cn(
                                  "flex gap-3",
                                  isOwn ? "justify-end" : "justify-start"
                                )}
                              >
                                {!isOwn && (
                                  <Avatar className="w-8 h-8 flex-shrink-0">
                                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                      {selectedFarmer.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                                    </AvatarFallback>
                                  </Avatar>
                                )}
                                <div className={cn(
                                  "max-w-[75%] rounded-lg p-3 shadow-sm",
                                  isOwn 
                                    ? "bg-primary text-primary-foreground rounded-br-none" 
                                    : "bg-card border border-border rounded-bl-none"
                                )}>
                                  {!isOwn && (
                                    <p className="text-xs font-medium mb-1 opacity-80">{message.from}</p>
                                  )}
                                  <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                                  <p className={cn(
                                    "text-xs mt-2",
                                    isOwn ? "opacity-70" : "text-muted-foreground"
                                  )}>
                                    {message.timestamp.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                                  </p>
                                </div>
                                {isOwn && (
                                  <Avatar className="w-8 h-8 flex-shrink-0">
                                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                      {currentUser.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                                    </AvatarFallback>
                                  </Avatar>
                                )}
                              </motion.div>
                            );
                          })}
                        </AnimatePresence>
                        <div ref={messagesEndRef} />
                      </div>

                      {/* Message Input */}
                      <div className="p-4 border-t bg-card">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Type your message..."
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                              }
                            }}
                            className="flex-1"
                          />
                          <Button 
                            onClick={handleSendMessage}
                            disabled={!messageInput.trim()}
                            size="icon"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Mobile Chat Toggle Button */}
        {!showChatPanel && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:hidden fixed bottom-6 right-6 z-50"
          >
            <Button
              size="lg"
              className="rounded-full w-14 h-14 shadow-lg"
              onClick={() => setShowChatPanel(true)}
            >
              <MessageSquare className="w-6 h-6" />
              {conversations.length > 0 && (
                <Badge variant="destructive" className="absolute -top-1 -right-1 h-6 w-6 p-0 flex items-center justify-center">
                  {conversations.reduce((sum, conv) => sum + conv.unread, 0)}
                </Badge>
              )}
            </Button>
          </motion.div>
        )}

        {/* Trending Schemes - Only show when chat is hidden */}
        {!showChatPanel && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="glass-card rounded-xl p-4">
              <h3 className="font-display font-semibold text-foreground mb-4">Trending Schemes</h3>
              <div className="space-y-3">
                {govSchemes.slice(0, 4).map((scheme, index) => (
                  <motion.div
                    key={scheme.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <p className="font-medium text-foreground text-sm">{scheme.name}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{scheme.benefits}</p>
                  </motion.div>
                ))}
              </div>
              <Separator className="my-4" />
              <Button variant="outline" className="w-full" asChild>
                <a href="/gov-schemes">View All Schemes</a>
              </Button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Mobile Chat Dialog - Only show on mobile when chat panel is open */}
      <div className="lg:hidden">
        {showChatPanel && (
          <div className="fixed inset-0 z-50 bg-background flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Chat with Farmers
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowChatPanel(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            {selectedFarmer ? (
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {selectedFarmer.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">{selectedFarmer}</p>
                      <p className="text-xs text-muted-foreground">Online</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedFarmer(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-muted/20">
                  {getCurrentConversationMessages().map((message) => {
                    const isOwn = message.from === currentUser;
                    return (
                      <div
                        key={message.id}
                        className={cn(
                          "flex gap-3",
                          isOwn ? "justify-end" : "justify-start"
                        )}
                      >
                        {!isOwn && (
                          <Avatar className="w-8 h-8 flex-shrink-0">
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                              {selectedFarmer.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className={cn(
                          "max-w-[75%] rounded-lg p-3 shadow-sm",
                          isOwn 
                            ? "bg-primary text-primary-foreground rounded-br-none" 
                            : "bg-card border border-border rounded-bl-none"
                        )}>
                          {!isOwn && (
                            <p className="text-xs font-medium mb-1 opacity-80">{message.from}</p>
                          )}
                          <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                          <p className={cn(
                            "text-xs mt-2",
                            isOwn ? "opacity-70" : "text-muted-foreground"
                          )}>
                            {message.timestamp.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                        {isOwn && (
                          <Avatar className="w-8 h-8 flex-shrink-0">
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                              {currentUser.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t bg-card">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim()}
                      size="icon"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-4">
                {/* Conversations List for Mobile */}
                <div className="space-y-2">
                  {filteredConversations.length === 0 ? (
                    <div className="text-center py-8">
                      <Mail className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-4">No conversations yet</p>
                      <p className="text-xs text-muted-foreground mb-4">Click "Message" on any post to start chatting</p>
                    </div>
                  ) : (
                    filteredConversations.map((conv) => (
                      <div
                        key={conv.farmer}
                        className={cn(
                          "p-3 rounded-lg cursor-pointer transition-colors",
                          selectedFarmer === conv.farmer 
                            ? "bg-primary/10 border border-primary/20" 
                            : "bg-muted/30 hover:bg-muted/50"
                        )}
                        onClick={() => handleMessageFarmer(conv.farmer, conv.avatar)}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                              {conv.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium text-sm text-foreground truncate">{conv.farmer}</p>
                              {conv.unread > 0 && (
                                <Badge variant="destructive" className="text-xs h-5 w-5 p-0 flex items-center justify-center">
                                  {conv.unread}
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}