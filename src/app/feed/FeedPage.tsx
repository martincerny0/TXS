"use client";
import React, { useState } from 'react'
import { BadgeCheck, UserPlus, ChevronDown, Heart, MessageCircle, Bookmark, Share, Copy, Instagram, X, TrendingUp, Info, BarChart, Newspaper, DollarSign, LogIn, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Metadata } from 'next'
import type { User } from 'next-auth';
import ServerNav from '../_components/MainElements/Main_Nav/MainNav';


export interface InsightShort {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
}

interface InsightShortCardProps {
  insight: InsightShort;
}

const InsightShortCard: React.FC<InsightShortCardProps> = ({ insight }) => {
  return (
    <Card className="p-4">
      <h4 className="font-bold">{insight.title}</h4>
      <p className="text-sm text-muted-foreground">{insight.description}</p>
      <p className="mt-1 text-xs text-muted-foreground">
        {insight.createdAt.toLocaleDateString()}
      </p>
    </Card>
  );
};





interface StockInfo {
  symbol: string;
  price: string;
  change: string;
}

interface PostProps {
  id: number;
  userName: string;
  userInitials: string;
  postTime: string;
  content: string;
  likeCount: number;
  commentCount: number;
  stocks?: StockInfo[];
}

interface RecommendedProfile {
  id: number;
  name: string;
  username: string;
  avatar: string;
}

function PostCard({ post }: { post: PostProps }) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likeCount || 0)
  const [commentCount, setCommentCount] = useState(post.commentCount || 0)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)

  const shareUrl = `https://example.com/post/${post.id}`

  const handleFollow = () => setIsFollowing(!isFollowing)
  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1)
  }
  const handleComment = () => setCommentCount(prevCount => prevCount + 1)
  const handleSave = () => setIsSaved(!isSaved)
  const handleCopyLink = () => navigator.clipboard.writeText(shareUrl)
  const handleShare = (platform: string) => {
    console.log(`Sharing on ${platform}`)
    setIsShareDialogOpen(false)
  }

  const renderStockSymbol = (stock: StockInfo) => (
    <Dialog key={stock.symbol}>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0 h-auto font-normal align-baseline">
          <span className="inline-flex items-center border-gray-200 bg-white hover:bg-gray-50 px-2 py-1 border rounded transition-colors duration-200">
            <svg className="mr-1 w-4 h-4 text-gray-400" viewBox="0 0 1024 1024" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-25.9-37.8-65.8-62.5-118.2-72.1-49.9-9.5-103.2 7.2-137.2 21.3-38.5-20.4-90.4-32.2-138.2-21.9-77.8 17.2-146.6 85.1-155 195.9-9.6 125.3 69.7 259.1 126.2 339.5 28.3 39.9 65.6 85.2 114.1 83.9 46.8-1.3 63.9-30.6 119.8-31 55.7-.4 71.8 31 119.1 30.3 49.1-.7 88.5-43.8 115.9-84.3 21.4-30.8 29.7-45.9 46.4-80.5-121.6-47.2-141.5-221.9-85.8-224.6z"/>
              <path d="M642.2 230.7c50.7-60.2 46.1-115 44.6-134.7-44.8 2.6-96.6 30.5-126.1 64.8-32.5 36.8-51.6 82.3-47.5 133.6 48.4 3.7 92.6-21.2 129-63.7z"/>
            </svg>
            <span className="mr-1 font-semibold text-gray-700">{stock.symbol}</span>
            <span className="text-gray-500 text-sm">{stock.price}</span>
            <span className={`ml-1 font-medium text-sm ${parseFloat(stock.change) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stock.change}
            </span>
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-bold text-2xl">
            <TrendingUp className="w-6 h-6 text-primary" />
            {stock.symbol} - Stock Details
          </DialogTitle>
          <DialogDescription>
            <div className="space-y-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Current Price:</span>
                <span className="font-bold text-lg">{stock.price}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Change:</span>
                <span className={`text-lg font-bold ${parseFloat(stock.change) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stock.change}
                </span>
              </div>
              <div className="gap-4 grid grid-cols-2 mt-6">
                <Button variant="outline" className="w-full" onClick={() => console.log('Company Info')}>
                  <Info className="mr-2 w-4 h-4" />
                  Company Info
                </Button>
                <Button variant="outline" className="w-full" onClick={() => console.log('Financials')}>
                  <BarChart className="mr-2 w-4 h-4" />
                  Financials
                </Button>
                <Button variant="outline" className="w-full" onClick={() => console.log('Latest News')}>
                  <Newspaper className="mr-2 w-4 h-4" />
                  Latest News
                </Button>
                <Button variant="outline" className="w-full" onClick={() => console.log('Buy Stock')}>
                  <DollarSign className="mr-2 w-4 h-4" />
                  Buy Stock
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )

  const renderContent = () => {
    const contentParts = post.content.split(/(\$[A-Z]+)/)
    return contentParts.map((part, index) => {
      if (part.startsWith('$')) {
        const symbol = part.slice(1)
        const stock = post.stocks?.find(s => s.symbol === symbol)
        return stock ? renderStockSymbol(stock) : part
      }
      return part
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex justify-center items-center bg-gray-200 rounded-full w-10 h-10 font-semibold text-gray-600 text-sm">
              {post.userInitials}
            </div>
            <div>
              <div className="flex items-center">
                <p className="mr-1 font-medium text-sm">{post.userName}</p>
                <BadgeCheck className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-muted-foreground text-sm">
                  @{post.userName.toLowerCase().replace(' ', '')}
                </p>
                <span className="text-muted-foreground text-xs">
                  •
                </span>
                <p className="text-muted-foreground text-xs">
                  {post.postTime}
                </p>
              </div>
            </div>
          </div>
          <Button
            variant={isFollowing ? "secondary" : "default"}
            size="sm"
            className="ml-auto"
            onClick={handleFollow}
          >
            {isFollowing ? "Following" : "Follow"}
            <UserPlus className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-base leading-7">
            {renderContent()}
          </p>
          {post.content.length > 150 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              {isExpanded ? "See less" : "See more"}
              <ChevronDown
                className={`ml-1 h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
              />
            </Button>
          )}
        </div>
      </CardContent>
      <Separator className="my-4" />
      <CardFooter>
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={isLiked ? "text-primary" : ""}
            >
              <Heart
                className="mr-2 w-4 h-4"
                fill={isLiked ? "currentColor" : "none"}
              />
              <span>{likeCount}</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleComment}>
              <MessageCircle className="mr-2 w-4 h-4" />
              <span>{commentCount}</span>
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className={isSaved ? "text-primary" : ""}
            >
              <Bookmark
                className="w-4 h-4"
                fill={isSaved ? "currentColor" : "none"}
              />
              <span className="sr-only">Save</span>
            </Button>
            <Dialog
              open={isShareDialogOpen}
              onOpenChange={setIsShareDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Share className="w-4 h-4" />
                  <span className="sr-only">Share</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share this post</DialogTitle>
                  <DialogDescription>
                    Choose how you want to share this post
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col space-y-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <Input value={shareUrl} readOnly />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyLink}
                    >
                      <Copy className="mr-2 w-4 h-4" />
                      Copy
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => handleShare("Instagram")}
                  >
                    <Instagram className="mr-2 w-4 h-4" />
                    Share on Instagram
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleShare("X")}
                  >
                    <X className="mr-2 w-4 h-4" />
                    Share on X
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleShare("WhatsApp")}
                  >
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export const metadata: Metadata = {
  title: 'Social Feed',
  description: 'A social feed for investors and traders',
}
interface FeedPageProps {
  user: User | undefined;
}

const SocialFeed: React.FC<FeedPageProps> = ({ user }) => {
const [isSignedIn, setIsSignedIn] = useState(false);
  const [newPostContent, setNewPostContent] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const posts: PostProps[] = [
    {
      id: 1,
      userName: "Pepik Hnatek",
      userInitials: "JD",
      postTime: "1h ago",
      content: "This is a sample post with $AAPL and $MSFT mentions.",
      likeCount: 10,
      commentCount: 2,
      stocks: [
        { symbol: "AAPL", price: "170.34", change: "+2.50" },
        { symbol: "MSFT", price: "250.00", change: "-1.20" },
      ],
    },
    {
      id: 2,
      userName: "Luky Puky",
      userInitials: "JS",
      postTime: "30m ago",
      content: "Another sample post.  $GOOG is doing well today!",
      likeCount: 5,
      commentCount: 0,
      stocks: [
        { symbol: "GOOG", price: "120.50", change: "+5.00" },
      ],
    },
  ];

  const recommendedProfiles: RecommendedProfile[] = [
    { id: 1, name: "Jiri Barlog", username: "jb", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "Pepi hepik", username: "pepih", avatar: "/placeholder.svg?height=40&width=40" },
    { id: 3, name: "Luky Kuky", username: "lukuk", avatar: "/placeholder.svg?height=40&width=40" },
  ]

  const recommendedInsights: InsightShort[] = [
    { id: "1", title: "Market Trends 2023", description: "An overview of the current market trends", createdAt: new Date() },
    { id: "2", title: "Tech Stocks Analysis", description: "In-depth analysis of top tech stocks", createdAt: new Date() },
    { id: "3", title: "Crypto Market Update", description: "Latest updates in the cryptocurrency market", createdAt: new Date() },
  ]

  return (
    <div className="bg-gray-100 min-h-screen">
      <ServerNav user={user} />
      <main>
        <div className="mx-auto sm:px-6 lg:px-8 py-6 max-w-7xl">
          <div className="flex gap-6">
            <div className="w-3/4 space-y-6">
              <Card className="p-4">
                <Textarea
                  placeholder="What's on your mind?"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="mb-4"
                />
                <Button onClick={() => {
                  setNewPostContent("")
                }}>
                  Post
                </Button>
              </Card>
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
              <div className="relative mt-8">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-100 to-gray-100 pointer-events-none" />
                <div className="relative z-10 py-8 text-center">
                  <p className="mb-4 font-semibold text-lg">
                    {isSignedIn
                      ? "You've reached the end of your feed. Check back later for more updates!"
                      : "Sign in to see more posts and join the conversation!"}
                  </p>
                  {!isSignedIn && (
                    <Button onClick={() => setIsSignedIn(true)} className="bg-primary text-white">
                      <LogIn className="mr-2 w-4 h-4" /> Sign In
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className="w-1/4 space-y-6">
              <Card className="p-4">
                <h2 className="font-bold text-lg mb-4">Recommended Profiles</h2>
                <div className="space-y-4">
                  {recommendedProfiles.map((profile) => (
                    <div key={profile.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={profile.avatar} alt={profile.name} />
                          <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{profile.name}</p>
                          <p className="text-sm text-gray-500">@{profile.username}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Follow</Button>
                    </div>
                  ))}
                </div>
              </Card>
              <Card className="p-4">
                <h2 className="font-bold text-lg mb-4">Recommended Insights</h2>
                <div className="space-y-4">
                  {recommendedInsights.map((insight) => (
                    <InsightShortCard key={insight.id} insight={insight} />
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SocialFeed;

