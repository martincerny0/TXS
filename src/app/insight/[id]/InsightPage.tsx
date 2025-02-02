import React from 'react'
import { Badge } from "@/components/ui/badge"
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import Footer from '@/app/_components/MainElements/Footer/Footer'
import RelatedInsights from './RelatedInsights'
import type { InsightsCategory } from '@prisma/client'
import UserRating from './User_Rating'
import ServerNav from '@/app/_components/MainElements/Main_Nav/MainNav'
import type { User } from 'next-auth'


interface InsightPageProps {
    id: number;
    user: User | undefined
}


const mockInsight = {
  id: 1,
  category: "Tech" as InsightsCategory,
  title: "AI Revolution in Stock Market Prediction",
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  createdAt: new Date(),
  readTime: 8,
  rating: 4.5,
  redactorName: "Martin Cerny"
};


const InsightPage : React.FC<InsightPageProps> = ({ id, user }) => {
  // const [userRating, setUserRating] = useState<number | null>(null);
  // const [averageRating, setAverageRating] = useState(4.5);

  // const handleRatingChange = (newRating: number) => {
  //   setUserRating(newRating);
  //   setAverageRating((averageRating + newRating) / 2);
  // };



  return (
    <div className="flex flex-col">
      <ServerNav user={user} isBorderBottom={true} />
      <main className="flex-1 bg-gray-50">
        <article className="container mx-auto px-4 py-8 md:py-12 lg:max-w-4xl">
          {/* article header */}
          <div className="mb-8">
            <Badge className="mb-2 bg-gradient-to-t from-red-500 to-red-500/60">
              {mockInsight.category}
            </Badge>
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              AI Revolution in Stock Market Prediction
            </h1>
            <div className="flex items-center text-sm text-gray-500">
              <span>By {mockInsight.redactorName}</span>
              <span className="mx-2">•</span>
              <time dateTime={mockInsight.createdAt.toDateString()}>
                {mockInsight.createdAt.toDateString()}
              </time>
              <span className="mx-2">•</span>
              <span>{mockInsight.readTime} min read</span>
              <span className="mx-2">•</span>
              <div className="flex items-center">
                <StarIcon className="mr-1 h-4 w-4 text-yellow-400" />
                <span>{mockInsight.rating}</span>
              </div>
            </div>
          </div>
          <Image
            src={`/insights/thumbnail/${id}.webp`}
            alt={`Thumbnail of the insight ${1}`}
            width={300}
            height={200}
            className="mb-8 w-full rounded-lg object-cover"
            quality={100}
            priority={true}
          />
          {/* article body */}
          <article className="prose prose-lg max-w-none">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <h2>Lorem Ipsum</h2>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
            <ul>
              <li>Lorem ipsum dolor sit amet</li>
              <li>Consectetur adipiscing elit</li>
              <li>Sed do eiusmod tempor incididunt</li>
              <li>Ut labore et dolore magna aliqua</li>
            </ul>
            <h2>Dolor Sit Amet</h2>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
            <h2>Consectetur Adipiscing</h2>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
          </article>
          <div className="mt-8 border-t pt-4">
            <h3 className="mb-2 text-lg font-semibold">Rate this article</h3>
            <UserRating initialRating={mockInsight.rating} />
          </div>
        </article>
        <RelatedInsights user={user} />
      </main>
      <Footer />
    </div>
  );
}

export default InsightPage;
