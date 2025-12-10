import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ThumbsUp, MessageCircle, Share2, Bug, Sprout, Tractor, Droplets, Landmark, Search, X } from "lucide-react";
import { forumPosts, forumCategories, govSchemes } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

const categoryIcons: Record<string, typeof Bug> = {
  "Pest Control": Bug,
  "Seeds & Varieties": Sprout,
  "Farm Machinery": Tractor,
  "Irrigation": Droplets,
  "Government Help": Landmark,
};

export default function Community() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [upvotedPosts, setUpvotedPosts] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleUpvote = (postId: number) => {
    setUpvotedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
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
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Community Forum</h1>
        <p className="text-muted-foreground">Connect with fellow farmers and share knowledge</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="glass-card rounded-xl p-4">
            <h3 className="font-display font-semibold text-foreground mb-4">Categories</h3>
            <div className="space-y-2">
              <Button
                variant={selectedCategory === null ? "secondary" : "ghost"}
                className="w-full justify-start"
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
                    className="w-full justify-between"
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {category.name}
                    </span>
                    <Badge variant="outline" className="text-xs">{category.count}</Badge>
                  </Button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Posts Feed */}
        <div className="lg:col-span-2 space-y-4">
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
              className="glass-card-hover rounded-xl p-6"
            >
              {/* Post Header */}
              <div className="flex items-start gap-3 mb-4">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {post.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-foreground">{post.author}</span>
                    <Badge variant="outline" className="text-xs">{post.category}</Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{post.timeAgo}</span>
                </div>
              </div>

              {/* Post Content */}
              <h3 className="text-lg font-semibold text-foreground mb-2">{post.title}</h3>
              <p className="text-muted-foreground mb-4">{post.content}</p>

              {/* Post Image */}
              {post.image && (
                <div className="rounded-lg overflow-hidden mb-4">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleUpvote(post.id)}
                  className={cn(
                    upvotedPosts.includes(post.id) && "text-primary"
                  )}
                >
                  <ThumbsUp className={cn(
                    "w-4 h-4 mr-2",
                    upvotedPosts.includes(post.id) && "fill-current"
                  )} />
                  {post.upvotes + (upvotedPosts.includes(post.id) ? 1 : 0)}
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {post.comments}
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </motion.div>
            ))
          )}
        </div>

        {/* Trending Schemes Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-1"
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
      </div>
    </motion.div>
  );
}