import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThumbsUp, MessageSquare, Clock } from 'lucide-react'

export default function SocialSection() {
  // testing posts data
  const latestPosts = [
    {
      id: 1,
      content: "Just made a great trade on $TSLA! 📈",
      likes: 24,
      comments: 5,
      timestamp: "2h ago",
    },
    {
      id: 2,
      content: "What do you think about the current crypto market? 🤔",
      likes: 18,
      comments: 12,
      timestamp: "5h ago",
    },
    {
      id: 3,
      content:
        "New blog post: '10 Tips for Beginner Investors' - check it out!",
      likes: 56,
      comments: 8,
      timestamp: "1d ago",
    },
    {
      id: 4,
      content: "Market analysis: S&P 500 outlook for the next quarter",
      likes: 42,
      comments: 15,
      timestamp: "2d ago",
    },
  ];

  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold">Social Stats</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Likes</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9,876</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Comments</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Latest Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {latestPosts.map((post) => (
              <li
                key={post.id}
                className="border-b pb-4 last:border-b-0 last:pb-0"
              >
                <p className="mb-2 text-sm text-gray-800">{post.content}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center">
                    <ThumbsUp className="mr-1 h-3 w-3" />
                    {post.likes}
                  </span>
                  <span className="flex items-center">
                    <MessageSquare className="mr-1 h-3 w-3" />
                    {post.comments}
                  </span>
                  <span className="flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    {post.timestamp}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
};
