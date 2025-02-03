"use client";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";

interface ShareEntityProps {
    className?: string;
    url: string;
}
const ShareEntity : React.FC<ShareEntityProps> = ({ className, url }) => {
    const router = useRouter();
    return (

        <Send
        className={`ml-5 h-4 w-4`}
        onClick={() =>
          router.push(
            url
          )
        }
      />
    )
}

export default ShareEntity;