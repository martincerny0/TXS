import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

interface RedirectCardProps {
    className?: string;
    href: string;
    children?: React.ReactNode;
}

const RedirectCard : React.FC<RedirectCardProps> = ({className, href, children}) => {
    const router = useRouter();

    return (
        <Card className={`${className}`} onClick={() => router.push(href)}>
            {children}
        </Card>
    )
};

export default RedirectCard;