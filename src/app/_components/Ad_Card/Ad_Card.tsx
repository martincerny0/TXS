import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Crown } from "lucide-react";

interface AdCardProps {
    isSubscribed: boolean
}

const AdCard : React.FC<AdCardProps> = ({ isSubscribed }) => {
    
    if (isSubscribed) return <></>;
    
    return (
      <Card className="mb-8 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="flex items-center text-lg font-semibold text-gray-800">
                <Crown className="mr-2 h-5 w-5 text-yellow-400" />
                Unlock Premium Features
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Subscribe now to get acces to advanced investing tools, AI
                assistant and more!
              </p>
            </div>
            <Button className="bg-gradient-to-r from-purple-400 to-pink-400 text-white transition-colors duration-300 hover:from-purple-500 hover:to-pink-500">
              Upgrade to Premium
            </Button>
          </div>
        </CardContent>
      </Card>
    );
}

export default AdCard;